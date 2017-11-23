<template>
    <div class="tweet tweet-li" :class="{ 'highlight': isHighlight}" @mouseenter="onTweet" @mouseleave="outTweet">
        <span>{{ index + 1 }}.</span> <span class="username">@{{ user }}</span> <span class="time">{{ time }}</span>
        <div>{{ text }}</div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                isHighlight: false
            }
        },

        props: ['data', 'index'],

        computed: {
            user: function() {
                return this.data.user.name;
            },

            time: function() {
                let date = new Date(parseInt(this.data.timestamp_ms));
                return date.toLocaleString();
            },

            text: function() {
                return this.data.text;
            } 
        },

        methods: {
            onTweet() {
                Event.$emit('onTweet', this.index);
            },
            outTweet() {
                Event.$emit('outTweet', this.index);
            }
        }

    }
</script>

<style>
    .tweet {
        font-size: 12px;
    }
    .tweet .username {
        color: #3b94d9;
        font-weight: bold;
    }
    .tweet .time {
        color: #a7a7a7;
        font-size: 11px;
    }
    .tweet-li {
        padding: 10px;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: #cccccc;
    }
    .tweet-li:hover, .highlight {
        background: #f5f5f5;
    }
</style>