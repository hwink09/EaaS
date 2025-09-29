/* eslint-disable no-console */
import { env } from '~/config/environment'

import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

const MAILER_SEND_API_KEY = env.MAILER_SEND_API_KEY

const ADMIN_FROM_EMAIL = process.env.ADMIN_FROM_EMAIL
const ADMIN_SENDER_NAME = process.env.ADMIN_SENDER_EMAIL

const mailerSendInstance = new MailerSend({ apiKey: MAILER_SEND_API_KEY })

// Tạo biến sentFrom: người gửi email
const sendFrom = new Sender(ADMIN_FROM_EMAIL, ADMIN_SENDER_NAME)

// FUnction gửi email
const sendEmail = async ({ to, toName, subject, html }) => {
  try {
    // Setup mail và tên của người nhận, (hoặc nhiều người nhận, dữ liệu trong mảng)
    const recipient = [new Recipient(to, toName)]
    // Setup email params theo chuẩn của MailerSend
    const emailParams = new EmailParams()
      .setFrom(sendFrom)
      .setTo(recipient)
      .setReplyTo(sendFrom)
      .setSubject(subject)
      .setHtml(html)
      // .setText()

    // Thực hiện gửi email
    const data = await mailerSendInstance.email.send(emailParams)
    return data
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export const MailerSendProvider = {
  sendEmail
}
