import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "../../database/entities/comment.entity";
import {
  CreateCommentDto,
  CommentResponseDto,
  CommentListResponseDto,
} from "../../common/dto/comment.dto";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private notificationsService: NotificationsService
  ) {}

  async create(
    postId: number,
    createCommentDto: CreateCommentDto
  ): Promise<CommentResponseDto> {
    const comment = this.commentsRepository.create({
      ...createCommentDto,
      postId,
    });

    const savedComment = await this.commentsRepository.save(comment);

    // Check for keyword matches and send notifications
    await this.notificationsService.checkAndNotify(savedComment);

    return this.mapToResponseDto(savedComment);
  }

  async findAll(
    postId: number,
    page = 1,
    limit = 10
  ): Promise<CommentListResponseDto> {
    const [items, total] = await this.commentsRepository.findAndCount({
      where: { postId, parentId: null },
      relations: ["replies"],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return {
      items: items.map((comment) => this.mapToResponseDto(comment)),
      total,
      page,
      limit,
    };
  }

  private mapToResponseDto(comment: Comment): CommentResponseDto {
    const responseDto: CommentResponseDto = {
      id: comment.id,
      content: comment.content,
      author: comment.author,
      createdAt: comment.createdAt,
      postId: comment.postId,
      parentId: comment.parentId,
    };

    if (comment.replies) {
      responseDto.replies = comment.replies.map((reply) =>
        this.mapToResponseDto(reply)
      );
    }

    return responseDto;
  }
}
