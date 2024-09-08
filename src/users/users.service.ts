import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  public constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  public async create(email: string, password: string): Promise<User> {
    const _password = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({ email, password: _password });
    return this.usersRepository.save(newUser);
  }

  public findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id, isActive: true });

    if (!user) throw new HttpException("NotFound", HttpStatus.NOT_FOUND);

    return user;
  }
  public async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) throw new HttpException("NotFound", HttpStatus.NOT_FOUND);

    return user;
  }

  public async update(id: number, user: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.findOne(id);
  }

  public async delete(id: number): Promise<void> {
    await this.usersRepository.update(id, { isActive: false });
  }
}
