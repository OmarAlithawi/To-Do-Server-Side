import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from './enum/todo.status';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  status: TodoStatus;
}
