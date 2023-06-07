import {Document} from 'mongoose';
import { User } from './user';

export interface Recipe extends Document {
    owner: User;
    title: string;
    description:string;
    cookingInstruction: string;
    timeOfPrepa: number;
    difficultyLvl: number;
    created: Date;
  }