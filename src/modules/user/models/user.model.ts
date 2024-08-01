import {
  AutoIncrement,
  Column,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table
export class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @NotEmpty
  @Column
  name: string;

  @NotEmpty
  @Unique
  @Column
  email: string;

  @NotEmpty
  @Unique
  @Column
  phone: string;

  @NotEmpty
  @Column
  password: string;

  @NotEmpty
  @Unique
  @Column
  tokenType: string;

  @NotEmpty
  @Unique
  @Column
  tgID: number;
}
