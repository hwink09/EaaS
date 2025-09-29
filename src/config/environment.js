import 'dotenv/config'

export const env = {
  // Resend
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  ADMIN_SENDER_EMAIL: process.env.ADMIN_SENDER_EMAIL,

  // MailerSend
  MAILER_SEND_API_KEY: process.env.MAILER_SEND_API_KEY,
  ADMIN_FROM_EMAIL: process.env.ADMIN_FROM_EMAIL,
  ADMIN_SENDER_NAME: process.env.ADMIN_SENDER_NAME
}
