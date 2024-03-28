const nodemailer = require('nodemailer')



module.exports = {




    sendEmailToUser: async (user,password) => {
        console.log(user,"this is from nodemailer");

        const email = user?.email

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD
            },
            requireTLS: true,
            logger: true
        })

        const info = await transporter.sendMail({
            from: process.env.APP_EMAIL,
            to: email,
            subject: `Password for login `,
            html: `<h4>Dear ${user?.username},</h4>
            <p>This is to acknowledge the details of your registration. Your user profile has been processed successfully.</p>
            
            <ul>
              <li>Password: ${password}</li>
              <li>if you don't get email in inbox,please check your spam folder also</li>
              
            </ul>
            <p>Thank you for your registration. If you have any queries, contact the support team.</p>
            <p>Best regards,</p>
            <h4>Team Event Management</h4>
            `,
            
            headers: { 'x-myheader': 'test header' }
        })


        if (info.accepted.includes(email)) return true
        else return false

    }
}