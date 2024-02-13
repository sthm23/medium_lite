import { InputType, Int, Field } from '@nestjs/graphql';
import { RoleEnum } from '../entities/user.entity';

@InputType()
export class CreateUserInput {

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
  
  @Field(() => RoleEnum)
  role: RoleEnum;
}
