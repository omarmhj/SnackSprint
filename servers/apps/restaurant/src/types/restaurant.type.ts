import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Restaurant {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field()
  phoneNumber: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  message: string;
}

@ObjectType()
export class ActivationResponse {
  @Field(() => Restaurant)
  restaurant: Restaurant;
}

@ObjectType()
export class ErrorType {
  @Field()
  message: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => Restaurant, { nullable: true })
  restaurant?: Restaurant;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LogoutResposne {
  @Field()
  message: string;
} 