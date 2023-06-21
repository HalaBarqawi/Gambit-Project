import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';


export interface TransAttributes {
  Id: number;
  customerId: number;
  Date: Date;
  Quantity: number;
  Price_per_Unit: number;
  Discount: number;
  Taxes: number;
  Total_price: number;
  Total:number;
  Currency:string;
}

export class Trans extends Model<TransAttributes> implements TransAttributes {
  Id!: number;
  customerId!: number;
  Date!: Date;
  Quantity!: number;
  Price_per_Unit!: number;
  Discount!: number;
  Taxes!: number;
  Total_price!: number;
  Total!:number;
  Currency!:string;
}

Trans.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue:DataTypes.NOW()
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
    Currency:{
      type:DataTypes.STRING,

    },
    Total:{
      type:DataTypes.FLOAT,
      defaultValue:0.0,

    },
    customerId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'Trans',
    tableName: 'Transaction',
  }
);

(async () => {
  await sequelize.sync({});
  // Code here
})();
