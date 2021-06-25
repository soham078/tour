
var FileReader = require('filereader')
, fileReader = new FileReader()
;
module.exports = (sequelize, Sequelize) => {
	const Image = sequelize.define('image', {
	  type: {
		type: Sequelize.STRING
	  },
	  name: {
		type: Sequelize.STRING
	  },
	  data: {
		type: Sequelize.BLOB('long'),
		get() {
			return Buffer.from(this.getDataValue('data')).toString('base64');
		},
	  }
	});

	return Image;
}
