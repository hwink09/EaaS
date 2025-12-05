# Email as a Service (EaaS)

> "Learning new everyday not the copycat of yesterday!"
> 
> "A bit of fragrance clings to the hand that gives flowers!"

## 📋 Introduction

Email as a Service (EaaS) is an API service for sending emails through popular email providers such as **MailerSend** and **Resend**. Built with Node.js and Express, the project supports multiple advanced email sending features.

## ✨ Features

- 🚀 **Send basic emails** with custom HTML content
- 📧 **Send emails with templates** and dynamic data (personalization)
- 📎 **Send emails with attachments**
- 🖼️ **Send emails with inline attachments** (embedded images in content)
- 🔄 **Support multiple email providers**:
  - MailerSend
  - Resend
- 🛡️ **CORS** configuration
- 🔐 **Authentication middleware** (JWT)
- 📱 **RESTful API** with versioning (v1)

## 🛠️ Tech Stack

- **Node.js** (>= 22.x)
- **Express.js** v5.1.0
- **Babel** (ES6+ transpilation)
- **MailerSend** v2.6.0
- **Resend** v6.0.0
- **JWT** (JSON Web Tokens)
- **dotenv** (Environment variables)
- **ESLint** (Code linting)

## 📦 Installation

### Requirements

- Node.js >= 22.x
- npm or yarn

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd EaaS
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and configure environment variables:
```env
# Resend Configuration
RESEND_API_KEY=your_resend_api_key
ADMIN_SENDER_EMAIL=your_email@domain.com

# MailerSend Configuration
MAILER_SEND_API_KEY=your_mailersend_api_key
ADMIN_FROM_EMAIL=your_email@domain.com
ADMIN_SENDER_NAME=Your Name
```

4. Run the application:

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run production
```

## 🚀 Usage

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

## 📁 Project Structure

```
EaaS/
├── src/
│   ├── config/              # Application configuration
│   │   ├── corsOptions.js   # CORS configuration
│   │   └── environment.js   # Environment variables
│   ├── controllers/         # Controllers for business logic
│   │   └── userController.js
│   ├── files/              # Directory for file attachments
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
├── package.json            # Dependencies and scripts
└── README.md              # Documentation
```

## 🎯 Email Providers

### 1. MailerSend

#### Send basic email
```javascript
import { MailerSendProvider } from '~/providers/MailerSendProvider'

await MailerSendProvider.sendEmail({ 
  to, 
  toName, 
  subject, 
  html 
})
```

#### Send email with template
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

#### Send email with attachments
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

#### Send email with inline attachments
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

| Script | Description |
|--------|-------------|
| `npm run dev` | Run server in development mode with nodemon |
| `npm run build` | Build project with Babel |
| `npm run production` | Build and run in production mode |
| `npm run lint` | Check code with ESLint |
| `npm run clean` | Remove build directory |

## 🔧 Configuration

### CORS
CORS is configured in the `src/config/corsOptions.js` file

### Environment Variables
Environment variables are managed in the `src/config/environment.js` file

## 👨‍💻 Author

**Hwink** - [hwink09](https://github.com/hwink09)

## 📄 License

This project is private.

## 🤝 Contributing

All contributions are welcome! Please create an issue or pull request.