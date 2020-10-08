import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  async validatepassword(password): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return hashedPassword === this.password;
  }
}
