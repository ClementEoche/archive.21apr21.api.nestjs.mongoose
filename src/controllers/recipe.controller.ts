import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus,UseGuards } from '@nestjs/common';
import { User } from 'src/types/user';
import { AuthGuard } from '@nestjs/passport';
import { RecipesService } from '../services/recipe.service';

@UseGuards(AuthGuard('jwt'))
@Controller('auth/recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipesService) {}

  @Post()
    async addRecipe(
        @Body('title') recipeTitle: string,
        @Body('description') recipeDescription: string,
        @Body('cookingInstruction') recipeCookingInstruction: string,
        @Body('timeOfPrepa') recipeTimeOfPrepa: number,
        @Body('difficultyLvl') recipeDifficultyLvl: number,
        @Body('created') recipeCreationDate: Date,
        @Body('owner') recipeOwner: User,

    ) {
        const recipe = await this.recipeService.insertRecipe(
          recipeTitle,
          recipeDescription,
          recipeCookingInstruction,
          recipeTimeOfPrepa,
          recipeDifficultyLvl,
          recipeCreationDate,
          recipeOwner,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Recipe added successfully',
            data: recipe,
        };
    }
  
  
  @Get()
  async getAllRecipes() {   
    const recipes = await this.recipeService.getRecipes();
    return recipes;
  }

  @Get(':id')
  async getRecipe(@Param('id') recipeId: string) {
    
    return this.recipeService.getSingleRecipe(recipeId);
    
  }

  @Patch(':id')
  async updateRecipe(
    @Param('id') recipeId: string,
    @Body('title') recipeTitle: string,
    @Body('descriuption') recipeDescription: string,
    @Body('cookingInstruction') recipeCookingInstruction: string,
    @Body('timeOfPrepa') recipeTimeOfPrepa: number,
    @Body('difficultyLvl') recipeDifficultyLvl: number,
    @Body('created') recipeCreationDate: Date,
    @Body('owner') recipeOwner: User,
  ) {
    const recipe = await this.recipeService.updateRecipe(
      recipeId,
      recipeTitle,
      recipeDescription,
      recipeCookingInstruction,
      recipeTimeOfPrepa,
      recipeDifficultyLvl,
      recipeCreationDate,
      recipeOwner,
    );
    return {
        statusCode: HttpStatus.OK,
        message: 'Recipe updated successfully',
        recipe: recipe,
    };
  }

  @Delete(':id')
  async deleteRecipe(@Param('id') recipeId: string) {
    const isDeleted = await this.recipeService.deleteRecipe(recipeId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Recipe deleted successfully',
            };
        }
  }

}
