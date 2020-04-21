import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, UseFilters, CacheKey, CacheTTL, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { UserService } from './user.service'
import { UserDTO } from './user.dto';
import { ValidationExceptionFilter } from'../filters/validation-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import { User } from '../decorator/userdata.decorator';
import { ApiTags, ApiOkResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { BenchmarkInterceptor } from '../interceptors/benchmark.interceptor'

@ApiTags('user')
@UseInterceptors(CacheInterceptor, BenchmarkInterceptor)
@Controller('user')
export class UserController {
    constructor( private readonly userService : UserService){}
    
    @Get()
    @CacheKey('allUsers')
    @CacheTTL(15)
    @ApiOkResponse({ description: 'the resource has been successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    showAllUsers(){
        return this.userService.showAll();
    }

    @Post()
    @UseFilters(new ValidationExceptionFilter() )
    @ApiOkResponse({ description: 'the resource has been successfully created.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    createUser(@Body(new ValidationPipe()) data: UserDTO){
        return this.userService.create(data);
    }

    @Get(':id')
    @CacheTTL(15)
    @ApiOkResponse({ description: 'the resource has been successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    readUser(@Param('id') id: string){
        return this.userService.read(id)
        .then((result) => {
            if(result) {
                return result;
            } else {
                throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
            }
        })
         .catch(() => {
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);    
         })
    }


    @Put(':id')
    @ApiOkResponse({ description: 'the resource has been successfully updated.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    updateUser(@Param('id') id: string, @Body() data: Partial<UserDTO>){
        return this.userService.update(id, data)
        .then((result) => {
            if(result) {
                return result;
            } else {
                throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
            }
        })
         .catch(() => {
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);    
         });
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'the resource has been successfully removed.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    deleteUser(@Param('id') id: string){
        return this.userService.delete(id)
        .then((result) => {
            if(result) {
                return result;
            } else {
                throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
            }
        })
         .catch(() => {
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);    
         });
    }
}
