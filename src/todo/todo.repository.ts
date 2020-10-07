import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/todo.create.dto';
import { TodoStatus } from './enum/todo.status';
import { Todo } from './todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { description } = createTodoDto;
    const todo = new Todo();

    todo.description = description;
    todo.status = TodoStatus.IN_PROGRESS;

    try {
      return await todo.save();
    } catch {
      throw new BadRequestException();
    }
  }
}
