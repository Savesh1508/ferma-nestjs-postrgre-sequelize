import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateAdminDto {
  @ApiProperty({example:"someadmin", description:"Admin name"})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example:"someemail@gmail.com", description:"Admin email"})
  @IsEmail()
  email:string;

  @ApiProperty({ example: "Pa$sword12", description: "Admin password" })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: "confirm password", description: "Admin password" })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({example: false, description:"Admin activity"})
  @IsBoolean()
  is_active:boolean;
}
