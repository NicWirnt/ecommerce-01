import nodemailer from 'nodemailer';

export const sendMail = async (emailData) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP,
            port: +process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });


        let info = await transporter.sendMail({
            from: '"HOOO Hoooo 👻" <maia.lueilwitz14@ethereal.email>', // sender address
            to: "maia.lueilwitz14@ethereal.email", // list of receivers
            subject: "Email Verification ✔", // Subject line
            text: `Hi there, thank you registering with us, please follow the following link to verify your email  ${emailData.url}`, // plain text body
            html: `
    <p>Hi ${emailData.fName}</p>
    <br />
    <br />
    Please follow the following link to verify your email so you can login into your account 
    <br />
    <br />
    <a href="${emailData.url}">${emailData.url}</a>

    <br/>
    <br/>

    Kind regards,<br/>
    Toys Up Team
    `, // html body
        })


        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
        console.log(error.message);
    }

}
