module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
      isEmail: true
    }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[1]
      }
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [8]
      }
    },
    //paments stuff needed here
    rating:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[1]
      }
    },
    profilepicture:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[1]
      }
    }

    
    
  
  });


  return User;
};
