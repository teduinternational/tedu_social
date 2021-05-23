import mongoose, { Schema } from 'mongoose';

import { IRefreshToken } from './refresh_token.interface';

const RefreshTokenSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  token: String,
  expires: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
});

RefreshTokenSchema.virtual('isExpired').get(function (this: { expires: Date }) {
  return Date.now() >= this.expires.getTime();
});

RefreshTokenSchema.virtual('isActive').get(function (this: { revoked: Date; isExpired: boolean }) {
  return !this.revoked && !this.isExpired;
});

RefreshTokenSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.id;
    delete ret.user;
  },
});

export default mongoose.model<IRefreshToken & mongoose.Document>('refreshToken', RefreshTokenSchema);
