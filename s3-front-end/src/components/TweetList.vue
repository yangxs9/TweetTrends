<template>
    <div id="tweet-list" >
        <tweet v-for="(tweet, index) in tweets" :key="tweet.id_str" :index="index" :data="tweet" ></tweet>
        <button v-if="tweets.length" class="btn btn-link" @click="searchMore">Search More Tweets</button>
    </div>
</template>

<script>

    export default {
        props: ['tweets'],

        components: {
            'tweet': require('./Tweet'),
        },

        methods: {
            searchMore() {
                Event.$emit('searchMore');
            }
        },

        mounted() {
            Event.$on('onMarker', index => {
                this.$children[index].isHighlight = true;
            });
            Event.$on('outMarker', index => {
                this.$children[index].isHighlight = false;
            });
        }
    }
    
</script>

<style>

</style>