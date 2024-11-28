const ReadyToSell = require('../models/ReadyToSell');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.readyToSell_list = async function(req, res) {
    let items = await ReadyToSell.find({}, 'title author shortDescription image');
    const userType = req.session.user.userType;
    res.render('readyToSellList', { items: items, userType });
};

exports.readyToSell_create_get = function(req, res) {
    const userType = req.session.user.userType;
    const userName = req.session.user.username;
    res.render('readyToSellCreate', { userType, userName });
};

exports.readyToSell_create_post = async function(req, res) {
    const item = new ReadyToSell({
        ...req.body,
        image: req.file ? req.file.path : null,
    });
    await item.save();
    res.redirect('/dashboard/readyToSell');
};

exports.readyToSell_edit_get = async function(req, res) {
    let item = await ReadyToSell.findById(req.params.id);
    const userType = req.session.user.userType;
    res.render('readyToSellEdit', { item: item, userType });
};

exports.readyToSell_edit_post = async function(req, res) {
    let itemData = {...req.body};
    if (req.file) {
        itemData.image = req.file.path;
    }
    let item = await ReadyToSell.findByIdAndUpdate(req.params.id, itemData, { new: true });
    res.redirect('/dashboard/readyToSell');
};

exports.readyToSell_delete = async function(req, res) {
    await ReadyToSell.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard/readyToSell');
}; 