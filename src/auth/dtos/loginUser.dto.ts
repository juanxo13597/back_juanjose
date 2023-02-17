import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

/** dto para login */
export class LoginUserDTO {
  /** email */
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  /** contraseña */
  @ApiProperty({ required: true })
  @MinLength(6)
  @MaxLength(20)
  @IsString()
  password: string;
}
