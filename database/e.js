const { Schema, model } = require('mongoose');

module.exports = model("e", new Schema({
   id: String,
    data: {type: Array}
}))