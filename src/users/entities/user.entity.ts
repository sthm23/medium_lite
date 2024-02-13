import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.entity';


export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// Register enum type
registerEnumType(RoleEnum, { name: 'Role' });

@ObjectType()
export class ViewedPosts {
  @Field()
  userId:number

  @Field()
  postId:number

  @Field(()=>Post)
  post: Post;

}
@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => RoleEnum)
  role: RoleEnum;

  @Field(()=>[Post], {nullable: true})
  posts?: Post[];

  @Field(()=>[ViewedPosts], {nullable: true})
  viewedPosts?: ViewedPosts[];
}