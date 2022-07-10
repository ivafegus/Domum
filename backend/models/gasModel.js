var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var gasSchema = new Schema({
	price: {
		type: mongoose.Schema.Types.Decimal128,
        required: true,
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('gas', gasSchema);
