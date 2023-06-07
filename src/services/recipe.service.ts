import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { Recipe } from '../types/recipe';



@Injectable()
export class RecipesService {
  constructor(@InjectModel('Recipe') private readonly recipeModel: Model<Recipe>) {}

  async insertRecipe(title: string, cookingInstruction: string,description: string, timeOfPrepa: number, difficultyLvl: number, created: Date,owner: User) {
      const newRecipe = new this.recipeModel({
        title,
        description,
        cookingInstruction,
        timeOfPrepa,
        difficultyLvl,
        created,
        owner
      });  
      const result = await newRecipe.save();
      return result;
  }

  async getRecipes() {
    const recipe = await this.recipeModel.find().exec();
    return recipe.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      cookingInstruction: recipe.cookingInstruction,
      timeOfPrepa: recipe.timeOfPrepa ,
      difficultyLvl: recipe.difficultyLvl,
      created: recipe.created,
      owner: recipe.owner
    }));
  }

  async getSingleRecipe(recipeId: string) {
    const recipe = await this.findRecipe(recipeId);
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      cookingInstruction: recipe.cookingInstruction,
      timeOfPrepa: recipe.timeOfPrepa ,
      difficultyLvl: recipe.difficultyLvl,
      creationDate: recipe.created,
      owner: recipe.owner
    };
  }

  async updateRecipe(recipeId: string, title: string,description: string, cookingInstruction: string, timeOfPrepa: number, difficultyLvl: number, created: Date,owner: User) {
    const updatedRecipe = await this.findRecipe(recipeId);
    if (title) {
      updatedRecipe.title = title;
    }
    if(description) {
      updatedRecipe.description = description;
    }
    if (cookingInstruction) {
      updatedRecipe.cookingInstruction = cookingInstruction;
    }
    if (timeOfPrepa) {
      updatedRecipe.timeOfPrepa = timeOfPrepa;
    }
    if (difficultyLvl) {
      updatedRecipe.difficultyLvl = difficultyLvl;
    }
    if (created) {
      updatedRecipe.created = created;
    }
    if (owner) {
      updatedRecipe.owner = owner;
    }
    updatedRecipe.save();
    return updatedRecipe;
  }

  async updateRecipeIngredient(recipeId: string, owner: User){
    const updatedRecipe = await this.findRecipe(recipeId);
    if (owner) {
      updatedRecipe.owner.set(owner);
    }
    updatedRecipe.save();
    return updatedRecipe;
  }

  async deleteRecipe(recipeId: string) {
    const result = await this.recipeModel.deleteOne({ _id: recipeId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find recipe.');
    }
    return true;
  }

  private async findRecipe(id: string): Promise<Recipe> {
    let recipe;
    try {
      recipe = await this.recipeModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find recipe.');
    }
    if (!recipe) {
      throw new NotFoundException('Could not find recipe.');
    }
    return recipe;
  }

}
