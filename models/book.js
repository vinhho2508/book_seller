var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: {type: String, required: true},
    author: { type: Schema.ObjectId, ref: 'Author', required: true },
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    picture:{type:String,required:true},
    genre: [{ type: Schema.ObjectId, ref: 'Genre' }],
    amount:{type:Number,min:0,required:true},
    price:{type:Number,required:true,min:0}

});

// Virtual for this book instance URL.
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/'+this._id;
});

// Export model.
module.exports = mongoose.model('Book', BookSchema);
