import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: "Correo del usuario",
    example: "user@mail.com",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: "Password",
    example: "123456",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  public password!: string;
}
