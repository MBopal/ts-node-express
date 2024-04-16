import 'dotenv/config'
import fs from 'fs'

const privateKey = fs.readFileSync('../privateKey.pem', 'utf8')
const publicKey = fs.readFileSync('../publicKey.pem', 'utf8')

const CONFIG = {
  db: process.env.MONGO_URI,
  jwt_public: publicKey,
  jwt_private: privateKey
}

export default CONFIG
