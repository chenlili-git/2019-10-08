import Vue from 'vue'
import Vuex from 'vuex'

Vue.use('Vuex');
const store = new Vuex.Store({
    state: {
        num: 0
    },
    mutations:{ 
        //只有mutations才能修改数据（标准） v-model会修改vuex的数据，怎么办
        //相当于 methods:{increment(){}}
        increment(state){
            state.num++;
        }
    }
})
export default store