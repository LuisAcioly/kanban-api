import { Router } from 'express';
import WorkspaceController from '../controllers/WorkspaceController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const workspaceRoutes = Router();

workspaceRoutes.post('/workspace/store', AuthMiddleware, WorkspaceController.store);
workspaceRoutes.get('/workspace/get-workspace', AuthMiddleware, WorkspaceController.getWorkspace);
workspaceRoutes.get('/workspace/get-user-workspaces', AuthMiddleware, WorkspaceController.getUserWorkspaces);
workspaceRoutes.get('/workspace/get-workspace-users', AuthMiddleware, WorkspaceController.getWorkspaceUsers);
workspaceRoutes.post('/workspace/update-workspace-users', AuthMiddleware, WorkspaceController.updateWorkspaceUsers); 
workspaceRoutes.put('/workspace/edit-workspaces', AuthMiddleware, WorkspaceController.editWorkspace);
workspaceRoutes.delete('/workspace/delete-workspaces', AuthMiddleware, WorkspaceController.deleteWorkspace);

export default workspaceRoutes;