import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/todo.create.dto';
import { FilterDto } from './dto/todo.filter.dto';
import { TodoStatus } from './enum/todo.status';
import { Todo } from './todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async getTodo(filterDto: FilterDto): Promise<Todo[]> {
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
      throw new BadRequestException();
    }
  }

  async getTodoById(id: number): Promise<Todo> {
    const todo = await this.findOne({ where: { id } });

    if (!todo) {
      throw new BadRequestException();
    }
    return todo;
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { description } = createTodoDto;
    const todo = new Todo();
    todo.description = description;
    todo.status = TodoStatus.IN_PROGRESS;
    try {
      return await todo.save();
    } catch (e) {
      throw new BadRequestException();
    }
  }

  deleteTodo(todo: Todo): void {
    this.remove(todo);
  }

  async updateTodo(todo: Todo, updateTodoDto: FilterDto) {
    const { description, status } = updateTodoDto;
    if (description) {
      todo.description = description;
    }
    if (status) {
      todo.status = status;
    }

    try {
      return await todo.save();
    } catch {
      throw new BadRequestException();
    }
  }
}
