const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

//Create a variable called isProduction that will be true if the environment is in production or not by checking the environment key in the configuration file (backend/config/index.js):
const { environment } = require('./config');
const isProduction = environment === 'production';

//Initialize the Express application:
const app = express();