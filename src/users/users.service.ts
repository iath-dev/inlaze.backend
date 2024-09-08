import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  public constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  public async create(username: string, password: string): Promise<User> {
    const _password = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({ username, password: _password });
    return this.usersRepository.save(newUser);
  }

  public findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  public async update(id: number, user: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, user);
    return this.findOne(id);
  }

  public async delete(id: number): Promise<void> {
    await this.usersRepository.update(id, { isActive: false });
  }
}
