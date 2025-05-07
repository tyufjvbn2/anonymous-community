import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @IsOptional()
  parentId?: number;
}

export class CommentResponseDto {
  id: number;
  content: string;
  author: string;
  createdAt: Date;
  postId: number;
  parentId?: number;
  replies?: CommentResponseDto[];
}

export class CommentListResponseDto {
  items: CommentResponseDto[];
  total: number;
  page: number;
  limit: number;
}
