import { Board } from '../models/entities/Board';
import repository from '../repositories/BoardRepository';
import { WorkspaceService } from './WorkspaceService';

export class BoardService {
    async saveBoard(name: string, workspaceId: number): Promise<Board | Error> {
        const workspaceExist = await repository.findOne({ where : { name }});
        const workspaceService = new WorkspaceService();

        if(workspaceExist){
            return new Error("Quadro com este nome já existe.");
        }

        const workspace = await workspaceService.getWorkspace(workspaceId);

        if(workspace === null){
            return new Error("Área de trabalho não existe.");
        }

        const board = await repository.save({name, workspace});
        return board;
    }

}

