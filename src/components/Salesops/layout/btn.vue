<template>
    <md-button class="md-raised -orange pr-20 pl-10 mh-0" @click="submitClick">
    <md-icon md-verticalstatus-plan-align="center">done</md-icon>
        <label class="pl-18 md-display -font-14 latoFont">
            <b>{{value}}</b>
        </label>
    </md-button>
</template>

<script>
    export default {
        props : {
            value : {}
        },
        data () {
            return {
                txt_button : 'SUBMIT',
            }
        },
        methods : {
            submitClick() {
                this.$emit('submitclick');
            },
        }
    }
</script>

<style scoped>

</style>