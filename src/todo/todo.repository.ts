import {
  BadGatewayException,
  BadRequestException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/todo.create.dto';
import { FilterDto } from './dto/todo.filter.dto';
import { TodoStatus } from './enum/todo.status';
import { Todo } from './todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  private logger = new Logger('TodoRepository');

  async getTodo(filterDto: FilterDto, user: User): Promise<Todo[]> {
    const { description, status } = filterDto;
    const query = this.createQueryBuilder('todo');
    query.where('todo.userId = :userId', { userId: user.id });
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
      throw new NotFoundException();
    }
  }

  async getTodoById(id: number): Promise<Todo> {
    const todo = await this.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const { description } = createTodoDto;
    const todo = new Todo();
    todo.description = description;
    todo.status = TodoStatus.IN_PROGRESS;
    todo.user = user;
    try {
      const newTodo = await todo.save();
      delete todo.user;
      this.logger.log(`new todo has been created ${newTodo}`);
      return newTodo;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  deleteTodo(todo: Todo): void {
    this.remove(todo);
    this.logger.log(`todo with the id  ${todo.id} has been deleted`);
  }

  async updateTodo(todo: Todo, updateTodoDto: FilterDto): Promise<Todo> {
    const { description, status } = updateTodoDto;
    if (description) {
      todo.description = description;
    }
    if (status) {
      todo.status = status;
    }

    try {
      const newTodo = await todo.save();
      this.logger.log(`todo with the id  ${newTodo.id} has been updated`);
      return newTodo;
    } catch {
      throw new BadRequestException();
    }
  }
}
