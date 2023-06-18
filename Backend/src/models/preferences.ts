import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import {Notification  } from './notification';

export interface PrefrenceAttributes{
    Id:number;
    Language:string;
    Currency:string;
    customerId:number;
    
}

export class Preference extends Model<PrefrenceAttributes> implements PrefrenceAttributes{
    Id!: number;
    Language!: string;
    Currency !:string;
    customerId!:number;	
}
Preference.init({
    Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    
    Language: {
        type: DataTypes.STRING,
        defaultValue:"ENGLISH"

    },
    Currency: {
        type: DataTypes.STRING,
        defaultValue:"Dollar"

    },
    customerId:{
        type: DataTypes.INTEGER
        
    }
},{
    createdAt: false,
    updatedAt: false,
    sequelize,
    modelName:'Preference', 
    tableName:'Preference',
});

Preference.hasMany(Notification, { onDelete: 'cascade', foreignKey:  "preference_Id" });



(async () => {
    await sequelize.sync({  });
    // Code here



  })();