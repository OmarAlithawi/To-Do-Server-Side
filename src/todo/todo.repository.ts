import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/todo.create.dto';
import { FilterDto } from './dto/todo.filter.dto';
import { TodoStatus } from './enum/todo.status';
import { Todo } from './todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async getTodo(filterDto: FilterDto) {
    const { description, status } = filterDto;
    const query = this.createQueryBuilder('todo');

    if (description) {
      query.andWhere('todo.description LIKE :description', {
        description: `%${description}%`,
      });
    }

    if (status) {
      query.andWhere('todo.status = :status', { status });
    }

    try {
      return await query.getMany();
    } catch (e) {
      console.log(e);
      throw new BadGatewayException();
    }
  }
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
