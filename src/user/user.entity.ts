import { 
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column
} from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid') 
    id : string;

    @CreateDateColumn() 
    created : Date;

    @Column('text') 
    name : string;

    @Column('text')
    age : number;

    @Column()
    isMarried: boolean;
}