import { BaseEntity, PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { TaskStatus } from './task.model';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        default: TaskStatus.OPEN
    })
    status: TaskStatus;
}