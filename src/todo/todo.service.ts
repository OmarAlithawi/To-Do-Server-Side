import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async getTodo(filterDto: FilterDto): Promise<Todo[]> {
    return this.todoRepository.getTodo(filterDto);
  }

  async getTodoById(id: number): Promise<Todo> {
    return this.todoRepository.getTodoById(id);
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDto);
  }

  deleteTodo(todo: Todo): void {
    return this.todoRepository.deleteTodo(todo);
  }

  async updateTodo(todo: Todo, updateTodoDto: FilterDto) {
    return this.todoRepository.updateTodo(todo, updateTodoDto);
  }
}
