import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { MenuService } from "./menu.service";
import { CreateMenuItemDto, CreateCategoryDto, UpdateMenuItemDto } from "../dto/menu.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { CreateCategoryResponse, CreateMenuItemResponse, MenuCategory, MenuItem } from "../types/menu.type";

@Resolver("Menu")
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Mutation(() => CreateCategoryResponse)
  @UseGuards(AuthGuard)
  async createCategory(
    @Args("createCategoryDto") createCategoryDto: CreateCategoryDto,
    @Context() context: { req: any }
  ) {
    return await this.menuService.createCategory(
      context.req.restaurant.id,
      createCategoryDto
    );
  }

  @Mutation(() => CreateMenuItemResponse)
  @UseGuards(AuthGuard)
  async createMenuItem(
    @Args("createMenuItemDto") createMenuItemDto: CreateMenuItemDto,
    @Context() context: { req: any }
  ) {
    return await this.menuService.createMenuItem(
      context.req.restaurant.id,
      createMenuItemDto
    );
  }

  @Query(() => [MenuItem])
  @UseGuards(AuthGuard)
  async getMenuItems(@Context() context: { req: any }) {
    return await this.menuService.getMenuItems(context.req.restaurant.id);
  }

  @Query(() => [MenuCategory])
  @UseGuards(AuthGuard)
  async getCategories(@Context() context: { req: any }) {
    return await this.menuService.getCategories(context.req.restaurant.id);
  }

  @Mutation(() => CreateMenuItemResponse)
  @UseGuards(AuthGuard)
  async updateMenuItem(
    @Args("updateMenuItemDto") updateMenuItemDto: UpdateMenuItemDto,
    @Context() context: { req: any }
  ) {
    return await this.menuService.updateMenuItem(
      context.req.restaurant.id,
      updateMenuItemDto
    );
  }

  @Mutation(() => CreateMenuItemResponse)
  @UseGuards(AuthGuard)
  async deleteMenuItem(
    @Args("menuItemId") menuItemId: string,
    @Context() context: { req: any }
  ) {
    return await this.menuService.deleteMenuItem(
      context.req.restaurant.id,
      menuItemId
    );
  }

  @Mutation(() => CreateCategoryResponse)
  @UseGuards(AuthGuard)
  async deleteCategory(
    @Args("categoryId") categoryId: string,
    @Context() context: { req: any }
  ) {
    return await this.menuService.deleteCategory(
      context.req.restaurant.id,
      categoryId
    );
  }
} 