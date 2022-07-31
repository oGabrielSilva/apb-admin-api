import { model, Schema } from 'mongoose'
import { TUser } from '../types/account'

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    lastLogin: { type: Date, default: Date.now },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const User = model<TUser>('User', userSchema)

export default User
