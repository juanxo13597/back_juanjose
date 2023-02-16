import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;

  @Column({ length: 20 })
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 20 })
  password: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
