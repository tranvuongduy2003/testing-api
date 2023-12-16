import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { User } from '@interfaces/users.interface';
import { Role } from '@/interfaces/auth.interface';

export type UserCreationAttributes = Optional<User, 'id'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public role: Role;
  public fullname: string;
  public phone: string;
  public dob: Date;
  public isActive: boolean;
  public id: number;
  public email: string;
  public password: string;
  public avatar: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
const initModel = (sequelize: Sequelize): typeof UserModel => {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      fullname: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      dob: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      isActive: {
        defaultValue: true,
        type: DataTypes.BOOLEAN,
      },
      role: {
        defaultValue: Role.CUSTOMER,
        type: DataTypes.ENUM(...Object.values(Role)),
      },
      avatar: {
        allowNull: true,
        type: DataTypes.STRING(500),
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      sequelize,
      paranoid: true,
    },
  );

  return UserModel;
};

export default initModel;
