import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from 'src/types/recipe';
import { Ingredient } from '../types/ingredient';

@Injectable()
export class IngredientsService {
  constructor(@InjectModel('Ingredients') private readonly ingredientModel: Model<Ingredient>) {}

  async insertIngredient(name: string, description: string, price: number, owner: Recipe) {
    const newIngredient = new this.ingredientModel({
      name,
      description,
      price,
      owner,
    });
    const result = await newIngredient.save();
    return result;
  }

  async getIngredients(idrecipe) {
    return this.ingredientModel.find({owner: idrecipe})
  }

  async getSingleIngredient(ingredientId: string) {
    const ingredient= await this.findIngredient(ingredientId);
    return {
      id: ingredient.id,
      name: ingredient.name,
      description: ingredient.description,
      price: ingredient.price,
      owner: ingredient.owner,
    };
  }
  async updateIngredient(ingredientId: string, name: string, description: string, price: number, owner: Recipe) {
    const updatedIngredient = await this.findIngredient(ingredientId);
    if (name) {
      updatedIngredient.name= name;
    }
    if (description) {
      updatedIngredient.description = description;
    }
    if (price) {
      updatedIngredient.price = price;
    }
    if(owner) {
      updatedIngredient.owner = owner;
    }
    updatedIngredient.save();
    return updatedIngredient;
  }

  async deleteIngredient(ingredientId: string) {
    const result = await this.ingredientModel.deleteOne({ _id: ingredientId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find ingredient.');
    }
    return true;
  }
  async existIngredient(id: string){
    let ingredient;
    try {
      ingredient = await this.ingredientModel.findById(id).exec();
    } catch (error) {
      console.log('Could not find ingredient. 3');
    }
    if (!ingredient) {
      console.log('Could not find ingredient. 4');
    }
  }

  private async findIngredient(id: string): Promise<Ingredient> {
    let ingredient;
    try {
      ingredient = await this.ingredientModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find ingredient.1');
    }
    if (!ingredient) {
      throw new NotFoundException('Could not find ingredient.2');
    }
    return ingredient;
  }
}
