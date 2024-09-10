import type { Repository } from "typeorm";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "../favorites/favorite.entity";
import { AuthService } from "./auth.service";
import { User } from "../users/user.entity";
import { HttpException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

describe("AuthService", () => {
  let service: AuthService;
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
      providers: [AuthService, UsersService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));

    // Setup initial data
    await repository.clear();
    await repository.save({
      id: 1,
      name: "John Doe",
      email: "test@mail.com",
      password: "$2a$10$ySywgZqxcxGEUY/24VkBSOroEbPlTlGL.YgQvKW69OklKb3eZ6DCS",
    });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should throw an error", async () => {
    await expect(() => service.login("test@mail.com", "")).rejects.toThrow(HttpException);
  });
});
