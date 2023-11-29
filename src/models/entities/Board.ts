import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Workspace } from "./Workspace"

@Entity()
export class Board {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name : string

    @Column()
    workspaceId: number

    @ManyToOne(type => Workspace, boards => Board)
    @JoinColumn({name: 'workspaceId'})
    workspace: Workspace

}
