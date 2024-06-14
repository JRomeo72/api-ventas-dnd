import { DataTypes } from 'sequelize';
import sequelize from './connectDB.js';

let Date = sequelize.define('Date', {
    id: {
        primaryKey: true,
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data: {
        type: DataTypes.STRING
    }
});

export default Date