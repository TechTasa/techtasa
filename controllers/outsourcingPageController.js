const Outsourcing = require('../models/Outsourcing');

exports.outsourcing_index = async function(req, res) {
    try {
        const outsourcingServices = await Outsourcing.find({});
        const loggedin = req.session.user;
        res.render('outsourcingPageIndex', { outsourcing: outsourcingServices,loggedin });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching outsourcing services');
    }
};

exports.outsourcing_detail = async function(req, res) {
    try {
        const outsourcingService = await Outsourcing.findById(req.params.id);
        const loggedin = req.session.user;
        res.render('outsourcingPageDetail', { outsourcing: outsourcingService,loggedin });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the outsourcing service');
    }
}; 