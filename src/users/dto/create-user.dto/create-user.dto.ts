import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  status: boolean;

  @ApiProperty()
  avatar: string;

}
