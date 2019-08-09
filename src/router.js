import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/shipping',
            name: 'shipping',
            props: true,
            component: () => import('./views/shipping.vue'),
            meta: {
                title: ''
            }
        },
        {
            path: '/payment',
            name: 'payment',
            props: true,
            component: () => import('./views/payment.vue'),
            meta: {
                title: ''
            }
        },
        {
            path: '/complete',
            name: 'complete',
            props: true,
            component: () => import('./views/complete.vue'),
            meta: {
                title: ''
            }
        },
        {
            path: '*',
            redirect: '/shipping',
        },
    ]
})
