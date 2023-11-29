import { Request, Response } from 'express';
import { validate } from "class-validator"
import repository from '../repositories/WorkspaceRepository';
import { WorkspaceService } from '../services/WorkspaceService';
import { UserService } from '../services/UserServices';

class WorkspaceController {
    
    async store(req: Request, res: Response) {
        const { name, userId } = req.body;
        const workspaceService = new WorkspaceService();

        try {
            
            const response = await workspaceService.saveWorkspace(name, userId);

            if(response instanceof Error){
                return res.status(400).json(response.message);
            }

            return res.status(200).json(response);
            
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    async getWorkspace(req: Request, res: Response) {
        const { id }  = req.query;
        const workspaceId = Number(id)
        const workspace = await repository.findOne({
            relations: {
                users: true,
            },
            where: { 
                id: workspaceId 
            }
        })

        return res.status(200).json(workspace);
    }

    
    async getUserWorkspaces(req: Request, res: Response) {
        const { id } = req.query;
        const userId = Number(id); 

        const workspaces = await repository.find({
            relations: {
                users: true,
            },
            where: {
                users: {
                    id: userId,
                },
            },
        })
        return res.status(200).json(workspaces);
    }

    async getWorkspaceUsers(req: Request, res: Response) {
        const { id } = req.query;
        const workspaceId = Number(id);

        const workspaces = await repository.findOne({
            relations: {
                users: true,
            },
            where: { 
                id: workspaceId 
            }
        })
        return res.status(200).json(workspaces.users);
    }


    async editWorkspace(req: Request, res: Response) {
        const { id, name } = req.body;
        const workspaceId = Number(id);

        const workspace = await repository.findOne({where: { id: workspaceId }});

        workspace.name = name;

        const newWorkspace = await repository.save(workspace);

        return res.status(200).json(newWorkspace);
    }

    async deleteWorkspace(req: Request, res: Response) {
        const { id } = req.query;
        const workspaceId = Number(id);

        const workspace = await repository.findOne({where: { id: workspaceId }});

        const oldWorkspace = await repository.delete(workspace);

        return res.status(200).json(oldWorkspace);
    }

    async updateWorkspaceUsers (req: Request, res: Response) {
        const { id, users } = req.body;

        const workspaceId = Number(id);

        const workspace = await repository.findOne({where: { id: workspaceId }});

        workspace.users = users;

        const newWorkspace = await repository.save(workspace);

        return res.status(200).json(newWorkspace);
    }

}

export default new WorkspaceController();