import { createStore } from 'vuex'
// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            'meta-info': { cardheight: 100 },

        }
    },
    mutations: {
        update(state, payload) {
            state['meta-info'][payload[0]] = payload[1]
        },
        push(state, payload) {
            state['meta-info'] = Object.assign(state['meta-info'], payload)
        },
        tmpset(state) {
            for (let element of state['meta-info'].links) {
                element.tmpsort = element.sort
            }
        }
    },
    getters: {
        getlinks(state) {
            return state['meta-info'].links;
        },
        getcardheight(state) {
            return state['meta-info'].cardheight;
        }
    },
    actions: {
        initial(context, payload) {
            payload[0].post(payload[1] + '/linkinitial').then(res => {
                if (res.status == 200) {
                    context.commit('update', ['links', res.data.links]);
                    context.commit('update', ['cardheight', res.data.cardheight]);
                    context.commit('tmpset');
                }

            })
        },

    }
})
export default store