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
  hash: string;

  @NotEmpty
  @Column
  tokenType: number;

  @NotEmpty
  @Unique
  @Column
  tgID: number;
}
