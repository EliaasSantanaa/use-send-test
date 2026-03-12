import { Module } from "@nestjs/common";
import { UseSendController } from "./use-send.controller";
import { UseSendService } from "./use-send.service";

@Module({
    imports: [],
    controllers: [UseSendController],
    providers: [UseSendService],
})

export class UseSendModule {}