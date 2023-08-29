import OpenAI from 'openai';
import { config } from "dotenv";
import twilio from "twilio";
import cron from "node-cron"

config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

cron.schedule('0,5,10,15,25,30,35,40,45,50,55 * * * *', async () => {

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Puedes contarme un chiste de humor negro"}],
    });

    await client.messages
        .create({
            body: chatCompletion.choices[0].message.content,
            from: 'whatsapp:+' + process.env.TWILIO_FROM,
            to: 'whatsapp:+573113839839'
        });
});

