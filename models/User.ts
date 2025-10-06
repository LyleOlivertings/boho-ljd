// models/User.ts

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);