/* eslint-disable prettier/prettier */
import { Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    UpdateDateColumn, 
    ManyToMany, 
    JoinTable,
  } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Type } from '../enums/type.enum';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import { Tasks } from 'src/api/tasks/entities/tasks.entity';
import { OneToMany } from 'typeorm';
import { Report } from 'src/api/reports/entities/report.entity';

@Entity('project')
export class Project extends AuditEntity {
    @Column({ nullable: true })
    url: string;
  
    @Column({ nullable: true })
    name: string;

    @Column({
        type: 'enum',
        nullable: false,
        default: Type.Bookshop,
        enum: Type,
      })
      type: Type;

      @ManyToMany(() => User)
      @JoinTable()
      users: User[]

      @OneToMany(() => Tasks, (tasks) => tasks.projects)
      tasks: Tasks;

      @OneToMany(() => Report, (report) => report.projects)
      reports: Report[];

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
      })
      created_at: Date;
    
      @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
      })
      updated_at: Date;
    
      @DeleteDateColumn()
      deleted_at: Date;
}