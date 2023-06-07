import {Document} from 'mongoose';
import { User } from './user';
import { Recipe } from './recipe';

export interface UserRecipes extends Document {
    owner:User;
    recipes: Recipe[];
    created:Date;
}