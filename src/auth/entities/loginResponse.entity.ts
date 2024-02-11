import { Field, ObjectType } from "@nestjs/graphql";
import { RoleEnum } from "src/users/entities/user.entity";



@ObjectType()
export class LoginResponse {

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field()
  userId: number;

  @Field(()=>RoleEnum)
  role: RoleEnum;
}
