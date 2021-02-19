import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
console.clear();
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to nat');

  const options = stan.subscriptionOptions().setManualAckMode(true);

  const subscription = stan.subscribe(
    'ticket:created',
    'orders-service-queur-group',
    options
  );
  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Reciived  event #${msg.getSequence()}, with data: ${data}`);
    }
    msg.ack();
  });
});
