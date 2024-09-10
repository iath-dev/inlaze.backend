import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("App")
@Controller("/")
export class AppController {
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: "Revisar estado del servidor" })
  @ApiResponse({ status: 200, description: "Servidor Activado" })
  public checkHealth(): boolean {
    return true;
  }
}
