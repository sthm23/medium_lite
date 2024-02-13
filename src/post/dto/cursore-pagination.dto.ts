import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Max, Min } from "class-validator";


@ArgsType()
export class CursorPaginationArgs {
  @Field((type) => Int)
  @Min(0)
  offset: number = 0;

  @Field((type) => Int)
  @Min(1)
  @Max(20)
  limit: number = 3;

  @Field((type) => Int, {nullable: true})
  @Min(1)
  startingId?: number=1;
}