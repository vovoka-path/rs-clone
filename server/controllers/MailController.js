import sendMail from "../services/MailService.js"

class MailSendler{
    async send(req, res){
        
        try {
            const { clientEmail, title, msg } = req.body;
            const message = {
                from: "lebedpavel.dev@mail.ru",
                to: clientEmail,
                subject: title,
                text: msg
            }
            const status = await sendMail(message);
    
            return res.json(status);
        } catch (error) {
            return res.json(error);
        }
        
    }
}

export default new MailSendler();