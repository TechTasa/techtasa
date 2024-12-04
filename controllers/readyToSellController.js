const ReadyToSell = require('../models/ReadyToSell');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure upload directories exist
const createUploadDirs = () => {
    const dirs = ['uploads/images', 'uploads/videos', 'uploads/documents'];
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

createUploadDirs();

// Configure multer for different file types
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = 'uploads/';
        if (file.fieldname === 'thumbnail' || file.fieldname === 'images') {
            uploadPath += 'images/';
        } else if (file.fieldname === 'videos') {
            uploadPath += 'videos/';
        } else if (file.fieldname === 'documents') {
            uploadPath += 'documents/';
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images for thumbnail and images fields
    if ((file.fieldname === 'thumbnail' || file.fieldname === 'images') && file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    // Accept videos
    else if (file.fieldname === 'videos' && file.mimetype.startsWith('video/')) {
        cb(null, true);
    }
    // Accept documents
    else if (file.fieldname === 'documents' && [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/xml',
        'text/xml',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type for field ' + file.fieldname), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    }
});

const uploadFields = upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 3 },
    { name: 'documents', maxCount: 5 }
]);

exports.readyToSell_list = async function(req, res) {
    let items = await ReadyToSell.find({}, 'title author shortDescription thumbnail');
    const userType = req.session.user.userType;
    res.render('readyToSellList', { items: items, userType });
};

exports.readyToSell_create_get = function(req, res) {
    const userType = req.session.user.userType;
    const userName = req.session.user.username;
    res.render('readyToSellCreate', { userType, userName });
};

exports.readyToSell_create_post = [uploadFields, async function(req, res) {
    try {
        const itemData = {
            ...req.body,
            thumbnail: req.files['thumbnail'] ? 'uploads/images/' + req.files['thumbnail'][0].filename : null,
            images: req.files['images'] ? req.files['images'].map(file => 'uploads/images/' + file.filename) : [],
            videos: req.files['videos'] ? req.files['videos'].map(file => 'uploads/videos/' + file.filename) : [],
            documents: req.files['documents'] ? req.files['documents'].map(file => 'uploads/documents/' + file.filename) : []
        };

        // console.log('Creating new item with data:', itemData);

        const item = new ReadyToSell(itemData);
        await item.save();
        res.redirect('/dashboard/readyToSell');
    } catch (error) {
        console.error('Error in readyToSell_create_post:', error);
        res.status(500).send('Error creating item');
    }
}];

exports.readyToSell_edit_get = async function(req, res) {
    let item = await ReadyToSell.findById(req.params.id);
    const userType = req.session.user.userType;
    res.render('readyToSellEdit', { item: item, userType });
};

exports.readyToSell_edit_post = [uploadFields, async function(req, res) {
    try {
        const existingItem = await ReadyToSell.findById(req.params.id);
        if (!existingItem) {
            return res.status(404).send('Item not found');
        }

        const itemData = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            author: req.body.author,
            url: req.body.url
        };

        // Handle thumbnail
        if (req.files['thumbnail']) {
            itemData.thumbnail = 'uploads/images/' + req.files['thumbnail'][0].filename;
        }

        // Handle images - combine existing with new ones
        if (req.files['images']) {
            const newImages = req.files['images'].map(file => 'uploads/images/' + file.filename);
            itemData.images = [...(existingItem.images || []), ...newImages];
        }

        // Handle videos - combine existing with new ones
        if (req.files['videos']) {
            const newVideos = req.files['videos'].map(file => 'uploads/videos/' + file.filename);
            itemData.videos = [...(existingItem.videos || []), ...newVideos];
        }

        // Handle documents - combine existing with new ones
        if (req.files['documents']) {
            const newDocuments = req.files['documents'].map(file => 'uploads/documents/' + file.filename);
            itemData.documents = [...(existingItem.documents || []), ...newDocuments];
        }

        await ReadyToSell.findByIdAndUpdate(req.params.id, itemData);
        res.redirect('/dashboard/readyToSell');
    } catch (error) {
        console.error('Error updating ready to sell item:', error);
        res.status(500).send(error.message);
    }
}];

exports.readyToSell_delete = async function(req, res) {
    await ReadyToSell.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard/readyToSell');
};