const amqp = require("amqplib/callback_api");

//connect RabbitMQ
amqp.connect(`amqp://localhost`, (err, connection) => {
  if (err) {
    throw err;
  }
  //create channel
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    //create queue name
    let queueName = "basith";
    //create queue message
    let message = "vanakkam daa mapl..!";
    channel.assertQueue(queueName, {
      durable: false,
    });

    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`sending msg 1: ${message}`);
    setTimeout(() => {
      connection.close();
    }, 1000);
  });
});
