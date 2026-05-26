import { createRouter, createWebHistory } from 'vue-router'
import Companies from '@/views/Companies.vue'
import Home from '@/views/Home.vue'
import Resumes from '@/views/Resumes.vue'
import ComingSoon from '@/pages/ComingSoon.vue'
import Vacancies from '@/views/Vacancies.vue'
import Login from '@/views/Login.vue'
import Monitoring from '@/views/Monitoring.vue'
import Offers from '@/views/Offers.vue'
import Company from '@/views/Company.vue'
import Tashkilotlar from '@/views/Tashkilotlar.vue'
import TashkilotlarCreate from '@/views/Tashkilotlar.vue'

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
        path: '/monitoring',
        name: 'Monitoring',
        component: Monitoring
    },
    {
        path: '/offers',
        name: 'Offers',
        component: Offers
    },
    {
        path: '/company',
        name: 'Company',
        component: Company
    },
    {
        path: '/tashkilotlar',
        name: 'Tashkilotlar',
        component: Tashkilotlar
    },
    {
        path: '/resume/create',
        name: 'ResumeCreate',
        component: ComingSoon
    },
    {
        path: '/tashkilotlar/create',
        name: 'TashkilotlarCreate',
        component: TashkilotlarCreate
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
        component: () => import('@/views/Saved.vue')
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