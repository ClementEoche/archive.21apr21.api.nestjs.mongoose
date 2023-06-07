import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from './recipe.module';
import { IngredientsController } from '../controllers/ingredients.controller';
import { IngredientsService } from '../services/ingredients.service';
import { IngredientsSchema } from '../models/ingredients.model';

@Module({
  imports: [RecipeModule ,MongooseModule.forFeature([{ name: 'Ingredients', schema: IngredientsSchema }])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [IngredientsService],
})
export class IngredientsModule {}
