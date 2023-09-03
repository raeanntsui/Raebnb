'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //! Review(1) => ReviewImage(*)
      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
        onDelete: "CASCADE"
      })


      // //! Uncomment below
      // //! Review(*) => User(1)
      // Review.belongsTo(models.User, {
      //   foreignKey: "userId"
      // }),

      // //! Review(*) => Spot(1)
      // Review.belongsTo(models.Spot, {
      //   foreignKey: "spotId"
      // })
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