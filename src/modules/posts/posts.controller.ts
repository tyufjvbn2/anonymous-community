import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import {
  CreatePostDto,
  UpdatePostDto,
  PostResponseDto,
  PostListResponseDto,
} from "../../common/dto/post.dto";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostResponseDto> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ): Promise<PostListResponseDto> {
    return this.postsService.findAll(page, limit);
  }

  @Get("search")
  search(
    @Query("query") query: string,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ): Promise<PostListResponseDto> {
    return this.postsService.search(query, page, limit);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<PostResponseDto> {
    return this.postsService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<PostResponseDto> {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(":id")
  remove(
    @Param("id", ParseIntPipe) id: number,
    @Body("password") password: string
  ): Promise<void> {
    return this.postsService.remove(id, password);
  }
}
