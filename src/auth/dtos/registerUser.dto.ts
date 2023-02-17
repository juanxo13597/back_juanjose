import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

/** dto para registro de usuario */
export class RegisterUserDTO {
  /** nombre de usuario */
  @ApiProperty({ required: true })
  @MinLength(2)
  @MaxLength(10)
  @IsString()
  name: string;

  /** apellidos */
  @ApiProperty({ required: true })
  @MinLength(2)
  @MaxLength(20)
  @IsString()
  surname: string;

  /** contraseña */
  @ApiProperty({ required: true })
  @MinLength(6)
  @MaxLength(20)
  @IsString()
  password: string;

  /** correo electrónico */
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;
}
