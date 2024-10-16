const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const bcrypt = require('bcrypt');
const AppError = require("../../utils/appError");

module.exports = sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'userType cannot be null'
        },
        notEmpty: {
            msg: 'userType cannot be empty'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'firstName cannot be null'
        },
        notEmpty: {
            msg: 'firstName cannot be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'lastName cannot be null'
        },
        notEmpty: {
            msg: 'lastName cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'email cannot be null'
        },
        notEmpty: {
            msg: 'email cannot be empty'
        },
        isEmail: {
            msg: 'Invalid email id'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'password cannot be null'
        },
        notEmpty: {
            msg: 'password cannot be empty'
        }
      }
    },
    confirmPassword: {
        type: DataTypes.VIRTUAL,
        set(value) {
            if (this.password.length < 8) {
                throw new AppError('Password must have at least 8 characters', 400);
            }
            if (value === this.password) {
                const hashPassword = bcrypt.hashSync(value, 10);
                this.setDataValue('password', hashPassword);
            } else {
                throw new AppError('Passwords must match', 400);
            };
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
    modelName: 'user'
  });