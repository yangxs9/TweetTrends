'use strict';

const AWS = require('aws-sdk');
const Consumer = require('sqs-consumer');
const config = require('./config');
const processTweet = require('./processs-tweet');

AWS.config.update({
    region: config.aws.region,
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey
});

const sqs = new AWS.SQS({
    apiVersion: '2012-11-05'
});
const sns = new AWS.SNS({
    apiVersion: '2010-03-31'
});

const consumer = Consumer.create({
    queueUrl: config.aws.QueueUrl,
    handleMessage: (message, done) => {
        let tweet = JSON.parse(message.Body);
        processTweet(tweet).then(function(tweet) {
            console.log(JSON.stringify(tweet));
            let params = {
              Message: JSON.stringify(tweet),
              TopicArn: config.aws.TopicArn
            };
            sns.publish(params, function(err, data) {
              if (err) console.log(err, err.stack);
              else     console.log(data);
            });
            done();
        }); 
    },
    waitTimeSeconds: 10,
    sqs: sqs
});
 
consumer.on('error', (err) => {
    console.log(err.message);
});
 
consumer.start();

// var params = {
//     QueueUrl: config.aws.QueueUrl,
// };
// sqs.receiveMessage(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else console.log(data); // successful response
//     let message = data.Messages[0];
//     console.log(JSON.parse(message.Body));
// });

