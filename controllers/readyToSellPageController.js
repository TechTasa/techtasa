const ReadyToSell = require('../models/ReadyToSell');

exports.readyToSell_index = async function(req, res) {
    let items = await ReadyToSell.find({});
    const loggedin = req.session.user;
    res.render('readyToSellPageIndex', { items: items, loggedin });
};

exports.readyToSell_detail = async function(req, res) {
    try {
        let item = await ReadyToSell.findById(req.params.id);
        if (!item) {
            return res.status(404).send('Item not found');
        }

        // Normalize paths by replacing backslashes with forward slashes
        if (item.thumbnail) {
            item.thumbnail = item.thumbnail.replace(/\\/g, '/');
        }
        if (item.images) {
            item.images = item.images.map(img => img.replace(/\\/g, '/'));
        }
        if (item.videos) {
            item.videos = item.videos.map(vid => vid.replace(/\\/g, '/'));
        }
        if (item.documents) {
            item.documents = item.documents.map(doc => doc.replace(/\\/g, '/'));
        }

        

        const loggedin = req.session.user;
        res.render('readyToSellPageDetail', { item: item, loggedin });
    } catch (error) {
        console.error('Error in readyToSell_detail:', error);
        res.status(500).send('Error loading item details');
    }
};