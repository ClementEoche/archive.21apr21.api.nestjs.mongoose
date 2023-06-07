import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { User } from '../types/user';
import{InjectModel} from '@nestjs/mongoose';
import{Model} from 'mongoose';
import { LoginDTO, RegisterDTO } from 'src/auth/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(@InjectModel('User') private userModel : Model<User>){}

    private sanitizeUser(user: User){
        return user.depopulate('password');
    }

    async create(userDTO: RegisterDTO){
        const {name} = userDTO;
        const user = await this.userModel.findOne({name});
        if(user){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    async findByLogin(userDTO: LoginDTO){
        const {name,password} = userDTO;
        const user = await this.userModel.findOne({name});
        if(!user){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        
        if(await bcrypt.compare(password, user.password)){
            return this.sanitizeUser(user);
        }else{
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    async findByPaylaod(payload:any){
        const {name} = payload;
        return await this.userModel.findOne({name});
    }
}
