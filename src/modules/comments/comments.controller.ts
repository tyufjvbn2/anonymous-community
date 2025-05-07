import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import {
  CreateCommentDto,
  CommentResponseDto,
  CommentListResponseDto,
} from "../../common/dto/comment.dto";

@Controller("posts/:postId/comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param("postId", ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto
  ): Promise<CommentResponseDto> {
    return this.commentsService.create(postId, createCommentDto);
  }

  @Get()
  findAll(
    @Param("postId", ParseIntPipe) postId: number,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number
  ): Promise<CommentListResponseDto> {
    return this.commentsService.findAll(postId, page, limit);
  }
}
