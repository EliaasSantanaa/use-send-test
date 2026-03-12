import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseSendService } from './use-send.service';

@Controller('use-send')
export class UseSendController {
  constructor(private readonly useSendService: UseSendService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async sendEmail(
    @Body('email') email: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.useSendService.sendEmail(email, file);
  }
}