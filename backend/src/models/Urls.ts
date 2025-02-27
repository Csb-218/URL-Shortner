import mongoose, { Document } from 'mongoose';

export interface IUrl extends Document {
  urlId: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
}

const urlSchema = new mongoose.Schema({
  urlId: { type: String, required: true },
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  clicks: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUrl>('Url', urlSchema);