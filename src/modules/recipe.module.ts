import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipeController } from '../controllers/recipe.controller';
import { RecipesService } from '../services/recipe.service';
import { RecipesSchema } from '../models/recipe.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Recipe', schema: RecipesSchema }])],
  controllers: [RecipeController],
  providers: [RecipesService],
  exports:[RecipesService]
})
export class RecipeModule {}
