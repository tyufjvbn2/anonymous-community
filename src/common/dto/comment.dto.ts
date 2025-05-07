import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({
    description: "댓글 내용",
    example: "좋은 글이네요!",
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: "작성자 이름",
    example: "익명",
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: "부모 댓글 ID (대댓글인 경우)",
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  parentId?: number;
}

export class CommentResponseDto {
  @ApiProperty({
    description: "댓글 ID",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "댓글 내용",
    example: "좋은 글이네요!",
  })
  content: string;

  @ApiProperty({
    description: "작성자 이름",
    example: "익명",
  })
  author: string;

  @ApiProperty({
    description: "작성일시",
    example: "2024-03-21T12:00:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "게시글 ID",
    example: 1,
  })
  postId: number;

  @ApiProperty({
    description: "부모 댓글 ID (대댓글인 경우)",
    example: 1,
    required: false,
  })
  parentId?: number;

  @ApiProperty({
    description: "대댓글 목록",
    type: [CommentResponseDto],
    required: false,
  })
  replies?: CommentResponseDto[];
}

export class CommentListResponseDto {
  items: CommentResponseDto[];
  total: number;
  page: number;
  limit: number;
}
