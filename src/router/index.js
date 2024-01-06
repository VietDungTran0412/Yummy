import VueRouter from 'vue-router'
import RestaurantSearch from '../views/search/RestaurantSearch.vue'
import RestaurantDetailVue from '../views/detail/RestaurantDetail.vue';
import Home from '../views/home/Home.vue'
import Register from '../views/register/Register.vue'
import LogIn from '../views/login/LogIn.vue'
import ReviewForm from '@/views/review/ReviewForm.vue'

/**
 * Setting up the Vue router 
 */

const router = new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/search', component: RestaurantSearch },
        { path: '/restaurant/:alias', component: RestaurantDetailVue },
        { path: '/restaurant/:alias/review', component: ReviewForm, meta: { requiredAuth: true } },
        { path: '/register', component: Register, meta: { notAuth: true } },
        { path: '/log-in', component: LogIn, meta: { notAuth: true } },
        // { path: '/reservation', component: Reservation, meta: { requiredAuth: true } }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.notAuth)) {
        // Check if the user is authenticated
        const isAuthenticated = !!localStorage.getItem('username'); // Implement this function
        if (isAuthenticated) {
            // If route is login or register and user had been already authenticated then route back to homepage
            next('/');
        } else {
            // Else process the next route
            next();
        }
    }
    else if (to.matched.some(route => route.meta.requiredAuth)) {
        const isAuthenticated = !!localStorage.getItem('username'); // Implement this function
        console.log('asdasd')
        if (isAuthenticated) {

            next();
        } else {
            // If user is not authenticated and expect to have any authorized action
            // Route to login page
            next('/log-in');
        }
    }
    else {
        // Route doesn't require authentication, proceed
        next();
    }
})



export default router;