# Contact Form Email Setup

You have three options to receive messages in your email from the contact form:

## Option A) Formspree (no backend — easiest)
1) Go to https://formspree.io/register and create an account.
2) Create a new form and copy its endpoint URL (looks like `https://formspree.io/f/XXXXYYYY`).
3) In `index.html`, find the contact form and replace the `action` attribute with your endpoint.
4) Keep `method="POST"`. Add/rename fields as you like.
5) Optional: Set `_subject` hidden input to control email subject; `_next` sets the redirect page (`thanks.html`).

## Option B) EmailJS (send directly from frontend JS)
1) Sign up at https://www.emailjs.com/ and create a service + template.
2) Add EmailJS SDK in `index.html` before your `script.js`:
   `<script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>`
3) Initialize in `script.js`:
   `emailjs.init('YOUR_PUBLIC_KEY');`
4) On form submit, prevent default and call:
   `emailjs.send('SERVICE_ID','TEMPLATE_ID',{name, email, message})`
5) Show success/error messages to the user.

## Option C) Node + Express + Nodemailer (your own backend)
1) Create `server.js` with an endpoint that accepts POST and uses Nodemailer to send email.
2) Host it (Render/Fly/Railway/VPS). Point the form `action` to your endpoint URL.
3) Keep your SMTP creds in env vars.

Example `server.js`:

```js
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {
  const {name, email, message} = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: 'New Portfolio Message',
      replyTo: email,
      text: `From: ${name} <${email}>

${message}`
    });
    res.json({ok:true});
  } catch (e) {
    res.status(500).json({ok:false, error: e.message});
  }
});

app.listen(process.env.PORT || 3000, ()=>console.log('Server running'));
```
