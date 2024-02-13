import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, PrismaService],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const postData = {
        title: 'Test Post',
        content: 'This is a test post content.',
        authorId: 1,
      };
      const ctx = {
        userId: 1,
        email:'test@test.uz',
        role: 'USER'
      } as any

      // Assuming createPost method returns the created post
      const createdPost = await service.create(postData, ctx);

      expect(createdPost).toHaveProperty('id');
      expect(createdPost.title).toBe(postData.title);
      expect(createdPost.content).toBe(postData.content);
      expect(createdPost.authorId).toBe(postData.authorId);
    });
  });


  describe('get all posts', () => {
    it('should return an array of posts', async () => {
      const pagin = {startingId:0,limit:0, offset:0}
      const posts = await service.findAll(pagin);

      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBe(true);
    });

    it('should return an empty array', async () => {
      const pagin = {startingId:0,limit:0, offset:0}
      const posts = await service.findAll(pagin);

      expect(posts).toBeDefined();
      expect(posts.length).toEqual(0);
    });
  });

  describe('get one post', () => {
    const ctx = {
      userId: 1,
      email:'test@test.uz',
      role: 'USER'
    } as any
    it('should return a specific post by id', async () => {
      // Assuming there's an existing post with id 'postId123'
      const postId = 1;
      const post = await service.findOne(postId, ctx);

      expect(post).toBeDefined();
      expect(post.id).toBe(postId);
    });

    it('should return null if post with given id does not exist', async () => {
      // Assuming there's no post with id 'nonExistentPostId'
      const nonExistentPostId = 123123;
      
      try {
        const post = await service.findOne(nonExistentPostId, ctx);
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toBe('Post not founded!');
      }

    });
  });
});
