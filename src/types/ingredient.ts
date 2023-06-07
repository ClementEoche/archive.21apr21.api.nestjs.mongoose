import {Document} from 'mongoose';
import { Recipe } from './recipe';


export interface Ingredient extends Document {
    owner: Recipe;
    name: string;
    description: string;
    price: number;
  }