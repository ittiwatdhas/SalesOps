<template>
<div class="proin-dialog-confirm" v-show="(dialogConfirmClose)">
    <div class="bg-backdrop"></div>
    <div class="-dialog">
        <div class="-content">{{ value }}</div>
        <div class="-action">
            <md-button class="md-primary -cancel" @click="onClose()">NO</md-button>
            <md-button class="md-primary" @click="onConfirm()">YES</md-button>
        </div>
    </div>
</div>
</template>

<script>
import Vue from "vue";
export default {
    name: "dialog-confirm",
    props: ["value", "dialogConfirmClose"],
    data() {
        return {
            confirmClose: JSON.parse(this.dialogConfirmClose)
        }
    },
    methods: {
        onClose() {
            this.confirmClose = false;
            this.$emit("clickClose", false);
        },
        onConfirm() {
            this.confirmClose = false;
            this.$emit("clickConfirm", false);
        }
    }
}
</script>

<style lang="scss">
.proin-dialog-confirm {
    .bg-backdrop {
        background: rgba(0, 0, 0, 0.55);
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 12;
        top: 0;
        left: 0;
    }

    .-dialog {
        position: fixed;
        z-index: 14;
        top: 40%;
        left: 40%;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
        background-color: #FFFFFF;
        border-radius: 2px;
        min-width: 280px;
        max-width: 80%;

        .-content {
            padding: 30px;
            font-family: Roboto;
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 15px;
            text-align: left;
        }

        .-action {
            text-align: right;
            background: #fafafa;
            padding: 8px 15px;

            .md-button {
                min-width: 64px;
                max-width: 64px;
                min-height: 36px;
                max-height: 36px;
                margin: 4px;

                &.-cancel {
                    color: #000000;
                }
            }
        }
    }

}
</style>
