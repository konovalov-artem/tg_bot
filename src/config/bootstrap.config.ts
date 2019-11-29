const { PORT, NODE_ENV } = process.env

export default {
  port: Boolean(PORT) ? PORT : '3352',
  nodeEnv: NODE_ENV
}
