import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { JwtPayload } from 'src/auth/auth.interface';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostService {

  constructor(private prisma:PrismaService) {}


  async create(body: CreatePostInput, user:JwtPayload) {
    const post = await this.prisma.post.create({
      data: {
        content: body.content,
        title: body.title,
        author: {
          connect:{
            id: user.userId
          }
        }
      }
    });
    return post;
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: number, user:JwtPayload) {
    const post = await this.prisma.post.findUnique({
      where: {id}
    });

    if(!post) throw new NotFoundException('Post not founded!')
    await this.prisma.userViewedPost.create({
      data: {
        userId: user.userId,
        postId: post.id,
      },
    });

    return post
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
