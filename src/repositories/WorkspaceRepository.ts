import { dataSource } from "../database/data-source";
import { Workspace } from "../models/entities/Workspace";

const repository = dataSource.getRepository(Workspace);

export default repository;