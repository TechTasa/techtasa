const Outsourcing = require('../models/Outsourcing');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = 'uploads/';
        if (file.fieldname === 'thumbnail' || file.fieldname === 'images' || file.fieldname === 'instructorImage') {
            uploadPath += 'images/';
        } else if (file.fieldname === 'videos') {
            uploadPath += 'videos/';
        } else if (file.fieldname === 'documents') {
            uploadPath += 'documents/';
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter function
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'videos') {
        // Allow video files
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed!'), false);
        }
    } else if (file.fieldname === 'images' || file.fieldname === 'thumbnail' || file.fieldname === 'instructorImage') {
        // Allow image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    } else if (file.fieldname === 'documents') {
        // Allow document files
        const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and Word documents are allowed!'), false);
        }
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit
    }
});

const uploadFields = upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 10 },
    { name: 'documents', maxCount: 10 },
    { name: 'instructorImage', maxCount: 1 }
]);

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

exports.outsourcing_create_post = [uploadFields, async function (req, res) {
    try {
        const outsourcingData = {
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

        // Handle file uploads
        if (req.files['thumbnail']) {
            outsourcingData.thumbnail = 'uploads/images/' + req.files['thumbnail'][0].filename;
        }
        if (req.files['images']) {
            outsourcingData.images = req.files['images'].map(file => 'uploads/images/' + file.filename);
        }
        if (req.files['videos']) {
            outsourcingData.videos = req.files['videos'].map(file => 'uploads/videos/' + file.filename);
        }
        if (req.files['documents']) {
            outsourcingData.documents = req.files['documents'].map(file => 'uploads/documents/' + file.filename);
        }
        if (req.files['instructorImage']) {
            outsourcingData.instructor.image = 'uploads/images/' + req.files['instructorImage'][0].filename;
        }

        const outsourcing = new Outsourcing(outsourcingData);
        await outsourcing.save();
        res.redirect('/dashboard/outsourcing');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the technology');
    }
}];

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

exports.outsourcing_edit_post = [uploadFields, async function (req, res) {
    try {
        let existingOutsourcing = await Outsourcing.findById(req.params.id);
        if (!existingOutsourcing) {
            return res.status(404).send('Item not found');
        }

        const outsourcingData = {
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
                bio: req.body.instructorBio,
                image: existingOutsourcing.instructor.image
            },
            type: req.body.type
        };

        // Handle file uploads - preserve existing files if no new ones uploaded
        if (req.files['thumbnail']) {
            outsourcingData.thumbnail = 'uploads/images/' + req.files['thumbnail'][0].filename;
        } else {
            outsourcingData.thumbnail = existingOutsourcing.thumbnail;
        }

        if (req.files['images']) {
            const newImages = req.files['images'].map(file => 'uploads/images/' + file.filename);
            outsourcingData.images = [...(existingOutsourcing.images || []), ...newImages];
        } else {
            outsourcingData.images = existingOutsourcing.images;
        }

        if (req.files['videos']) {
            const newVideos = req.files['videos'].map(file => 'uploads/videos/' + file.filename);
            outsourcingData.videos = [...(existingOutsourcing.videos || []), ...newVideos];
        } else {
            outsourcingData.videos = existingOutsourcing.videos;
        }

        if (req.files['documents']) {
            const newDocuments = req.files['documents'].map(file => 'uploads/documents/' + file.filename);
            outsourcingData.documents = [...(existingOutsourcing.documents || []), ...newDocuments];
        } else {
            outsourcingData.documents = existingOutsourcing.documents;
        }

        if (req.files['instructorImage']) {
            outsourcingData.instructor.image = 'uploads/images/' + req.files['instructorImage'][0].filename;
        }

        await Outsourcing.findByIdAndUpdate(req.params.id, outsourcingData);
        res.redirect('/dashboard/outsourcing');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the technology');
    }
}];

exports.outsourcing_delete = async function (req, res) {
    try {
        await Outsourcing.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard/outsourcing');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the technology');
    }
};