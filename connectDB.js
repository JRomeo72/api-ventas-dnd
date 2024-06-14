// import { Sequelize, Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";

let sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/db.sqlite'
});

// class Orders extends Model {}

// Orders.init({
//     id: DataTypes.INTEGER ,
//     casa: DataTypes.STRING,
//     pol: DataTypes.STRING,
//     cash: DataTypes.DECIMAL
// }, { sequelize, modelName: 'orders' });

// sequelize.sync()

export default sequelize