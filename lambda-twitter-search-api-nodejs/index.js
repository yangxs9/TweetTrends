'use strict';

console.log('Loading function');
const search = require('./search');

exports.handler = (event, context, callback) => {
    // console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            "X-Requested-With": '*',
            "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": 'POST,GET,OPTIONS'
        },
    });

    switch (event.httpMethod) {
        case 'GET':
            search(event.queryStringParameters, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};