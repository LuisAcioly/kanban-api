import * as dotenv from 'dotenv'
dotenv.config()
import * as express from 'express';
import * as cors from 'cors';
import { dataSource } from './database/data-source';
import routes from './routes';
import userRoutes from './routes/users.routes';
import workspaceRoutes from './routes/workspace.routes';
import boardRoutes from './routes/board.routes';

const app: express.Express = express();
const options: cors.CorsOptions = {
    methods: "GET, POST, PUT, DELETE",
    origin: "*",
}


app.use(cors(options));
app.use(express.json());
app.use(routes);
app.use(userRoutes);
app.use(workspaceRoutes);
app.use(boardRoutes)// 
dataSource.initialize().then(() => {
  app.listen(process.env.PORT, () => {
    console.log('🏃 Running Server');
  });
}).catch(error => { console.log(error)})



export default app;