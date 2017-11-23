const axios = require('axios');
const config = require('./config');

function getSentiment(text) {
    return new Promise(function (resolve, reject) {
        axios.get(config.sentiment.url, {
            auth: {
                username: config.sentiment.username,
                password: config.sentiment.password
            },
            params: {
                version: config.sentiment.version,
                text: text,
                features: config.sentiment.features
            }
        })
        .then(function(response) {
            resolve(response.data.sentiment.document.label);
        })
        .catch(function(error) {
            reject(error);
        });
    });   
};

let processTweet = function(data) {
    return new Promise(function (resolve, reject) {
        let tweet = {};
        tweet.id_str = data.id_str;
        tweet.hashtags = data.entities.hashtags.map(tag => tag.text);
        tweet.coordinates = data.coordinates;
        tweet.timestamp_ms = data.timestamp_ms;
        tweet.text = data.text;
        tweet.user = {id: data.user.id, name: data.user.name};
        tweet.mentions = data.text.match(/@\w*/g);
        tweet.emoticons = [];
        getSentiment(data.text).then(function(sentiment) {
            tweet.sentiments = sentiment;
            resolve(tweet);
        }).catch(function(error) {
            tweet.sentiments = "unknown";
            resolve(tweet);
        });
    });
};

module.exports = processTweet;