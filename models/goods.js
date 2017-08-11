// Dependencies
// npm install sequelize-mysql-timestamp
// const TIMESTAMP = require("sequelize-mysql-timestamp")(sequelize);


// Creating Goods model
module.exports = function(sequelize, DataTypes) {
  var Items = sequelize.define("Items", {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pricePerHour: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
    },
    // outTimeStamp: {
    //   type: TIMESTAMP,
    //   allowNull: false
    // },
    // inTimeStamp: {
    //   type: TIMESTAMP,
    //   allowNull: false
    // },
    totalCost: {
      type: DataTypes.DECIMAL(10,2),
    },
    itemPhoto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    availability: {
      type: DataTypes.DATE
    }
  });

  Items.associate = function(models) {
    Items.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Items;
};
