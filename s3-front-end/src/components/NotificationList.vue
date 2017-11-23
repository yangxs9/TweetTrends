<template>
    <div id="notifications" >
        <button @click="getNotifications" class="btn btn-info btn-block" data-placement="right" data-popover-content="#notification-list" data-toggle="popover" data-trigger="focus" href="#" tabindex="0">
            Notifications
        </button>

        <!-- Content for Popover #1 -->
        <div class="hidden" id="notification-list">
          <div class="popover-body">
            <div class="list-group">
                <notification v-for="(tweet, index) in notifications" :key="tweet.id_str" :index="index" :data="tweet"></notification>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {

    props: ['notifications'],

    components: {
        'notification': require('./Notification'),
    },

    methods: {
        getNotifications() {
            Event.$emit('getNotifications');
        }
    },

    mounted() {
        $(function(){
            $("[data-toggle=popover]").popover({
                html : true,
                content: function() {
                    var content = $(this).attr("data-popover-content");
                    return $(content).children(".popover-body").html();
                },
                title: function() {
                    var title = $(this).attr("data-popover-content");
                    return $(title).children(".popover-heading").html();
                }
            });
        });
    }

}
</script>

<style>
.hidden {
  display: none !important;
}
#notifications {
    padding: 10px;
}
</style>