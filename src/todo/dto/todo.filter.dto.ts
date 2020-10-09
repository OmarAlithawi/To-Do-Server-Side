import { IsNotEmpty } from 'class-validator';
import { TodoStatus } from '../enum/todo.status';

export class FilterDto {
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  status: TodoStatus;
}
