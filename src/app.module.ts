import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PostsModule } from "./modules/posts/posts.module";
import { CommentsModule } from "./modules/comments/comments.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    PostsModule,
    CommentsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
