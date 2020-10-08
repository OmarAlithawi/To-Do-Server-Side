import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dto/todo.create.dto';
import { TodoStatus } from './enum/todo.status';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';
import { FilterDto } from './dto/todo.filter.dto';

const mockRepo = () => ({
  createTodo: jest.fn(),
  getTodo: jest.fn(),
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
    it('expected to create a todo', async () => {
      (repo.createTodo as jest.Mock).mockResolvedValue('value');
      const createTodoDto: CreateTodoDto = {
        description: 'first todo',
      };
      expect(repo.createTodo).not.toBeCalled();
      const result = await service.createTodo(createTodoDto);
      expect(repo.createTodo).toBeCalled();
      expect(result).toEqual('value');
    });
  });

  describe('Get todoes', () => {
    it('expected to get atleast one todo', async () => {
      (repo.getTodo as jest.Mock).mockResolvedValue('value');
      const filter: FilterDto = {
        description: 'first todo',
        status: TodoStatus.IN_PROGRESS,
      };
      expect(repo.getTodo).not.toBeCalled();
      const result = await service.getTodo(filter);
      expect(repo.getTodo).toBeCalled();
      expect(result).toEqual('value');
    });

    it('Throw an error', async () => {
      (repo.getTodo as jest.Mock).mockResolvedValue(null);
      expect(service.createTodo).rejects.toThrow();
    });
  });
});
