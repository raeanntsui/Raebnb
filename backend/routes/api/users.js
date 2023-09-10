const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('First Name is required'),
    check('lastName')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Last Name is required'),
    handleValidationErrors
  ];
  

router.post(
  '/',
  validateSignup,
  async (req, res) => {

    const { firstName, lastName, email, password, username } = req.body;
    
    const hashedPassword = bcrypt.hashSync(password);
    
    // const user = await User.create({ firstName, lastName, email, username, hashedPassword });

    if (!validationResult(req).isEmpty()) {
      res.status(400)
      return res.json({
        message: "Bad Request",
        errors: errors.array().reduce((acc, error) => {
          acc[error.param] = error.msg;
          return acc;
        }, {}),
      });
    }

    // grab existing email in the db
    const existingEmail = await User.findOne({
      where: {
        email
      }
    })

    // grab existing username from db
    const existingUsername = await User.findOne({
      where: {
        username
      }
    })

    // username checker: check if a username already exists in db
    // if (existingUsername) {
    //   res.status(500)
    //   res.json({
    //     message: "Validation error",
    //     errors: {
    //       username: "Username must be unique"
    //     }        
    //   })
    // }

    // email checker: check if an email already exists in db
    // if (existingEmail) {
    //   res.status(500)
    //   res.json({
    //     message: "Validation error",
    //     errors: {
    //       username: "Email must be unique"
    //     }
    //   })
    // }

    let errors = {};

    if (existingUsername) {
      errors.username = "Username must be unique";
    }

    if (existingEmail) {
      errors.email = "Email must be unique";
    }

    if (Object.keys(errors).length > 0) {
      res.status(500);
      return res.json({
        message: "Validation error",
        errors
      });
    }

    // if no errors, create the new user in db
    const user = await User.create({ 
      firstName, 
      lastName, 
      email, 
      username, 
      hashedPassword });
    
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

module.exports = router;
