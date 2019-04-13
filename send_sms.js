// Twilio Credentials
const accountSid = 'AC7ddab128ba047ab4871b41d42431c755';
const authToken = 'e08c65bacfba2a6b8f6c7c716d1a1af9';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages.create(
  {
    to: '+17164734869',
    from: '+17162294024',
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  },
  (err, message) => {
    console.log(message.sid);
  }
);