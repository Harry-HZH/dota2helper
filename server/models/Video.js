const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{ type:String },
  icon:{ type:String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  url:{type:String },
})

module.exports = mongoose.model('Video',schema)