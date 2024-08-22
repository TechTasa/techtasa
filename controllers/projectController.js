const Project = require('../models/Project');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.project_list = async function(req, res) {
    let projects = await Project.find({}, 'title author shortDescription image');
    const userType = req.session.user.userType;
    res.render('projectList', { projects: projects, userType });
};

exports.project_create_get = function(req, res) {
    const userType = req.session.user.userType;
    const userName = req.session.user.username;
    res.render('projectCreate', { userType, userName });
};

exports.project_create_post = async function(req, res) {
    console.log(req.body);
    const project = new Project({
        ...req.body,
        image: req.file ? req.file.path : null,
    });
    await project.save();
    res.redirect('/dashboard/project');
};

exports.project_edit_get = async function(req, res) {
    let project = await Project.findById(req.params.id);
    const userType = req.session.user.userType;
    res.render('projectEdit', { project: project, userType });
};

exports.project_edit_post = async function(req, res) {
    let projectData = {...req.body};
    if (req.file) {
        projectData.image = req.file.path;
    }
    let project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true });
    res.redirect('/dashboard/project');
};

exports.project_delete = async function(req, res) {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard/project');
};