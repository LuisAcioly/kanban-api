import { Request, Response } from 'express';
import repository from '../repositories/UsersRepository';
import { UserService } from '../services/UserServices';
import { validate } from "class-validator"

class UsersController {
    
    async store(req: Request, res: Response) {
        const { username, password } = req.body;
        const userService = new UserService();
        
        try {

            const user = repository.create({ username, password });
            
            const errors = await validate(user);

            if(errors.length === 0){
                const response = await userService.saveUser(user);

                if(response instanceof Error){
                    return res.status(400).json(response.message);
                }

                return res.status(200).json(response);
            }
            
            res.status(400).json(errors);
            
        } catch (error) {
            return res.status(500).send({message: error.message});
        }

    }

    async getUsers(req: Request, res: Response) {

        const users = await repository.find();

        return res.status(200).json(users);
    }


}

export default new UsersController();