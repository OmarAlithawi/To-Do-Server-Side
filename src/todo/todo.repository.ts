import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { User } from 'src/auth/auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/todo.create.dto';
import { FilterDto } from './dto/todo.filter.dto';
import { TodoStatus } from './enum/todo.status';
import { Todo } from './todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
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
      throw new BadRequestException();
    }
  }

  async getTodoById(id: number, user: User): Promise<Todo> {
    const todo = await this.findOne({ where: { id, userId: user.id } });

    if (!todo) {
      throw new BadRequestException();
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
      return newTodo;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  deleteTodo(todo: Todo): void {
    this.remove(todo);
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
      return await todo.save();
    } catch {
      throw new BadRequestException();
    }
  }
}
