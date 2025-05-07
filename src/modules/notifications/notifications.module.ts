import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationsService } from "./notifications.service";
import { KeywordNotification } from "../../database/entities/keyword-notification.entity";

@Module({
  imports: [TypeOrmModule.forFeature([KeywordNotification])],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
