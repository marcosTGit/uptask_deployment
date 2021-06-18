const nodemailer= require ('nodemailer');
const pug= require ('pug');
const juice= require ('juice');
const htmlToText= require ('html-To-Text');
const util= require ('util');
const emailConfig= require ('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    //secure: false, // true for 465, false for other ports
    auth: {
      user: emailConfig.user, // generated ethereal user
      pass: emailConfig.pass, // generated ethereal password
    },
  });


// send mail with defined transport object
exports.enviar= async(datos)=>{
  const html = pug.renderFile(`${__dirname}/../views/emails/${datos.archivo}`,{url : datos.url});
  const text = htmlToText.fromString(html);
  let mailOptions = {
    from: '"Uptask " <foo@example.com>', 
    to: datos.usuario.mail, 
    subject: datos.subject, 
    text, 
    html
  };
  const infoEmail = await transport.sendMail(mailOptions);
  return infoEmail;
}