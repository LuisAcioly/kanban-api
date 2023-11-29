import repository from "../repositories/UsersRepository";
import { Users } from "../models/entities/Users";
import * as bcrypt from 'bcryptjs';

export class UserService {

    async saveUser(user: Users): Promise<Users | Error>{

        const userExist = await repository.findOne({ where : { username: user.username }});
        
        if(userExist){
            return new Error("Usuário com este nome já existe.");
        }

        user.password = bcrypt.hashSync(user.password, 8);

        return await repository.save(user);         
    }

    async getUser(id: number): Promise<Users | null>{
        const user = await repository.findOne({ where : { id }});

        if(user){
            return user;
        }

        return null;
    }

}