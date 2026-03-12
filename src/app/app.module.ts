import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UseSendModule } from 'src/use-send/use-send.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UseSendModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
