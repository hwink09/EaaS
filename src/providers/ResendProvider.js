// Example
// https://resend.com/
import { Resend } from 'resend'
import { env } from '../config/environment'

const RESEND_API_KEY = env.RESEND_API_KEY

const ADMIN_SENDER_EMAIL = env.ADMIN_SENDER_EMAIL

// Tạo một instance của Resend để sử dụng
const resendInstance = new Resend(RESEND_API_KEY)

// Function để gửi mail
const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resendInstance.emails.send({
      from: ADMIN_SENDER_EMAIL,
      to, // nếu chưa có valid domain thì chỉ gửi đến email mà mình đăng kí với Resend.
      subject,
      html
    })
    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('🚀 ~ sendEmail ~ error:', error)
    throw error
  }
}

export const ResendProvider = {
  sendEmail
}
