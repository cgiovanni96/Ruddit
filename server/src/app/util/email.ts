import nodemailer from 'nodemailer'
import EMAIL_ACCOUNT from '../../constants/email'

//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
export const isEmail = (email: string): boolean => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (to: string, subject: string, html: string) => {
	// let testAccount = await nodemailer.createTestAccount()

	let transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: EMAIL_ACCOUNT.name,
			pass: EMAIL_ACCOUNT.pass
		}
	})

	let info = await transporter.sendMail({
		from: '"Ruddit 👻" <ruddit@example.com>',
		to,
		subject,
		html
	})

	console.log('Message sent: %s', info.messageId)

	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
