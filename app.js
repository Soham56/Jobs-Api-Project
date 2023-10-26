require('dotenv').config();
require('express-async-errors');

//Security Packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const {rateLimit} = require('express-rate-limit');

// Implementing Swagger Ui 
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;

//Routes
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');

//Middlewares
const errorHandlers = require('./middlewares/error-handler');
const notFound = require('./middlewares/not-found');
const authenticateMiddleware = require('./middlewares/authentication');

//Connect Database
const connectDb = require('./db/connect');


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Appling the rate limiting middleware to all requests
app.set('trust proxy',1);
app.use(limiter);

//Middleware to accept json request
app.use(express.json());

//Appling all sequrity middlewares
app.use(helmet());
app.use(cors());
app.use(xss());

//Home Route
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Integrate routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authenticateMiddleware,jobsRoutes);

//Route not Found
app.use(notFound);
// Error Handler middleware
app.use(errorHandlers);


const start = async ()=>{
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`Server is listening on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}


start();
