import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { Preference } from './preferences';

export interface CustomerAttributes {
  Id: number;
  Email: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  Is_SuperUser: boolean;
  Password: string;
  Joined_Date: Date;
  Is_Active: boolean;
  Is_Deleted: boolean;
  Last_Login?: Date;
}

export class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
  public Id!: number;
  public Email!: string;
  public UserName!: string;
  public FirstName!: string;
  public LastName!: string;
  public Is_SuperUser!: boolean;
  public Password!: string;
  public Joined_Date!: Date;
  public Is_Active!: boolean;
  public Is_Deleted!: boolean;
  public Last_Login?: Date;
}

Customer.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Is_SuperUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Joined_Date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    Is_Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    Is_Deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Last_Login: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers',

  }
);
Customer.hasMany(Preference, { onDelete: 'cascade', foreignKey:  "customerId" });

(async () => {
  await sequelize.sync({  });
  // Code here
})();
