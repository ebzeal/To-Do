import { TodoStatusType } from './../types/todo.types';
import { User } from '../../users/user';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    DeleteDateColumn,
} from 'typeorm';

@Entity('todo')
export class Todo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description?: string;

    @Column({
      type: 'enum',
      enum: Object.values(TodoStatusType),
      default: TodoStatusType["in-progress"],
    })
    status?: TodoStatusType;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User, (user) => user.todos, {
        eager: true,
    })
    owner!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn({ default: null, nullable: true })
    deletedAt?: Date;
}
