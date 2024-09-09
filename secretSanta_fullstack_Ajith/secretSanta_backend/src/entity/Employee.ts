import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column({ nullable: true })
  secretChildName?: string;

  @Column({ nullable: true })
  secretChildEmail?: string;
}
