import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import type { User } from "./user.entity";

@Controller("users")
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(@Body() user: { username: string; password: string }): Promise<User> {
    return this.usersService.create(user.username, user.password);
  }

  @Get()
  public findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  public findOne(@Param("id") id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Put(":id")
  public update(@Param("id") id: number, @Body() user: Partial<User>): Promise<User | null> {
    return this.usersService.update(id, user);
  }

  @Delete(":id")
  public softDelete(@Param("id") id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
