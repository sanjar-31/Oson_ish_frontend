import { createRouter, createWebHashHistory } from 'vue-router'
import Companies from '@/views/Companies.vue'
import Home from '@/views/Home.vue'
import ComingSoon from '@/pages/ComingSoon.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/companies',
        name: 'Companies',
        component: Companies
    },
    {
        path: '/resume/create',
        name: 'ResumeCreate',
        component: ComingSoon
    },
    {
        path: '/vacancy/create',
        name: 'VacancyCreate',
        component: ComingSoon
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: ComingSoon
    },
    {
        path: '/help',
        name: 'Help',
        component: ComingSoon
    },
    {
        path: '/about',
        name: 'About',
        component: ComingSoon
    },
    {
        path: '/search',
        name: 'Search',
        component: ComingSoon
    },
    {
        path: '/saved',
        name: 'Saved',
        component: ComingSoon
    },
    {
        path: '/register',
        name: 'Register',
        component: ComingSoon
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router