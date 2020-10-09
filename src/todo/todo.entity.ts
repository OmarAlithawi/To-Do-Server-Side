import { User } from '../auth/auth.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from './enum/todo.status';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  status: TodoStatus;
  @ManyToOne(type => User , user => user.todo)
  user:User
  @Column()
  userId:number;
}
