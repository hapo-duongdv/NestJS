import { 
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column
} from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn() 
    id : string;

    @CreateDateColumn() 
    created : Date;

    @Column({
        type: 'text',
        nullable: false
    }) 
    name : string;

    @Column({
        type: 'numeric',
        nullable: false
    })
    age : number;

    @Column({
        type: 'text',
        nullable: false
    })
    address: string;
}
