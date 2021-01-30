const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'daniel@mcelroys.net',
        subject: 'Welcome to the app!',
        text: `Welcome to the app, ${name}. Let me know how it goes, me.`,
        html: `<h2>Welcome to the app, <i>${name}</i>. Let me know how it goes, me.</h2>`
    }).then(() => console.log('Welcome email sent'))
    .catch(e => console.log(e.response.body.errors))
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'daniel@mcelroys.net',
        subject: 'Tschüß!',
        text: `Sorry to see you go, ${name}.`,
        html: `<h2>Sorry to see you go, <i>${name}</i>.</h2>`
    }).then(() => console.log('Goodbye email sent'))
    .catch(e => console.log(e.response.body.errors))
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}