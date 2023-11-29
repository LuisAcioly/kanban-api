import { Request, Response } from 'express';
import { validate } from "class-validator"
import repository from '../repositories/BoardRepository';   
import { BoardService } from '../services/BoardService';   
import { UserService } from '../services/UserServices';

class BoardController {   
    
    async store(req: Request, res: Response) {
        const { name, workspaceId } = req.body;
        const boardService = new BoardService();   
        const userService = new UserService();

        try {
            
            const board = repository.create({ name });   
            
            const errors = await validate(board);

            if(errors.length === 0){

                const response = await boardService.saveBoard(name, workspaceId);   

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

    async getBoard(req: Request, res: Response) {   
        const { id }  = req.query;

        const boardId = Number(id)   
        const board = await repository.findOne({where: { id: boardId }});   

        return res.status(200).json(board);
    }

    async getWorkspaceBoards(req: Request, res: Response) {   
        const { id } = req.query;
        const workspaceId = Number(id);

        const boards = await repository.find({where: {workspaceId}});
        return res.status(200).json(boards);
    }

    async editBoard(req: Request, res: Response) {   
        const { id, name } = req.body;
        const boardId = Number(id);

        const board = await repository.findOne({where: { id: boardId }});

        board.name = name;

        const newBoard = await repository.save(board);

        return res.status(200).json(newBoard);
    }

    async deleteBoard(req: Request, res: Response) {   
        const { id } = req.query;
        const boardId = Number(id);

        const board = await repository.findOne({where: { id: boardId }});

        const oldBoard = await repository.delete(board);

        return res.status(200).json(oldBoard);
    }

}

export default new BoardController();   
