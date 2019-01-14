var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;
var date        = require("mongoose-timestamp");

// create schema
var newsPostSchema = new Schema({
    title: String,
    text: String,
});
// add date + time to newsposts
newsPostSchema.plugin(date);

module.exports = mongoose.model("newsPost", newsPostSchema);