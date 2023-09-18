import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMealDto {
  @ApiProperty({example:"someMeal", description:"Meal name"})
  @IsNotEmpty()
  @IsString()
  name?: string;
}
