import Vuex from 'vuex'
import Vue from 'vue';

// Use Vuex
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        reviews: []
    },
    getters: {
        getReviewByAlias: (state) => alias => {
            return state.reviews.filter(review => review.alias = alias);
        }
    },
    mutations: {
        addReview(state, review) {
            // Mutation to add new review for authorized user
            state.reviews.push(review);
        }
    },
    actions: {
        addReview({ commit }, review) {
            commit('addReview', review);
        }
    }
})

export default store;