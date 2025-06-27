import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateMenuItemDto, CreateCategoryDto, UpdateMenuItemDto } from "../dto/menu.dto";

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new menu category
  async createCategory(restaurantId: string, createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.menuCategory.create({
      data: {
        ...createCategoryDto,
        restaurantId,
      },
    });

    return {
      success: true,
      message: "Category created successfully",
      category,
    };
  }

  // Create a new menu item
  async createMenuItem(restaurantId: string, createMenuItemDto: CreateMenuItemDto) {
    const category = await this.prisma.menuCategory.findFirst({
      where: {
        name: createMenuItemDto.category,
        restaurantId,
      },
    });

    if (!category) {
      throw new BadRequestException("Category not found");
    }

    const { category: categoryName, ...menuItemData } = createMenuItemDto;
    const menuItem = await this.prisma.menuItem.create({
      data: {
        name: menuItemData.name,
        description: menuItemData.description,
        price: menuItemData.price,
        image: menuItemData.image,
        isAvailable: menuItemData.isAvailable,
        restaurant: { connect: { id: restaurantId } },
        category: { connect: { id: category.id } }
      },
    });

    return {
      success: true,
      message: "Menu item created successfully",
      menuItem,
    };
  }

  // Get all menu items for a restaurant
  async getMenuItems(restaurantId: string) {
    return await this.prisma.menuItem.findMany({
      where: {
        restaurantId,
      },
      include: {
        category: true,
      },
    });
  }

  // Get all categories for a restaurant
  async getCategories(restaurantId: string) {
    return await this.prisma.menuCategory.findMany({
      where: {
        restaurantId,
      },
      include: {
        items: true,
      },
    });
  }

  // Update a menu item
  async updateMenuItem(restaurantId: string, updateMenuItemDto: UpdateMenuItemDto) {
    const menuItem = await this.prisma.menuItem.findFirst({
      where: {
        id: updateMenuItemDto.id,
        restaurantId,
      },
    });

    if (!menuItem) {
      throw new BadRequestException("Menu item not found");
    }

    let categoryId = menuItem.categoryId;
    if (updateMenuItemDto.category) {
      const category = await this.prisma.menuCategory.findFirst({
        where: {
          name: updateMenuItemDto.category,
          restaurantId,
        },
      });

      if (!category) {
        throw new BadRequestException("Category not found");
      }
      categoryId = category.id;
    }

    const updatedMenuItem = await this.prisma.menuItem.update({
      where: {
        id: updateMenuItemDto.id,
      },
      data: {
        name: updateMenuItemDto.name,
        description: updateMenuItemDto.description,
        price: updateMenuItemDto.price,
        image: updateMenuItemDto.image,
        isAvailable: updateMenuItemDto.isAvailable,
        categoryId,
      },
    });

    return {
      success: true,
      message: "Menu item updated successfully",
      menuItem: updatedMenuItem,
    };
  }

  // Delete a menu item
  async deleteMenuItem(restaurantId: string, menuItemId: string) {
    const menuItem = await this.prisma.menuItem.findFirst({
      where: {
        id: menuItemId,
        restaurantId,
      },
    });

    if (!menuItem) {
      throw new BadRequestException("Menu item not found");
    }

    await this.prisma.menuItem.delete({
      where: {
        id: menuItemId,
      },
    });

    return {
      success: true,
      message: "Menu item deleted successfully",
    };
  }

  // Delete a category
  async deleteCategory(restaurantId: string, categoryId: string) {
    const category = await this.prisma.menuCategory.findFirst({
      where: {
        id: categoryId,
        restaurantId,
      },
    });

    if (!category) {
      throw new BadRequestException("Category not found");
    }

    await this.prisma.menuCategory.delete({
      where: {
        id: categoryId,
      },
    });

    return {
      success: true,
      message: "Category deleted successfully",
    };
  }
} 