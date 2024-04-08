import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'user', enum: ['user', 'admin']},
  password: { type: String, required: true },

}, {timestamps: true ,versionKey: false });

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<UserDocument>('User', UserSchema);
