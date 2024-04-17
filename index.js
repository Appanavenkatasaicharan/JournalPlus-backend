require('express-async-errors')
require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');



const port = process.env.PORT||5000;

// Import database requirements
const connectDB = require('./db/connect') 

// Import Middleware
const AuthorizeMiddleware = require('./middleware/AuthorizeMiddleware')
const notFound  = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

// Import Routers
const authRouter = require('./routes/authRoutes')
const taskRouter = require('./routes/tasksRouter')
const journalRouter = require("./routes/journalRouter");
const calendarRouter = require('./routes/calendarRoutes');
const { Console } = require('console');

var app = express();

app.use(cors())

app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

app.use(helmet())
app.use(xss())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add Routers to the middleware
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/tasks',AuthorizeMiddleware,taskRouter)
app.use('/api/v1/journals',AuthorizeMiddleware,journalRouter )
app.use('/api/v1/calendar',AuthorizeMiddleware,calendarRouter)


// Add Error handler and 404 case to the middleware
app.use(notFound)
app.use(errorHandler)

// Start the server on specified port.
const start = async () =>{
  try {
      await connectDB(process.env.MONGO_URL);
      app.listen(port,()=>console.log(`server listening on port ${port}...`));
  } catch (error) {
      console.log(error);
  }
}

start()
module.exports = app;
