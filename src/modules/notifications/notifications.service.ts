import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { KeywordNotification } from "../../database/entities/keyword-notification.entity";
import { Post } from "../../database/entities/post.entity";
import { Comment } from "../../database/entities/comment.entity";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(KeywordNotification)
    private keywordNotificationsRepository: Repository<KeywordNotification>
  ) {}

  async checkAndNotify(content: Post | Comment): Promise<void> {
    const keywords = await this.keywordNotificationsRepository.find();

    for (const keyword of keywords) {
      if (this.containsKeyword(content, keyword.keyword)) {
        await this.sendNotification(keyword.author, content);
      }
    }
  }

  private containsKeyword(content: Post | Comment, keyword: string): boolean {
    const text =
      content instanceof Post
        ? `${content.title} ${content.content}`
        : content.content;

    return text.toLowerCase().includes(keyword.toLowerCase());
  }

  private async sendNotification(
    author: string,
    content: Post | Comment
  ): Promise<void> {
    // This is a placeholder for the actual notification sending logic
    console.log(
      `Notification to ${author}: Keyword found in ${
        content instanceof Post ? "post" : "comment"
      } ${content.id}`
    );
  }
}
