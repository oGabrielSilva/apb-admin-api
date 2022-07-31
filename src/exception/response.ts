import { Response } from 'express'

function exception(res: Response, status = 404, message = 'Oopss...some mistake happened') {
  return res.status(status).json({ message, status })
}

export default exception
