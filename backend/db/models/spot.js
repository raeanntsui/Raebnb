'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
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