import './bootstrap'

new Vue({
    el: '#app',

    data: {
        keyword: '',
        tweets: [],
        notifications: []
    },

    components: {
        'gmap': require('./components/Map'),
        'search-box': require('./components/SearchBox'),
        'tweet': require('./components/Tweet'),
        'tweet-list': require('./components/TweetList'),
        'notification-list': require('./components/NotificationList')
    },

    methods: {
        search(keyword, isSearchAfter) {
            let params = { keyword };
            if (isSearchAfter) {
                let lastTweet = this.tweets[this.tweets.length - 1];
                params.searchAfter = "tweet#" + lastTweet.id_str;
            }
            let api = "https://usngp4u0ui.execute-api.us-west-2.amazonaws.com/prod/search";
            axios.get(api, {
                params: params
            }).then(response => {
                // console.log(response);
                if (isSearchAfter) {
                    this.tweets = this.tweets.concat(response.data);
                } else {
                    this.tweets = response.data;
                }
            }).catch( error => {
                alert("error");
                console.log(error);
            });
        },

        getNotifications(isSearchAfter) {
            let api = "https://usngp4u0ui.execute-api.us-west-2.amazonaws.com/prod/notifications";
            axios.get(api).then(response => {
                if (isSearchAfter) {
                    this.notifications = this.notifications.concat(response.data);
                } else {
                    this.notifications = response.data;
                }
            }).catch( error => {
                alert("error");
                console.log(error);
            });
        }
    },

    created() {
        this.getNotifications(false);
    },

    mounted() {
        
        Event.$on('keywordSubmit', keyword => {
            this.keyword = keyword;
            this.search(keyword, false);
        });

        Event.$on('searchMore', () => {
            this.search(this.keyword, true);
        });

        Event.$on('getNotifications', () => {
            this.getNotifications(false);
        });
    
    }

});

