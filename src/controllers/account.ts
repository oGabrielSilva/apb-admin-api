import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import validator from 'validator'
import config from '../config.app'
import exception from '../exception/response'
import User from '../Model/User'
import { TUser, TUserSignIn } from '../types/account'
import sessionCreate from './session'

const salt = bcryptjs.genSaltSync()

async function signIn(req: Request, res: Response) {
  try {
    const body = req.body as TUserSignIn
    if (!validator.isEmail(body.email)) {
      exception(res, 400, 'email provided is inválid')
      return
    }
    if (body.password.length < 8) {
      exception(res, 400, 'provided password is too small')
      return
    }
    const userByEmail = await User.findOne({ email: body.email })
    if (!userByEmail) {
      exception(res, 400, 'email not found')
      return
    }
    if (!bcryptjs.compareSync(body.password, userByEmail.password)) {
      exception(res, 400, 'password entered is incorrect')
      return
    }
    userByEmail.lastLogin = new Date()
    await userByEmail.save()
    const session = await sessionCreate(userByEmail._id)
    res.status(200).json({
      session: { uid: session.uid },
      user: { name: userByEmail.name, email: userByEmail.email },
    })
  } catch (error) {
    if (config.devMode && error instanceof Error) {
      exception(res, 404, error.message)
      return
    }
    exception(res)
  }
}

async function signUp(req: Request, res: Response) {
  try {
    const body = req.body as TUser
    if (!validator.isEmail(body.email)) {
      exception(res, 400, 'email provided is inválid')
      return
    }
    if (body.password.length < 8) {
      exception(res, 400, 'provided password is too small')
      return
    }
    if (body.name.length < 2 || body.lastName.length < 2) {
      exception(res, 400, 'provided name or last name is too small')
      return
    }
    const { email, lastName, name } = body
    const password = bcryptjs.hashSync(body.password, salt)
    const userByEmail = await User.findOne({ email })
    if (userByEmail) {
      exception(res, 400, 'provided email is already in use')
      return
    }
    const user = await User.create({ name, lastName, email, password })
    const session = await sessionCreate(user._id)
    res.status(200).json({
      session: { uid: session.uid },
      user: { name: user.name, email: user.email },
    })
  } catch (error) {
    if (config.devMode && error instanceof Error) {
      exception(res, 404, error.message)
      return
    }
    exception(res)
  }
}

const account = { signUp, signIn }

export default account
