import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { JwtPayload } from '../auth/auth.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { CursorPaginationArgs } from './dto/cursore-pagination.dto';

@Injectable()
export class PostService {

  constructor(private prisma: PrismaService) { }


  async create(body: CreatePostInput, user: JwtPayload) {
    const post = await this.prisma.post.create({
      data: {
        content: body.content,
        title: body.title,
        author: {
          connect: {
            id: user.userId
          }
        }
      }
    });
    return post;
  }

  async findAll(args:CursorPaginationArgs) {
    return this.prisma.post.findMany({
      take: args.limit,
      skip: args.offset,
      cursor: {
        id: args.startingId
      },
      include: {
        author: true,
        viewers: {
          include: {
            user: true
          }
        }
      },
    });
  }

  async findOne(id: number, user: JwtPayload) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        viewers: {
          include: {
            user: true
          }
        }
      },
    });

    if (!post) throw new NotFoundException('Post not founded!')
    await this.markPostAsViewed(user.userId, id)
    return post
  }

  async markPostAsViewed(userId: number, postId: number) {
    const viewedPost = await this.prisma.userViewedPost.findFirst({
      where: {
        userId,
        postId,
      }
    })
    if (viewedPost) {
      return viewedPost
    }
    return await this.prisma.userViewedPost.create({
      data: {
        user: { connect: { id: userId } },
        post: { connect: { id: postId } }
      },
    });
  }

}
