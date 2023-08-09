<template>
    <div>
        <ul>
            <li v-for="(item, index) in userList" :key="index">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    name: "chat",
    sockets:{
        connect: function(){

        },
        Exit: function(list){
            console.log('user list', list);
        },
        UserList: function(list){
            console.log('user list', list);
        }
    },
    data() {
        return {
            userList: ['test','tests','testes','testes','testes','testes','testes']
        }
        
    },
    created() {
        var emp_id = Vue.localStorage.get('emp_id');
        //alert('chat');
        this.$socket.emit('login', emp_id);
    },
    methods: {

    }
}

</script>