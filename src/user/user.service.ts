import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private userRepository: Repository<UserEntity>
    ) {}

    async showAll() {
        return await this.userRepository.find();
    }

    async create(data: UserDTO) {
        const user = await this.userRepository.create(data);
        await this.userRepository.save(data);
        return user;
    }

    async read(id: string) {
        return await this.userRepository.findOne({where: { id }});
    }

    async update(id: string, data: Partial<UserDTO>) {
        await this.userRepository.findOne({ id });
        return this.userRepository.update({id}, data);
    }

    async delete(id: string) {
        await this.userRepository.findOne({ id });
        return await this.userRepository.delete({id});
    }
}
