import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus,UseGuards } from '@nestjs/common';
import { IngredientsService } from '../services/ingredients.service';
import { RecipesService } from '../services/recipe.service';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common'
import { Recipe } from 'src/types/recipe';

@UseGuards(AuthGuard('jwt'))
@Controller('auth/recipe/:idrecipe/ingredients')
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsService) {}
    context: ExecutionContext;
    private readonly recipeService: RecipesService;
    @Post()
    async addIngredient(
        @Body('name') ingredientName: string,
        @Body('description') ingredientDesc: string,
        @Body('price') ingredientPrice: number,
        @Body('owner') ingredientOwner: Recipe,
    ) {
        const ingredient = await this.ingredientsService.insertIngredient(
            ingredientName,
            ingredientDesc,
            ingredientPrice,
            ingredientOwner,    
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Ingredient added successfully',
            data: ingredient,
        };    
    }

    
    @Get()
    async getAllIngredients(@Param('idrecipe') recipeId: string) {
        const ingredients = await this.ingredientsService.getIngredients(recipeId);
        
        return ingredients;
    }

    @Get(':id')
    getIngredient(@Param('id') ingredientId: string) {
        return this.ingredientsService.getSingleIngredient(ingredientId);
    }

    @Patch(':id')
    async updateIngredient(
        @Param('id') ingredientId: string,
        @Body('name') ingredientName: string,
        @Body('description') ingredientDesc: string,
        @Body('price') ingredientPrice: number,
        @Body('owner') ingredientOwner: Recipe,
    ) {
        const ingredient = await this.ingredientsService.updateIngredient(
            ingredientId,
            ingredientName,
            ingredientDesc,
            ingredientPrice,
            ingredientOwner,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Ingredient updated successfully',
            ingredient: ingredient,
        };
    }
    @Delete(':id')
    async removeIngredient(@Param('id') ingredientId: string) {
        const isDeleted = await this.ingredientsService.deleteIngredient(ingredientId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'ingredient deleted successfully',
            };
        }
    }
}
