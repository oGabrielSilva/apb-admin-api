import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'
import { TSession } from '../types/account'

const genUid = () => `${v4()}-${v4()}`

const sessionSchema = new Schema<TSession>(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    uid: { type: String, default: genUid },
  },
  { timestamps: true }
)

const Session = model<TSession>('Session', sessionSchema)

export default Session
