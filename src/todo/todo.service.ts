import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/auth.entity';
import { CreateTodoDto } from './dto/todo.create.dto';
import { FilterDto } from './dto/todo.filter.dto';
import { Todo } from './todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async getTodo(filterDto: FilterDto, user: User): Promise<Todo[]> {
    return this.todoRepository.getTodo(filterDto, user);
  }

  async getTodoById(id: number, user: User): Promise<Todo> {
    return this.todoRepository.getTodoById(id, user);
  }

  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDto, user);
  }

  deleteTodo(todo: Todo): void {
    return this.todoRepository.deleteTodo(todo);
  }

  async updateTodo(todo: Todo, updateTodoDto: FilterDto): Promise<Todo> {
    return this.todoRepository.updateTodo(todo, updateTodoDto);
  }
}
