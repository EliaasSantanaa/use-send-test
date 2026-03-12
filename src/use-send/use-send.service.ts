import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UseSend } from "usesend-js";

@Injectable()
export class UseSendService {
    private readonly apiKey: string;
    private readonly from: string;
    private readonly baseUrl: string;
    private readonly logger = new Logger(UseSendService.name);

    constructor(
        private readonly configService: ConfigService
    ) {
        this.apiKey = this.configService.get("USESEND_API_KEY") || "";
        this.from = this.configService.get("USESEND_FROM") || "";
        this.baseUrl = this.configService.get("USESEND_BASE_URL") || "";
    }

    async sendEmail(emailAddress: string, file: Express.Multer.File) {      
        try {
            const usesend = new UseSend(this.apiKey, this.baseUrl);
            
            const response = await usesend.emails.send({
                from: this.from,
                to: emailAddress,
                subject: "Teste de Anexo Real via Postman 📎",
                html: "<p>Segue o arquivo real que você fez upload pelo Postman!</p>",
                attachments: [
                    {
                        filename: file.originalname,
                        content: file.buffer.toString('base64'),
                    }
                ],
            });

            this.logger.log(`Email enviado com sucesso: ${JSON.stringify(response)}`);
            return response;
            
        } catch (error) {
            this.logger.error(`Falha ao disparar e-mail: ${error.message}`, error);
            throw error;
        }
    }
}