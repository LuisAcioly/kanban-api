import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { Board } from "./Board"
import { Users } from "./Users"

@Entity()
export class Workspace {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name : string

    @OneToMany(type => Board, boards => Workspace )
    boards: Board[]

    @ManyToMany(() => Users)
    @JoinTable()
    users: Users[]

}
