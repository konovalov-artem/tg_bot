const { PORT, NODE_ENV } = process.env

export default {
  port: Boolean(PORT) ? PORT : '4000',
  nodeEnv: NODE_ENV
}
