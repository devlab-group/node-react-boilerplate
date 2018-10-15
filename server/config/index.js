require('dotenv').config()

function buildFrontHost() {
  let host = process.env.FRONT_HOSTNAME

  if (process.env.FRONT_PORT) {
    host += `:${process.env.FRONT_PORT}`
  }

  return host
}

function buildFrontOrigin() {
  return `${process.env.HTTPS === 'true' ? 'https' : 'http'}://${buildFrontHost()}`
}

exports.http = {
  host: '0.0.0.0',
  port: process.env.PORT || 8080,

  frontHttps: process.env.HTTPS === 'true' ? true : false,
  frontHostname: process.env.FRONT_HOSTNAME,
  frontPort: process.env.FRONT_PORT,
  frontHost: buildFrontHost(),
  frontOrigin: buildFrontOrigin(),
  /*
   * Generate allowed origins list for CORS.
   * Host should be without PORT part
   */
  originWhitelist: [buildFrontOrigin()],

  sessionSecret: process.env.SESSION_SECRET,
}

exports.postgres = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT || 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
}

exports.mailerAdapter = {
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
  mail: {
    from: process.env.MAIL_FROM,
  },
}
