import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MenuItem {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  image: string;

  @Field()
  category: string;

  @Field()
  isAvailable: boolean;

  @Field()
  restaurantId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class MenuCategory {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  restaurantId: string;

  @Field(() => [MenuItem])
  items: MenuItem[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class CreateMenuItemResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => MenuItem, { nullable: true })
  menuItem?: MenuItem;
}

@ObjectType()
export class CreateCategoryResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => MenuCategory, { nullable: true })
  category?: MenuCategory;
} 