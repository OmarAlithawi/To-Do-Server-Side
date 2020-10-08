import { TodoStatus } from '../enum/todo.status';

export class FilterDto {
  description: string;
  status: TodoStatus;
}
