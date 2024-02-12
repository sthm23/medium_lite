import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CursorPaginationArgs } from './dto/cursore-pagination.dto';

@Resolver(() => Post)
@UseGuards(JwtGuard)
@UsePipes(new ValidationPipe())
export class PostResolver {
  constructor(private readonly postService: PostService) { }

  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() context: any,
  ) {
    return this.postService.create(createPostInput, context.req.user);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Args() args: CursorPaginationArgs
  ) {
    return this.postService.findAll(args);
  }

  @Query(() => Post, { name: 'post' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: any,
  ) {
    return this.postService.findOne(id, context.req.user);
  }
}
