import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Todo } from '../../models';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userName!: string;

    @Column({ nullable: true })
    fullName?: string;

    @Column()
    email!: string;

    @Column({ select: false })
    password!: string;

    @OneToMany(() => Todo, (todo: Todo) => todo.owner, {
        eager: false,
    })
    todos!: Todo[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
