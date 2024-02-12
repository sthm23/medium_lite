import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Max, Min } from "class-validator";


@ArgsType()
export class OffsetPaginationArgs {
  @Field((type) => Int)
  @Min(0)
  offset: number = 0;

  @Field((type) => Int)
  @Min(1)
  @Max(20)
  limit: number = 3;
}