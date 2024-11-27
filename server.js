const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const bodyParser = require('body-parser');
const { connect } = require('./config/db');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const managementRoutes = require('./routes/managementRoutes');
const leadsRoutes = require('./routes/leadsRoutes');
const jobRoutes = require('./routes/jobRoutes');
const careerRoutes = require('./routes/careerRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const blogRoutes = require('./routes/blogRoutes');
const blogPageRoutes = require('./routes/blogPageRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const projectRoutes = require('./routes/projectRoutes');
const projectPageRoutes = require('./routes/projectPageRoutes');
const technologyRoutes = require('./routes/technologyRoutes');
const technologyPageRoutes = require('./routes/technologyPageRoutes');
const outsourcingRoutes = require('./routes/outsourcingRoutes'); // Import outsourcing routes
const outsourcingPageRoutes = require('./routes/outsourcingPageRoutes'); // Import outsourcing page routes
const Blog = require('./models/Blog');

const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Connect Database
connect();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session Store
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});

// Session Middleware
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

// Route Definitions
app.use('/auth', authRoutes);
app.use('/loan', leadRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/dashboard/management', managementRoutes);
app.use('/dashboard/leads', leadsRoutes);
app.use('/dashboard/jobs', jobRoutes);
app.use('/dashboard/resume', resumeRoutes);
app.use('/dashboard/blog', blogRoutes);
app.use('/dashboard/project', projectRoutes);
app.use('/dashboard/technology', technologyRoutes);
app.use('/dashboard/outsourcing', outsourcingRoutes); // Add outsourcing routes
app.use('/career', careerRoutes);
app.use('/blog', blogPageRoutes);
app.use('/projects', projectPageRoutes);
app.use('/', testimonialRoutes);
app.use('/technology', technologyPageRoutes);
app.use('/outsourcing', outsourcingPageRoutes); // Add outsourcing page routes

// Home Route
app.get('/', async (req, res) => {
    const loggedin = req.session.user;
    let blogs = await Blog.find({}, 'title image');
    res.render("home", { loggedin, blogs });
});

// About Route
app.get('/about', (req, res) => {
    const loggedin = req.session.user;
    res.render("about", { loggedin });
});

// Other Routes
app.get('/apps', (req, res) => {
    const loggedin = req.session.user;
    res.render("apps", { loggedin });
});

app.get('/projectsold', (req, res) => {
    const loggedin = req.session.user;
    res.render("projects", { loggedin });
});



app.get('/readytosell', (req, res) => {
    const loggedin = req.session.user;
    res.render("readytosell", { loggedin });
});

app.get('/services', (req, res) => {
    const loggedin = req.session.user;
    res.render("services", { loggedin });
});

app.get('/contact', (req, res) => {
    const loggedin = req.session.user;
    res.render("contact", { loggedin });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));