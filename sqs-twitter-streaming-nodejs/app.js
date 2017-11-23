'use strict';


const AWS = require('aws-sdk');
const Twit = require('twit');
const config = require('./config');

AWS.config.update({
    region: config.aws.region,
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey
});

const sqs = new AWS.SQS({
    apiVersion: '2012-11-05'
});

const T = new Twit(config.twitter)
const stream = T.stream('statuses/filter', {
    locations: config.twitter.locations
});

stream.on('tweet', function(tweet) {
    if (tweet.coordinates && tweet.coordinates !== null && tweet.user.lang == "en") {
        console.log(JSON.stringify(tweet));
        let params = {
            MessageBody: JSON.stringify(tweet),
            QueueUrl: config.aws.QueueUrl,
            DelaySeconds: 0
        };
        sqs.sendMessage(params, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log(data); 
        });

    }
});