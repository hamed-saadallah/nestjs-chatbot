import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  createdAt: Date;

  @JoinTable()
  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  userId: string;
}
