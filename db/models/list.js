const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define('list', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'List name cannot be null'
        },
        notEmpty: {
            msg: 'List name cannot be empty'
        }
      }
    },
    items: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'Items cannot be null'
        },
        notEmpty: {
            msg: 'Items cannot be empty'
        }
      }
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user',
          key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    paranoid: true,
    freezeTableName: true,
    modelName: 'list'
  })