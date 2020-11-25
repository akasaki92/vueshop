import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import(
            /* webpackChunkName: "categories" */
            '../views/Categories.vue'
        )
    },
    {
        path: '/category/:slug',
        name: 'category',
        component: () => import(
            /* webpackChunkName: "category" */
            '../views/Category.vue'
        )
    },
    {
        path: '/books',
        name: 'books',
        component: () => import(
            /* webpackChunkName: "books" */
            '../views/Books.vue'
        )
    },
    {
        path: '/book/:slug',
        name: 'book',
        component: () => import(
            /* webpackChunkName: "book" */
            '../views/Book.vue'
        )
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(
            /* webpackChunkName: "about" */
            '../views/About.vue'
        )
    }
]

const router = new VueRouter({
    routes
})

export default router
