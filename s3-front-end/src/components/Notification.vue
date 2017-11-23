<template>
    <div class="notification notification-li">
        <span>A new tweet "{{ text.substring(0,20) }} ..." is indexed.</span>
        <span class="time">{{ time }}</span>
    </div>
</template>

<script>
    export default {

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



    }
</script>

<style>
    .notification {
        font-size: 12px;
    }
    .notification .time {
        color: #a7a7a7;
        font-size: 11px;
    }
    .notification-li {
        padding: 10px;
        border-bottom-style: solid;
        border-width: 1px;
        border-color: #cccccc;
    }
</style>