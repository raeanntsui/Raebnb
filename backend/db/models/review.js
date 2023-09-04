'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      //! Review(1) => ReviewImage(*)
      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
        onDelete: "CASCADE"
      })

      //! Review(*) => User(1)
      Review.belongsTo(models.User, {
        foreignKey: "userId"
      })

      //! Review(*) => Spot(1)
      Review.belongsTo(models.Spot, {
        foreignKey: "spotId"
      })
    }
  }
  Review.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};