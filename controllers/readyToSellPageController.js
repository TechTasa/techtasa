const ReadyToSell = require('../models/ReadyToSell');

exports.readyToSell_index = async function(req, res) {
    let items = await ReadyToSell.find({});
    const loggedin = req.session.user;
    res.render('readyToSellPageIndex', { items: items, loggedin });
};

exports.readyToSell_detail = async function(req, res) {
    let item = await ReadyToSell.findById(req.params.id);
    const loggedin = req.session.user;
    res.render('readyToSellPageDetail', { item: item, loggedin });
}; 