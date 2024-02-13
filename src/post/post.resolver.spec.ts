import { Test, TestingModule } from '@nestjs/testing';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

describe('PostResolver', () => {
  let resolver: PostResolver;
  let postService: PostService;

  const ctx = {
    req: {
      user: {
        userId: 1,
        email:'test@test.uz',
        role: 'USER'
      }
    }
  } as any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostResolver,
        {
          provide: PostService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<PostResolver>(PostResolver);
    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });


  describe('findAll', () => {
    const posts = [
      {
        id: 1,
        title: 'Post 1',
        content: 'Post 1 test content',
        author: {
          id: 1,
          name: 'test name',
          email: 'test email',
          role: 'USER',
        },
        viewers: [{
          userId: 1,
          postId: 1,
          user: {
            id: 1,
            name: 'test name',
            email: 'test email',
            role: 'USER',
            password: 'secret'
          }
        }]
      },
      {
        id: 2,
        title: 'Post 2',
        content: 'Post 1 test content',
        author: {
          id: 1,
          name: 'test name',
          email: 'test email',
          role: 'USER',
          password: 'secret'
        },
        viewers: []
      },
    ] as any;
    it('should return all posts', async () => {
      const pagin = {startingId:0, limit:2, offset:0}

      jest.spyOn(postService, 'findAll').mockResolvedValue(posts);

      const result = await resolver.findAll(pagin);

      expect(result.length).toEqual(posts.length);
    });
  });

  describe('findOne', () => {
    it('should return a specific post by id', async () => {
      const postId = 1;
      const user = {
        id: 1,
        name: 'test name',
        role: 'USER',
        email: 'test@test.uz'
      }
      const post = { 
        id: postId, 
        title: 'Test Post', 
        content: 'Test title',
        author: user,
        viewers: [],
      } as any;


      jest.spyOn(postService, 'findOne').mockResolvedValue(post);
      const result = await resolver.findOne(postId, ctx);
      expect(result).toEqual(post);
    });

    it('should return a specific post by id', async () => {
      const postId = 1;
      const user = {
        id: 1,
        name: 'test name',
        role: 'USER',
        email: 'test@test.uz'
      }
      const post = { 
        id: postId, 
        title: 'Test Post', 
        content: 'Test title',
        author: user,
        viewers: [],
      } as any;

      jest.spyOn(postService, 'findOne').mockResolvedValue(post);
      try {
        const result = await resolver.findOne(postId, ctx);
        expect(result).toEqual(post);
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toBe('Post not founded!');
      }
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const postData = { title: 'New Post', content: 'This is a new post.' };
      const createdPost = { id: 1, ...postData, authorId: 1 };

      jest.spyOn(postService, 'create').mockResolvedValue(createdPost);

      const result = await resolver.createPost(postData, ctx);

      expect(result.authorId).toEqual(createdPost.authorId);
      expect(result.content).toEqual(createdPost.content);
      expect(result.title).toEqual(createdPost.title);
    });
  });


});
