import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "../../database/entities/post.entity";
import {
  CreatePostDto,
  UpdatePostDto,
  PostResponseDto,
  PostListResponseDto,
} from "../../common/dto/post.dto";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private notificationsService: NotificationsService
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostResponseDto> {
    const post = this.postsRepository.create(createPostDto);
    const savedPost = await this.postsRepository.save(post);

    // Check for keyword matches and send notifications
    await this.notificationsService.checkAndNotify(savedPost);

    return this.mapToResponseDto(savedPost);
  }

  async findAll(page = 1, limit = 10): Promise<PostListResponseDto> {
    console.log("catch");
    const [items, total] = await this.postsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return {
      items: items.map((post) => this.mapToResponseDto(post)),
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<PostResponseDto> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return this.mapToResponseDto(post);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto
  ): Promise<PostResponseDto> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (post.password !== updatePostDto.password) {
      throw new UnauthorizedException("Invalid password");
    }

    Object.assign(post, updatePostDto);
    const updatedPost = await this.postsRepository.save(post);
    return this.mapToResponseDto(updatedPost);
  }

  async remove(id: number, password: string): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (post.password !== password) {
      throw new UnauthorizedException("Invalid password");
    }

    await this.postsRepository.remove(post);
  }

  async search(
    query: string,
    page = 1,
    limit = 10
  ): Promise<PostListResponseDto> {
    const [items, total] = await this.postsRepository
      .createQueryBuilder("post")
      .where("post.title LIKE :query OR post.author LIKE :query", {
        query: `%${query}%`,
      })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy("post.createdAt", "DESC")
      .getManyAndCount();

    return {
      items: items.map((post) => this.mapToResponseDto(post)),
      total,
      page,
      limit,
    };
  }

  private mapToResponseDto(post: Post): PostResponseDto {
    const { password, ...responseDto } = post;
    return responseDto;
  }
}
