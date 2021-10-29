import { User } from './user';
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

    @Column()
    completed!: boolean;

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
