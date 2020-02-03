import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 255 })
  userName: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;
}
