var mongoose = require('mongoose');
var schedulerSchema = mongoose.Schema({
        username: String,
        pikupdate: Date,
        pikuptime:String
});
module.exports = mongoose.model('schedulero', schedulerSchema);