const { Schema, model } = require('mongoose');

module.exports = model("Db", new Schema({
   id: String,
    data: {type: Array}
}))