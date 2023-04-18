const sgMail=require("@sendgrid/mail");
const API_KEY='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'

sgMail.setApiKey(API_KEY)
const message={
    to:'shaikhdanish1402@gmail.com',
    from:'danish.shaikh@respo.co.in',
    // subject:'Test Subject',
    templateId:"d-1825f3ccc3fc4ce998e89b005034c273"
}
console.log(1)
sgMail.send(message)
.then(res=>console.log("email sended..."))
.catch(err=>console.log(err))
