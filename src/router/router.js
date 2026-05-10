import { createRouter, createWebHistory } from 'vue-router'
import Companies from '@/views/Companies.vue'
import Home from '@/views/Home.vue'
import Resumes from '@/views/Resumes.vue'
import ComingSoon from '@/pages/ComingSoon.vue'
import Vacancies from '@/views/Vacancies.vue'
import Login from '@/views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/resumes',
        name: 'Resumes',
        component: Resumes
    },
    {
        path: '/companies',
        name: 'Companies',
        component: Companies
    },
    {
        path: '/vacancies',
        name: 'Vacancies',
        component: Vacancies
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
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
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router