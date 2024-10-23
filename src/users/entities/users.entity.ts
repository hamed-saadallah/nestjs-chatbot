import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chat } from '../../chatbot/entities/chatlog.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Chat, (chat) => chat.userId)
  userID: string;
}
