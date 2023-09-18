import { IsString, IsDate, IsDecimal ,IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateAnimalVaccinationDto {
  @ApiProperty({example:1, description:"Animal Id"})
  @IsNumber()
  animalId: number;

  @ApiProperty({example:1, description:"Vaccination Id"})
  @IsNumber()
  vaccinationId: number;

  @ApiProperty({example:12.3, description:"Vaccination dose"})
  @IsDecimal()
  dose: number;

  @ApiProperty({example:'2023-09-06', description:"Vaccination time"})
  @IsDate()
  time: Date;
}
