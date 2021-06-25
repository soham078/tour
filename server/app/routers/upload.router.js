
const db = require('../config/db.config.js');
const Image = db.images;

module.exports = function(app){
	const upload = require('../config/upload.config.js');
	const fileWorker = require('../controllers/upload.controller.js');

	app.post('/uploadfile', upload.single("uploadfile"), fileWorker.upload);
	app.get('/images', function(req, res) {
		Image.findAll({
			attributes: [
				'id',
				'type',
				'data',
				'name',
			]
		  }).then((notes) => res.json(notes));
	  });
}
