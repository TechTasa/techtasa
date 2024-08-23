const Technology = require('../models/Technology');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.technology_list = async function(req, res) {
    try {
        let technologies = await Technology.find({});
        const userType = req.session.user.userType;
        res.render('technologyList', { technologies: technologies, userType });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching technologies');
    }
};

exports.technology_create_get = function(req, res) {
    const userType = req.session.user.userType;
    res.render('technologyCreate', { userType });
};

exports.technology_create_post = [
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'instructorImage', maxCount: 1 }]),
    async function(req, res) {
        try {
            const technology = new Technology({
                name: req.body.name,
                shortDescription: req.body.shortDescription,
                heroTitle: req.body.heroTitle,
                heroDescription: req.body.heroDescription,
                image: req.files['image'] ? req.files['image'][0].path : null,
                courseInfo: {
                    whatYoullLearn: req.body.whatYoullLearn.split(',').map(item => item.trim()).filter(item => item !== ''),
                    duration: req.body.duration,
                    format: req.body.format,
                    price: req.body.price,
                    certification: req.body.certification === 'on'
                },
                benefits: req.body.benefits.split(',').map(item => item.trim()).filter(item => item !== ''),
                instructor: {
                    name: req.body.instructorName,
                    image: req.files['instructorImage'] ? req.files['instructorImage'][0].path : null,
                    bio: req.body.instructorBio
                },
                type: req.body.type
            });
            await technology.save();
            res.redirect('/dashboard/technology');
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while creating the technology');
        }
    }
];

exports.technology_edit_get = async function(req, res) {
    try {
        let technology = await Technology.findById(req.params.id);
        const userType = req.session.user.userType;
        res.render('technologyEdit', { technology: technology, userType });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the technology');
    }
};

exports.technology_edit_post = [
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'instructorImage', maxCount: 1 }]),
    async function(req, res) {
        try {
            let technologyData = {
                name: req.body.name,
                shortDescription: req.body.shortDescription,
                heroTitle: req.body.heroTitle,
                heroDescription: req.body.heroDescription,
                courseInfo: {
                    whatYoullLearn: req.body.whatYoullLearn.split(',').map(item => item.trim()).filter(item => item !== ''),
                    duration: req.body.duration,
                    format: req.body.format,
                    price: req.body.price,
                    certification: req.body.certification === 'on'
                },
                benefits: req.body.benefits.split(',').map(item => item.trim()).filter(item => item !== ''),
                instructor: {
                    name: req.body.instructorName,
                    bio: req.body.instructorBio
                },
                type: req.body.type
            };
            if (req.files['image']) {
                technologyData.image = req.files['image'][0].path;
            }
            if (req.files['instructorImage']) {
                technologyData.instructor.image = req.files['instructorImage'][0].path;
            } else {
                // If instructor image is not changed, retain the existing image
                let existingTechnology = await Technology.findById(req.params.id);
                technologyData.instructor.image = existingTechnology.instructor.image;
            }
            let technology = await Technology.findByIdAndUpdate(req.params.id, technologyData, { new: true });
            res.redirect('/dashboard/technology');
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while updating the technology');
        }
    }
];

exports.technology_delete = async function(req, res) {
    try {
        await Technology.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard/technology');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the technology');
    }
};