import { Favorite } from "src/favorites/favorite.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ unique: true })
  public email!: string;

  @Column({ default: "John Smith" })
  public name!: string;

  @Column()
  public password!: string;

  @Column({ default: true })
  public isActive!: boolean;

  @OneToMany(() => Favorite, (fav) => fav.user)
  public favorites!: Favorite[];
}
