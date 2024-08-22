const Project = require('../models/Project');

exports.project_index = async function(req, res) {
    let projects = await Project.find({});
    const loggedin = req.session.user;
    
    res.render('projectPageIndex', { projects: projects, loggedin });
};

exports.project_detail = async function(req, res) {
    let project = await Project.findById(req.params.id);
    const loggedin = req.session.user;
    res.render('projectPageDetail', { project: project, loggedin });
};