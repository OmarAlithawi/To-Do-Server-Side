import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/todo.create.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    console.log(createTodoDto);
    return this.todoService.createTodo(createTodoDto);
  }
}
