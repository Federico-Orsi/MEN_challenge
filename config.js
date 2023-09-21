import dotenv from "dotenv"

dotenv.config()

export const NODE_ENV = process.env.NODE_ENV
export const BASE_URL = process.env.BASE_URL
export const PORT = process.env.PORT
export const LOGGER_FILE = process.env.LOGGER_FILE
export const LOGGER_ERROR_FILE = process.env.LOGGER_ERROR_FILE
export const MONGO_USERNAME = process.env.MONGO_USERNAME
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD
export const MONGO_HOST = process.env.MONGO_HOST
export const MONGO_PORT = process.env.MONGO_PORT
export const MONGO_DATABASE = process.env.MONGO_DATABASE
export const JWT_SECRET= process.env.JWT_SECRET

// export const uri = process.env.MONGO_LOCAL
// export const MongoAtlas = process.env.MONGO_ATLAS_WEB
// export const SessionSecretWord = process.env.SECRET_WORD_SESSION
// export const NODE_ENV = process.env.NODE_ENV || 'Desarrollo'
// export const SECRET_TOKEN = process.env.SECRET_TOKEN
// export const openAIKey = process.env.OPENAI_API_KEY
