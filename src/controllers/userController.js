/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { MOCK_USER } from '~/models/mockDatabase'
import { MAILER_SEND_TEMPLATE_IDS } from '~/utils/mailerSendTemplates'
// import { ResendProvider } from '~/providers/ResendProvider'
// import { MailerSendProvider } from '~/providers/MailerSendProvider'
// import { MailerSendWithTemplateDataProvider } from '~/providers/MailerSendWithTemplateDataProvider'
import { MailerSendWithAttachmentsProvider } from '~/providers/MailerSendWithAttachmentsProvider'

const register = async (req, res) => {
  try {
    const createdUser = MOCK_USER
    // Gửi mail cho user sau khi đăng ký tài khoản, có thể là mail xác nhận, mail welcome...vv
    // Bước gửi mail này sẽ là việc gửi hành động đến một dịch vụ Email as a Service.
    const to = createdUser.EMAIL
    const toName = createdUser.USERNAME
    // const subject = 'Created account successfully - Hwinkdev'
    const html = ''


    // =====================================================================================================
    // =====================================================================================================
    //Gửi mail với Resend
    // const resendEmailResponse = await ResendProvider.sendEmail({ to, subject, html })
    // console.log('🚀 ~ register ~ resendEmailResponse:', resendEmailResponse)


    // =====================================================================================================
    // =====================================================================================================
    // Gửi mail với MailerSend
    // const mailerSendEmailResponse = await MailerSendProvider.sendEmail({ to, toName, subject, html })
    // console.log('🚀 ~ register ~ mailerSendEmailResponse:', mailerSendEmailResponse)


    // =====================================================================================================
    // =====================================================================================================
    // Gửi mail với MailerSend và Template + Dynamic Data
    //   const personalizationData = [
    //     {
    //       email: to,
    //       data: {
    //         name: 'hwinkdev',
    //         account_name: 'hwinkdev - a person in server earth'
    //       }
    //     }
    //   ]
    //   const mailerSendEmailWithTemplateDataResponse = await MailerSendWithTemplateDataProvider.sendEmail({
    //     to,
    //     toName,
    //     subject: 'Created account successfully - {{ name }}',
    //     html,
    //     templateId: MAILER_SEND_TEMPLATE_IDS.REGISTER_ACCOUNT,
    //     personalizationData
    //   })
    //   console.log('🚀 ~ register ~ mailerSendEmailWithTemplateDataResponse:', mailerSendEmailWithTemplateDataResponse)

    //   // Trả về response với thông tin user đã được tạo
    //   res.status(StatusCodes.OK).json(createdUser)
    // } catch (error) {
    //   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    // }


    // =====================================================================================================
    // =====================================================================================================
    // Gửi mail với MailerSend và Template + Dynamic Data + Attachment
    const personalizationData = [
      {
        email: to,
        data: {
          name: 'hwinkdev',
          account_name: 'hwinkdev - a person in server earth'
        }
      }
    ]

    const attachments = [
      {
        filePath: 'src/files/hinh-anh-con-cho.jpg',
        fileName: 'file 1 ne',
        attachmentType: 'attachment' // File sẽ được đính kèm ở cuối email
      },
      {
        filePath: 'src/files/con-bo.pdf',
        fileName: 'file 2 day',
        attachmentType: 'attachment' // File sẽ được đính kèm ở cuối email
      }
    ]

    const mailerSendEmailWithAttachmentsResponse = await MailerSendWithAttachmentsProvider.sendEmail({
      to,
      toName,
      subject: 'Created account successfully - {{ name }}',
      html,
      templateId: MAILER_SEND_TEMPLATE_IDS.REGISTER_ACCOUNT,
      personalizationData,
      attachments
    })
    console.log('🚀 ~ register ~ mailerSendEmailWithTemplateDataResponse:', mailerSendEmailWithAttachmentsResponse)

    // Trả về response với thông tin user đã được tạo
    res.status(StatusCodes.OK).json(createdUser)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const userController = {
  register
}
