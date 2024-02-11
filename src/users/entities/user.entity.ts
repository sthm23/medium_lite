import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';


export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// Register enum type
registerEnumType(RoleEnum, { name: 'Role' });


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

  @Field(()=>[Post], {nullable: true})
  viewedPosts?: Post[];
}
