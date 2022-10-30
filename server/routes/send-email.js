const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/* POST - send email to user. */

router.post('/', async function(req, res, next) {

  	let { values, message } = req.body

	const transport = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
    	secure: true,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		},
		tls: {
		rejectUnauthorized: false, // tylko dla develop
		}
	})

	await transport.sendMail({
		from: process.env.MAIL_FROM,
		to: values.patientEmail,
    bcc: process.env.MAIL_FROM,
		subject: message.title,
		html: message.message
	})
	.then((res) => res.json({status: 'success'}))
	.catch(() => res.json({status: 'fail'}))
});

module.exports = router;