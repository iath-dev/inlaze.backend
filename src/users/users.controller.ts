import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import type { User } from "./user.entity";

@Controller("users")
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(@Body() user: { email: string; password: string }): Promise<User> {
    try {
      return this.usersService.create(user.email, user.password);
    } catch (error) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  public findAll(): Promise<User[]> {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }

  @Get(":id")
  public findOne(@Param("id") id: number): Promise<User> {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      throw new HttpException("NotFound", HttpStatus.NOT_FOUND);
    }
  }

  @Put(":id")
  public update(@Param("id") id: number, @Body() user: Partial<User>): Promise<User | null> {
    try {
      return this.usersService.update(id, user);
    } catch (error) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }

  @Delete(":id")
  public softDelete(@Param("id") id: number): Promise<void> {
    try {
      return this.usersService.delete(id);
    } catch (error) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }
}
