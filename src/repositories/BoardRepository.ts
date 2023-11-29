import { dataSource } from "../database/data-source";
import { Board } from "../models/entities/Board";

const repository = dataSource.getRepository(Board);

export default repository;