const Technology = require('../models/Technology');

// Fetch all technologies for the index page
exports.technology_index = async function(req, res) {
    try {
        const technologies = await Technology.find({});
        const loggedin = req.session.user;
        res.render('technologyPageIndex', { technologies, loggedin });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching technologies');
    }
};

// Fetch a specific technology for the detail page
exports.technology_detail = async function(req, res) {
    try {
        const technology = await Technology.findById(req.params.id);
        if (!technology) {
            return res.status(404).send('Technology not found');
        }
        const loggedin = req.session.user;
        res.render('technologyPageDetail', { technology, loggedin });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the technology details');
    }
};