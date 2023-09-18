import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber, IsDecimal } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateWorkerDto {
  @ApiProperty({example:"someworker", description:"Worker name"})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example:"someemail@gmail.com", description:"Worker email"})
  @IsEmail()
  email:string;

  @ApiProperty({ example: "Pa$sword12", description: "Worker password" })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: "confirm password", description: "Worker password" })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({example:"+998900000000", description:"Market phone"})
  @IsString()
  phone:string;

  @ApiProperty({ example: 1, description: 'Worker work type Id'})
  @IsNumber()
  work_typeId: number;

  @ApiProperty({example: false, description:"Worker activity"})
  @IsBoolean()
  is_active:boolean;

  @ApiProperty({example: 1234.56, description:"Worker salary"})
  @IsDecimal()
  salary:number;

  @ApiProperty({ example: 1, description: 'Worker block Id'})
  @IsNumber()
  blockId: number;
}
