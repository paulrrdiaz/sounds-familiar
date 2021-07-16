import { Schema, model, models } from 'mongoose';

const PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  tracks: [
    {
      artist: String,
      title: String,
      uri: String,
      id: String,
      picture: String
    }
  ],
  followers: [String],
  isPublic: {
    type: Boolean,
    default: false
  }
});

PlaylistSchema.methods.toJSON = function () {
  const { __v, _id, ...playlist } = this.toObject();

  return { ...playlist, uid: _id };
};

export default models.Playlist || model('Playlist', PlaylistSchema);
