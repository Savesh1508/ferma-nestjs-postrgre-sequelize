import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAnimalDto {
  @ApiProperty({example:"someAnimal", description:"Animal name"})
  @IsString()
  name?: string;

  @ApiProperty({example:1, description:"Animal age"})
  @IsNumber()
  age?: number;

  @ApiProperty({example:12.34, description:"Animal weight"})
  @IsNumber()
  weight?: number;

  @ApiProperty({example:"somedescription", description:"Animal description"})
  @IsString()
  description?: string;

  @ApiProperty({example:1, description:"Worker Id"})
  @IsNumber()
  cared_byId?: number;

  @ApiProperty({example:1, description:"Illness history Id"})
  @IsNumber()
  ill_historyId?: number;

  @ApiProperty({example:1, description:"Animal block Id"})
  @IsNumber()
  blockId?: number;
}
