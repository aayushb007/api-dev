const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name : String,
    discription : String,
    quantity : Number,
    unit : Number
});
const userModel = mongoose.model('product',userSchema);
module.exports = userModel ;