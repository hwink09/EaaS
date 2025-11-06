/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { MOCK_USER } from '~/models/mockDatabase'
// import { ResendProvider } from '~/providers/ResendProvider'
import { MailerSendProvider } from '~/providers/MailerSendProvider'

const register = async (req, res) => {
  try {
    const createdUser = MOCK_USER
    // Gửi mail cho user sau khi đăng ký tài khoản, có thể là mail xác nhận, mail welcome...vv
    // Bước gửi mail này sẽ là việc gửi hành động đến một dịch vụ Email as a Service.
    const to = createdUser.EMAIL
    const toName = createdUser.USERNAME
    const subject = 'Created account successfully - Hwinkdev'
    const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
      <div style="background: linear-gradient(135deg, #4f46e5, #3b82f6); padding: 20px; border-radius: 10px 10px 0 0; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">🎉 Welcome to Hwinkdev</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="margin-top: 0; color: #111;">Hello ${createdUser.USERNAME},
        </h2>
        <p style="font-size: 16px;">
          Your account has been <strong style="color: #16a34a;">created successfully</strong>.
        </p> 
        </div>
        <p style="font-size: 14px; color: #666;">
          If you have any questions, feel free to reply to this email — we’re happy to help!
        </p>
      </div>
      <div style="background: #f9fafb; padding: 15px; border-top: 1px solid #e0e0e0; text-align: center; border-radius: 0 0 10px 10px;">
        <p style="margin: 0; font-size: 12px; color: #999;">
          &copy; ${new Date().getFullYear()} Hwinkdev. All rights reserved.
        </p>
      </div>
    </div>
  </div>
`

    //Gửi mail với Resend
    // const resendEmailResponse = await ResendProvider.sendEmail({ to, subject, html })
    // console.log('🚀 ~ register ~ resendEmailResponse:', resendEmailResponse)

    // Gửi mail với MailerSend
    const mailerSendEmailResponse = await MailerSendProvider.sendEmail({ to, toName, subject, html })
    console.log('🚀 ~ register ~ mailerSendEmailResponse:', mailerSendEmailResponse)

    // Trả về response với thông tin user đã được tạo
    res.status(StatusCodes.OK).json(createdUser)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const userController = {
  register
}
