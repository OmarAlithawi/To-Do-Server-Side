import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dto/todo.create.dto';
import { TodoStatus } from './enum/todo.status';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';
import { FilterDto } from './dto/todo.filter.dto';
import { Todo } from './todo.entity';
import { User } from 'src/auth/auth.entity';

const MOCK_REPO = () => ({
  createTodo: jest.fn(),
  getTodo: jest.fn(),
  getTodoById: jest.fn(),
  deleteTodo: jest.fn(),
  updateTodo: jest.fn(),
});

const MOCK_USER: any = {
  username: 'john',
  id: 1,
};

describe('TodoService', () => {
  let service: TodoService;
  let repo: TodoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        { provide: TodoRepository, useFactory: MOCK_REPO },
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
      const result = await service.createTodo(createTodoDto, MOCK_USER);
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
      const result = await service.getTodo(filter, MOCK_USER);
      expect(repo.getTodo).toBeCalled();
      expect(result).toEqual('value');
    });

    it('Throw an error', async () => {
      (repo.getTodo as jest.Mock).mockResolvedValue(null);
      expect(service.getTodo).rejects.toThrow();
    });
  });

  describe('Get todo by id', () => {
    it('expected to get one todo', async () => {
      (repo.getTodoById as jest.Mock).mockResolvedValue('value');
      const id = 1;
      expect(repo.getTodoById).not.toBeCalled();
      const result = await service.getTodoById(id);
      expect(repo.getTodoById).toBeCalled();
      expect(result).toEqual('value');
    });

    it('Throw an error', async () => {
      (repo.getTodoById as jest.Mock).mockResolvedValue(null);
      expect(service.getTodoById).rejects.toThrow();
    });
  });

  describe('delete todo', () => {
    it('expected to delete one todo', async () => {
      const todo = (repo.getTodoById as jest.Mock).mockResolvedValue('value');
      const id = 1;
      const mockTodo = new Todo();
      expect(repo.deleteTodo).not.toBeCalled();
      const result = await service.getTodoById(id);
      expect(repo.getTodoById).toBeCalled();
      expect(result).toEqual('value');
      if (todo) {
        await service.deleteTodo(mockTodo);
        expect(repo.deleteTodo).toBeCalled();
      }
    });
  });

  describe('Update todo', () => {
    it('expected to update a todo', async () => {
      const todo = (repo.getTodoById as jest.Mock).mockResolvedValue('value');
      const id = 1;
      const mockTodo = new Todo();
      const newData: FilterDto = {
        description: 'first todo',
        status: TodoStatus.IN_PROGRESS,
      };
      expect(repo.updateTodo).not.toBeCalled();
      const result = await service.getTodoById(id);
      expect(repo.getTodoById).toBeCalled();
      expect(result).toEqual('value');
      if (todo) {
        const updatedTodo = (repo.updateTodo as jest.Mock).mockResolvedValue(
          'value',
        );
        const result = await service.updateTodo(mockTodo, newData);
        expect(repo.updateTodo).toBeCalled();
        expect(result).toEqual('value');
      }
    });
  });
});
