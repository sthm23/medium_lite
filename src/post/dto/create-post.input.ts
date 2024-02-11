import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreatePostInput {

  @Field()
  title: string;

  @Field()
  content: string;

  // @Field(()=>User)
  // author: User;

  // @Field(() => [User], {nullable: true})
  // viewers?: User[];
}
