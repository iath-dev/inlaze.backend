import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({
    description: "Correo del usuario",
    example: "user@mail.com",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email!: string;
}
