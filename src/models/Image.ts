import mongoose, { Document, Schema } from 'mongoose';

export interface ImageDocument extends Document {
  title: string;
  image: string;
  likesCount: number;
  likedBy: string[]; 
}

const ImageSchema = new Schema<ImageDocument>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  likesCount: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] },
}, { timestamps: true, versionKey: false });

export default mongoose.model<ImageDocument>('Image', ImageSchema);