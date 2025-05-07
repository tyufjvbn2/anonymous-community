import { IsString, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({
    description: "게시글 제목",
    example: "안녕하세요",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "게시글 내용",
    example: "첫 번째 게시글입니다.",
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
    description: "게시글 비밀번호 (4자 이상)",
    example: "1234",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class UpdatePostDto {
  @ApiProperty({
    description: "게시글 제목",
    example: "수정된 제목",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "게시글 내용",
    example: "수정된 내용입니다.",
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: "게시글 비밀번호 (4자 이상)",
    example: "1234",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class PostResponseDto {
  @ApiProperty({
    description: "게시글 ID",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "게시글 제목",
    example: "안녕하세요",
  })
  title: string;

  @ApiProperty({
    description: "게시글 내용",
    example: "첫 번째 게시글입니다.",
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
    description: "수정일시",
    example: "2024-03-21T12:00:00.000Z",
  })
  updatedAt: Date;
}

export class PostListResponseDto {
  @ApiProperty({
    description: "게시글 목록",
    type: [PostResponseDto],
  })
  items: PostResponseDto[];

  @ApiProperty({
    description: "전체 게시글 수",
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: "현재 페이지",
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: "페이지당 게시글 수",
    example: 10,
  })
  limit: number;
}
