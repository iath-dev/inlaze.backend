import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshDto {
  @ApiProperty({
    description: "Token de Actualización",
  })
  @IsNotEmpty()
  @IsString()
  public refresh_token!: string;
}
