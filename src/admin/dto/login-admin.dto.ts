import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class LoginAdminDto {
  @ApiProperty({
    example: 'email1@mail.uz',
    description: 'Foydalanuvchi elektron pochtasi'
  })
  @IsEmail()
  email:string;

  @ApiProperty({
    example: 'Uzbek1$t0n',
    description: 'Foydalanuvchi paroli'
  })
  @IsNotEmpty()
  @IsString()
  password:string;
}
