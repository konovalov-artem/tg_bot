import { set } from 'mongoose'

set('debug', true)

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  DB_AUTH_SOURCE,
} = process.env

export default {
  uri: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  user: MONGO_INITDB_ROOT_USERNAME,
  pass: MONGO_INITDB_ROOT_PASSWORD,
  authSource: DB_AUTH_SOURCE,
}
