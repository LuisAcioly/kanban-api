import { Console } from "console"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "../models/entities/Users"
import { Board } from "../models/entities/Board"
import { Workspace } from "../models/entities/Workspace"

export const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "kanbanDatabase",
    synchronize: false,
    logging: false,
    entities: [Users, Board, Workspace],
    migrations: ["build/database/migrations/**.js"],
    subscribers: [],
});
