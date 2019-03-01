const { DB_HOST, DB_PORT, DB_NAME } = process.env

export default {
  uri: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  useNewUrlParser: true
}
