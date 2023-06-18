import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { Customer } from './customer';

export interface TransAttributes {
  Id: number;
  customer_id: string;
  Date: Date;
  Quantity: number;
  Price_per_Unit: number;
  Discount: number;
  Taxes: number;
  Total_price: number;
}

export class Trans extends Model<TransAttributes> implements TransAttributes {
    Id!: number;
    customer_id!: string;
    Date!: Date;
    Quantity!: number;
    Price_per_Unit!: number;
    Discount!: number;
    Taxes!: number;
    Total_price!: number;
}

Trans.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Price_per_Unit: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    Discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Taxes: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    Total_price: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
 
  },
  {
    sequelize,
    modelName: 'Trans',
    tableName: 'Transaction',
  }
);
Customer.hasMany(Trans);
Trans.belongsTo(Customer, { foreignKey: "customer_id" });
(async () => {
  await sequelize.sync({  });
  // Code here
})();
