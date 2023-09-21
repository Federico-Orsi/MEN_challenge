import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const { Schema } = mongoose;
export const MAX_TITLE_LENGTH = 20;
export const MAX_BODY_LENGTH = 200;

export const TITLE_FIELD_NAME = 'title';
export const AUTHOR_FIELD_NAME = 'author';
export const BODY_FIELD_NAME = 'body';

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: MAX_TITLE_LENGTH,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  body: {
    type: String,
    required: true,
    maxlength: MAX_BODY_LENGTH,
  },
  date: { type: Date, default: Date.now },
  category: { type: String, default: "Random" },
  comments: { type: Array, default: [] }
}).plugin(mongoosePaginate)

PostSchema.methods.toJSON = function () {
  const user = this.toObject({ versionKey: false });
  return user;
};

export default mongoose.model('Post', PostSchema);
