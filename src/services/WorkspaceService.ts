import { Workspace } from "../models/entities/Workspace";
import repository from "../repositories/WorkspaceRepository";
import { UserService } from "./UserServices";

export class WorkspaceService {

    async saveWorkspace(name: string, userId: number): Promise<Workspace | Error> {
        const workspaceExist = await repository.findOne({ where : { name }});
        const userService = new UserService();

        if(workspaceExist){
            return new Error("Área de trabalho com este nome já existe.");
        }

        const user = await userService.getUser(userId);

        if(user === null){
            return new Error("Usuário não existe.");
        }


        const workspace = new Workspace();
        workspace.name = name;
        workspace.users = [user];
        const newWorkspace = await repository.save(workspace);
        
        return newWorkspace;
    }

    async getWorkspace(id: number): Promise<Workspace | null>{
        const workspace = await repository.findOne({ where : { id }});

        if(workspace){
            return workspace;
        }

        return null;
    }
}