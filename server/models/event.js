const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level:{
    type: String,
    // required: true

  },
  description: {
    type: String,
    required: true
  },
  dateAt: {
    type: String,
    required: true
  },
  timeAt: {
    type: String,
    required: true,
  noofteams:{
    type: String,
    required: true,
  }
  }
});
var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
module.exports = mongoose.model('Image', imageSchema);

module.exports = mongoose.model('Post', PostSchema);