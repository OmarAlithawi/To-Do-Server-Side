import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDto } from './dto/todo.create.dto';
import { FilterDto } from './dto/todo.filter.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodo(@Query() filterDto: FilterDto): Promise<Todo[]> {
    return this.todoService.getTodo(filterDto);
  }

  @Get(':id')
  getTodoById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.getTodoById(id);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(createTodoDto);
  }

  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const todo: Todo = await this.getTodoById(id);
    return this.todoService.deleteTodo(todo);
  }

  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: FilterDto,
  ) {
    const todo: Todo = await this.getTodoById(id);
    return this.todoService.updateTodo(todo, updateTodoDto);
  }
}
