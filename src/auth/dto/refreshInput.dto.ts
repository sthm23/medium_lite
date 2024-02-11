import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class RefreshInput {
    @Field()
    refreshToken:string

}