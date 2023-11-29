import { Router } from 'express';
import BoardController from '../controllers/BoardController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const boardRoutes = Router();

boardRoutes.post('/board/store', BoardController.store);
boardRoutes.get('/board/get-board', AuthMiddleware, BoardController.getBoard);
boardRoutes.get('/board/get-workspace-boards', AuthMiddleware, BoardController.getWorkspaceBoards);
boardRoutes.put('/board/edit-board', AuthMiddleware, BoardController.editBoard);
boardRoutes.delete('/board/delete-board', AuthMiddleware, BoardController.deleteBoard);

export default boardRoutes;