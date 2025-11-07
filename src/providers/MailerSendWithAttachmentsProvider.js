/* eslint-disable no-console */
import { env } from '~/config/environment'

import { MailerSend, EmailParams, Sender, Recipient, Attachment } from 'mailersend'
import fs from 'fs'

const MAILER_SEND_API_KEY = env.MAILER_SEND_API_KEY

const ADMIN_FROM_EMAIL = env.ADMIN_FROM_EMAIL
const ADMIN_SENDER_NAME = env.ADMIN_SENDER_NAME

const mailerSendInstance = new MailerSend({ apiKey: MAILER_SEND_API_KEY })

// Tạo biến sentFrom: người gửi email
const sendFrom = new Sender(ADMIN_FROM_EMAIL, ADMIN_SENDER_NAME)

// FUnction gửi email
const sendEmail = async ({
  to,
  toName,
  subject,
  // html,
  templateId,
  personalizationData,
  attachments
}) => {
  try {
    // Setup mail và tên của người nhận, (hoặc nhiều người nhận, dữ liệu trong mảng)
    const recipient = [new Recipient(to, toName)]

    // CC (Carbon Copy) - Gửi bản sao công khai, nghĩa là gửi bản sao cho người khác để họ biết nội dung email, nhưng không cần phản hồi.
    // Người nhân chính và người được CC đều có thể thấy địa chỉ email của nhau.
    // eslint-disable-next-line no-unused-vars
    const cc = [
      new Recipient('your_cc_01@hwink.dev', 'Your Client CC 01'),
      new Recipient('your_cc_02@hwink.dev', 'Your Client CC 02'),
      new Recipient('your_cc_03@hwink.dev', 'Your Client CC 03')
    ]

    // BCC (Blind Carbon Copy) - Gửi bản sao ẩn, nghĩa là người nhận chính không biết ai đang nhận được bcc.
    // BCC hữu ích khi gửi email hàng loạt (VD: thông báo đến nhiều khách hàng mà không muốn họ biết nhau).
    // eslint-disable-next-line no-unused-vars
    const bcc = [
      new Recipient('your_bcc_01@hwink.dev', 'Your Client BCC 01'),
      new Recipient('your_bcc_02@hwink.dev', 'Your Client BCC 02'),
      new Recipient('your_bcc_03@hwink.dev', 'Your Client BCC 03')
    ]

    // Attachment: file đính kèm
    const buildAttachments = attachments.map(att => {
      return new Attachment(
        fs.readFileSync(att.filePath, { encoding: 'base64' }),
        att.fileName,
        att.attachmentType
      )
    }
    )

    // Setup email params theo chuẩn của MailerSend
    const emailParams = new EmailParams()
      .setFrom(sendFrom)
      .setTo(recipient)
      .setReplyTo(sendFrom)
      // .setCc(cc)
      // .setBcc(bcc)
      .setSubject(subject)
      // .setHtml(html)
      // .setText()
      .setTemplateId(templateId) // Template tạo từ MailerSend
      .setPersonalization(personalizationData) // Dynamic data, các biến mà bạn muốn truyền vào template email
      .setAttachments(buildAttachments)

    // Thực hiện gửi email
    const data = await mailerSendInstance.email.send(emailParams)
    return data
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export const MailerSendWithAttachmentsProvider = {
  sendEmail
}
