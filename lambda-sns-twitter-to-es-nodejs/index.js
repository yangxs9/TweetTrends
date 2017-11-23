'use strict';

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'https://search-es-twitt-map-ir5ds3jwvskixnj3tgrcdphmi4.us-west-2.es.amazonaws.com'
});
console.log('Loading function');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    const message = event.Records[0].Sns.Message;
    //console.log('From SNS:', message);
    let tweet = JSON.parse(message);
    // console.log(tweet);
    client.index({
        index: 'twitter',
        type: 'tweet',
        id: tweet.id_str,
        body: tweet
    }, function(error, response) {
        if (error) console.log(error)
        else console.log(response);
    });
};