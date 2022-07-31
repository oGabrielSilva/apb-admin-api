import mongoose from 'mongoose'
import Session from '../Model/Session'

async function sessionCreate(id: mongoose.Types.ObjectId) {
  const sessionById = await Session.findOne({ id })
  if (sessionById) await sessionById.delete()
  const session = await Session.create({ id })
  return session
}

export default sessionCreate
