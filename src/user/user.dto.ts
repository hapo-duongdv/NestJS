import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class  UserDTO {
    @ApiProperty({
        type: String,
        description: 'The title of user position',
        default: '',
    })
    @IsString()
    readonly name :string;
    @ApiProperty({
        type: Number,
        description: 'The title of user position',
        default: '3000',
    })
    @IsInt()
    readonly age : number;
    @ApiProperty({
        type: String,
        description: 'The title of user position',
        default: '',
    })
    @IsString()
    readonly address : string
}
