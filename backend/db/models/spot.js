'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // //! Spot => Users MANY TO MANY
      // Spot.belongsToMany(models.User, {
      //   through: models.Review,
      //   foreignKey: "spotId",
      //   otherKey: "userId"
      // })

      // //! Spot(1) => Bookings(*) => User(1) MANY TO MANY!
      // Spot.belongsToMany(models.User, {
      //   through: models.Booking,
      //   foreignKey: "spotId",
      //   otherKey: "userId"
      // })

      //! Spot(1) => Bookings(*)
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE"
      })

      //! Spot(1) => Reviews(*)
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: "CASCADE"
      })

      //! Spot(1) => SpotImages(*)
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        onDelete: "CASCADE"
      })

      //! Spot(*) => User(1)
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId"
      })
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};