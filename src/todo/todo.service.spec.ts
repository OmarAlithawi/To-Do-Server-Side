import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dto/todo.create.dto';
import { TodoStatus } from './enum/todo.status';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';

const mockRepo = () => ({
  createTodo: jest.fn(),
});

describe('TodoService', () => {
  let service: TodoService;
  let repo: TodoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        { provide: TodoRepository, useFactory: mockRepo },
      ],
    }).compile();

    service = await module.get<TodoService>(TodoService);
    repo = await module.get<TodoRepository>(TodoRepository);
  });

  describe('Create todoes', () => {
    it('expected to create a todo', () => {
      const createTodoDto: CreateTodoDto = {
        description: 'first todo',
      };
      expect(repo.createTodo).not.toBeCalled();
      service.createTodo(createTodoDto);
      expect(repo.createTodo).toBeCalled();
    });
  });
});
