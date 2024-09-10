import type { Repository } from "typeorm";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "../favorites/favorite.entity";
import { NotFoundException } from "@nestjs/common";

describe("UserService", () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeAll(() => {
    jest.setTimeout(30000);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          synchronize: true,
          entities: [User, Favorite],
        }),
        TypeOrmModule.forFeature([User, Favorite]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));

    // Setup initial data
    await repository.clear();
    await repository.save({ id: 1, name: "John Doe", email: "test@mail.com", password: "123456" });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a list of users", async () => {
    const users = await service.findAll();
    expect(users.length).toBeGreaterThanOrEqual(1);
  });

  it("should find user", async () => {
    const user = await service.findOne(1);
    expect(user).not.toBeNull();
  });

  it("should create user", async () => {
    const { id } = await service.create("john@email.com", "123456789", "John Doe");

    const user = await service.findOne(id);
    expect(user).not.toBeNull();
  });

  it("should delete user", async () => {
    const { id } = await service.create("john.delete@email.com", "123456789", "John Doe");

    await service.delete(id);

    await expect(() => service.findOne(id)).rejects.toThrow(NotFoundException);
  });
});
