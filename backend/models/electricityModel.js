var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var electricitySchema = new Schema({
	price: {
		type: mongoose.Schema.Types.Decimal128,
        required: true,
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('electricity', electricitySchema);
