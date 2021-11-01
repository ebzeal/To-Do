import { TodoStatusType } from './../types/todo.types';
import { User } from '../../users/entities/user';
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

    @Column({ nullable: true })
    description?: string;

    @Column({
        type: 'enum',
        enum: Object.values(TodoStatusType),
        default: TodoStatusType['in-progress'],
    })
    status?: TodoStatusType;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User, (user) => user.todos, { eager: true })
    owner!: User;

    @Column({ type: 'date', nullable: false, default: () => "CURRENT_DATE + INTERVAL '1 DAY'" })
    dueDate?: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn({ default: null, nullable: true })
    deletedAt?: Date;
}
