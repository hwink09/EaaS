# Email as a Service (EaaS)

> "Learning new everyday not the copycat of yesterday!"
> 
> "A bit of fragrance clings to the hand that gives flowers!"

## 📋 Giới thiệu

Email as a Service (EaaS) là một dịch vụ API để gửi email thông qua các nhà cung cấp email phổ biến như **MailerSend** và **Resend**. Dự án được xây dựng với Node.js, Express và hỗ trợ nhiều tính năng gửi email nâng cao.

## ✨ Tính năng

- 🚀 **Gửi email cơ bản** với HTML content tùy chỉnh
- 📧 **Gửi email với template** và dữ liệu động (personalization)
- 📎 **Gửi email với file đính kèm** (attachments)
- 🖼️ **Gửi email với inline attachments** (hình ảnh nhúng trong nội dung)
- 🔄 **Hỗ trợ nhiều email provider**:
  - MailerSend
  - Resend
- 🛡️ **CORS** được cấu hình
- 🔐 **Authentication middleware** (JWT)
- 📱 **RESTful API** với versioning (v1)

## 🛠️ Công nghệ sử dụng

- **Node.js** (>= 22.x)
- **Express.js** v5.1.0
- **Babel** (ES6+ transpilation)
- **MailerSend** v2.6.0
- **Resend** v6.0.0
- **JWT** (JSON Web Tokens)
- **dotenv** (Environment variables)
- **ESLint** (Code linting)

## 📦 Cài đặt

### Yêu cầu

- Node.js >= 22.x
- npm hoặc yarn

### Các bước cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd EaaS
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` và cấu hình các biến môi trường:
```env
# Resend Configuration
RESEND_API_KEY=your_resend_api_key
ADMIN_SENDER_EMAIL=your_email@domain.com

# MailerSend Configuration
MAILER_SEND_API_KEY=your_mailersend_api_key
ADMIN_FROM_EMAIL=your_email@domain.com
ADMIN_SENDER_NAME=Your Name
```

4. Chạy ứng dụng:

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run production
```

## 🚀 Sử dụng

### API Endpoints

#### Check API Status
```http
GET http://localhost:8017/v1/status
```

Response:
```json
{
  "message": "APIs V1 are ready to use."
}
```

#### Register User (Send Email)
```http
POST http://localhost:8017/v1/users/register
```

Request body:
```json
{
  "username": "example_user",
  "email": "user@example.com"
}
```

## 📁 Cấu trúc thư mục

```
EaaS/
├── src/
│   ├── config/              # Cấu hình ứng dụng
│   │   ├── corsOptions.js   # CORS configuration
│   │   └── environment.js   # Environment variables
│   ├── controllers/         # Controllers xử lý logic
│   │   └── userController.js
│   ├── files/              # Thư mục chứa file đính kèm
│   ├── middlewares/        # Express middlewares
│   │   └── authMiddleware.js
│   ├── models/             # Data models
│   │   └── mockDatabase.js
│   ├── providers/          # Email service providers
│   │   ├── MailerSendProvider.js
│   │   ├── MailerSendWithAttachmentsProvider.js
│   │   ├── MailerSendWithInlineAttachmentsProvider.js
│   │   ├── MailerSendWithTemplateDataProvider.js
│   │   └── ResendProvider.js
│   ├── routes/             # API routes
│   │   └── v1/
│   │       ├── index.js
│   │       └── userRoute.js
│   ├── utils/              # Utility functions
│   │   ├── constants.js
│   │   └── mailerSendTemplates.js
│   └── server.js           # Entry point
├── .babelrc                # Babel configuration
├── jsconfig.json           # JavaScript configuration
├── package.json            # Dependencies và scripts
└── README.md              # Documentation
```

## 🎯 Email Providers

### 1. MailerSend

#### Gửi email cơ bản
```javascript
import { MailerSendProvider } from '~/providers/MailerSendProvider'

await MailerSendProvider.sendEmail({ 
  to, 
  toName, 
  subject, 
  html 
})
```

#### Gửi email với template
```javascript
import { MailerSendWithTemplateDataProvider } from '~/providers/MailerSendWithTemplateDataProvider'

const personalizationData = [{
  email: to,
  data: {
    name: 'John Doe',
    account_name: 'john.doe@example.com'
  }
}]

await MailerSendWithTemplateDataProvider.sendEmail({
  to,
  toName,
  subject,
  html,
  templateId: 'your_template_id',
  personalizationData
})
```

#### Gửi email với attachments
```javascript
import { MailerSendWithAttachmentsProvider } from '~/providers/MailerSendWithAttachmentsProvider'

const attachments = [
  {
    filePath: 'src/files/document.pdf',
    fileName: 'Document',
    attachmentType: 'attachment'
  }
]

await MailerSendWithAttachmentsProvider.sendEmail({
  to,
  toName,
  subject,
  html,
  attachments
})
```

#### Gửi email với inline attachments
```javascript
import { MailerSendWithInlineAttachmentsProvider } from '~/providers/MailerSendWithInlineAttachmentsProvider'

const attachments = [
  {
    filePath: 'src/files/image.jpg',
    fileName: 'Image',
    attachmentType: 'inline',
    fileId: 'unique-image-id'
  }
]

const html = `<img src="cid:unique-image-id" />`

await MailerSendWithInlineAttachmentsProvider.sendEmail({
  to,
  toName,
  subject,
  html,
  attachments
})
```

### 2. Resend

```javascript
import { ResendProvider } from '~/providers/ResendProvider'

await ResendProvider.sendEmail({ 
  to, 
  subject, 
  html 
})
```

## 📝 Scripts

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy server ở development mode với nodemon |
| `npm run build` | Build project với Babel |
| `npm run production` | Build và chạy ở production mode |
| `npm run lint` | Kiểm tra code với ESLint |
| `npm run clean` | Xóa thư mục build |

## 🔧 Configuration

### CORS
CORS được cấu hình trong file `src/config/corsOptions.js`

### Environment Variables
Các biến môi trường được quản lý trong file `src/config/environment.js`

## 👨‍💻 Tác giả

**Hwink** - [hwink09](https://github.com/hwink09)

## 📄 License

This project is private.

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.