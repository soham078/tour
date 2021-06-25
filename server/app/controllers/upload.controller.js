
const fs = require('fs');

const db = require('../config/db.config.js');
const Image = db.images;

// Upload a Multipart-File then saving it to MySQL database
exports.upload = (req, res) => {

	console.log(req.file.mimetype);
	if(req.file.size > 1048576) {
		console.log("File size extended");
		res.json({'err': "File size extended require 10 MB or less"});
	} else if (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/png") {
		console.log("File type not supported");
		res.json({'err': "File type not supported"});
	} else {
		Image.create({
			type: req.file.mimetype,
			name: req.file.originalname,
			data: fs.readFileSync(__basedir + '/resources/static/assets/uploads/' + req.file.filename)
		}).then(image => {
			try{
				fs.writeFileSync(__basedir + '/resources/static/assets/tmp/' + image.name, image.data);

				// exit node.js app
				res.send("<html><body>File uploaded <a href=\"javascript:history.back()\">Go Back</a></body></html>");
				//res.json({'msg': 'File uploaded successfully!', 'file': req.file});
			}catch(e){
				console.log(e);
				res.json({'err': e});
			}
		})
	}
};
