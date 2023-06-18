import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export interface NotificationAttributes {
  Id: number;
  Type: string;
  Receiver: string;
  Is_Active: boolean;
  Is_ReceiverConfirmed: boolean;
  ReceiverConfirmedDate: Date;
  preference_Id: number;
}

export class Notification
  extends Model<NotificationAttributes>
  implements NotificationAttributes
{
  Id!: number;
  Type!: string;
  Receiver!: string;
  Is_Active!: boolean;
  Is_ReceiverConfirmed!: boolean;
  ReceiverConfirmedDate!: Date;
  preference_Id!: number;
}
Notification.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    Type: {
      type: DataTypes.STRING,
      defaultValue: 'SMS',
    },
    Receiver: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    Is_Active: {
      type: DataTypes.BOOLEAN,
      defaultValue:true
    },
    Is_ReceiverConfirmed: {
      type: DataTypes.BOOLEAN, 
      defaultValue:true
    },
    ReceiverConfirmedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    preference_Id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName: 'Notification',
    tableName: 'Notification',
  }
);

(async () => {
  await sequelize.sync({});
  // Code here
})();
