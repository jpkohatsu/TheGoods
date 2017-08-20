'use strict';

// Creating Goods model
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    itemName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: true
    },
    from: {
      type: DataTypes.DATE,
      allowNull: true
    },
    to: {
      type: DataTypes.DATE,
      allowNull: true
    },
    totalCost: {
      type: DataTypes.DECIMAL(10,2),
    },
    itemPhoto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Item.associate = function(models) {
    Item.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Item;
};
