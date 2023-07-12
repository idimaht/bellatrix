import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BranchEntity } from './branch.entity';

@Entity('managers')
export class ManagerEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
  })
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  tel: string;

  @Column()
  branchId: number;

  @ManyToOne(() => BranchEntity, (branch) => branch.managers)
  branch: BranchEntity;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;

  @Index()
  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;
}
