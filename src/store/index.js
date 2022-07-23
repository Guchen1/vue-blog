import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            'meta-info': {},
        }
    },
    mutations: {
        update(state, payload) {
            state['meta-info'][payload[0]] = payload[1]
        },
        push(state, payload) {
            state['meta-info'] = Object.assign(state['meta-info'], payload)
        }
    },
    getters: {
        getlinks(state) {
            return state['meta-info'].links;
        }
    }
})
export default store