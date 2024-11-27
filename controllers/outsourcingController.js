const Outsourcing = require('../models/Outsourcing');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.outsourcing_list = async function (req, res) {
    try {
        let outsourcing = await Outsourcing.find({});
        const userType = req.session.user.userType;
        res.render('outsourcingList', { outsourcing: outsourcing, userType });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching technologies');
    }
};

exports.outsourcing_create_get = function (req, res) {
    const userType = req.session.user.userType;
    res.render('outsourcingCreate', { userType });
};

exports.outsourcing_create_post = [
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'instructorImage', maxCount: 1 }]),
    async function (req, res) {
        try {
            const outsourcing = new Outsourcing({
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
            await outsourcing.save();
            res.redirect('/dashboard/outsourcing');
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while creating the technology');
        }
    }
];

exports.outsourcing_edit_get = async function (req, res) {
    try {
        let outsourcing = await Outsourcing.findById(req.params.id);
        const userType = req.session.user.userType;
        res.render('outsourcingEdit', { outsourcing: outsourcing, userType });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the outsourcing');
    }
};

exports.outsourcing_edit_post = [
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'instructorImage', maxCount: 1 }]),
    async function (req, res) {
        try {
            let outsourceData = {
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
                outsourceData.image = req.files['image'][0].path;
            }
            if (req.files['instructorImage']) {
                outsourceData.instructor.image = req.files['instructorImage'][0].path;
            } else {
                // If instructor image is not changed, retain the existing image
                let existingOutsource = await Outsourcing.findById(req.params.id);
                outsourceData.instructor.image = existingOutsource.instructor.image;
            }
            let outsource = await Outsourcing.findByIdAndUpdate(req.params.id,  outsourceData, { new: true });
            res.redirect('/dashboard/outsourcing');
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while updating the technology');
        }
    }
];

exports.outsourcing_delete = async function (req, res) {
    try {
        await Outsourcing.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard/outsourcing');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the technology');
    }
};