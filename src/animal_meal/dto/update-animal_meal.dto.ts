import { IsString, IsDate, IsDecimal ,IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateAnimalMealDto {
  @ApiProperty({example:1, description:"Animal Id"})
  @IsNumber()
  animalId?: number;

  @ApiProperty({example:1, description:"Meal Id"})
  @IsNumber()
  mealId?: number;

  @ApiProperty({example:12.3, description:"Animal ate"})
  @IsDecimal()
  ate?: number;

  @ApiProperty({example:'2023-09-06', description:"Ate time"})
  @IsDate()
  time?: Date;
}
