import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Viewers {
  @Field()
  userId:number

  @Field()
  postId:number

  @Field(()=>User)
  user: User;
}
@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(()=>User)
  author: User;

  @Field(() => [Viewers], {nullable: true})
  viewers?: Viewers[];
}
