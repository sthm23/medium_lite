import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
// import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
@UseGuards(JwtGuard)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() ctx:any
  ) {

    return this.postService.create(createPostInput, ctx.user);
  }

  @Query(() => [Post], { name: 'post' })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Context() ctx:any
  ) {
    return this.postService.findOne(id, ctx.user);
  }

  // @Mutation(() => Post)
  // updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
  //   return this.postService.update(updatePostInput.id, updatePostInput);
  // }

  // @Mutation(() => Post)
  // removePost(@Args('id', { type: () => Int }) id: number) {
  //   return this.postService.remove(id);
  // }
}