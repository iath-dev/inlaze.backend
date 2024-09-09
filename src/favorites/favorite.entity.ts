import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn()
  public user!: User;

  @Column()
  public itemId!: number;
}
