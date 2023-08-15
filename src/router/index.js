import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OptionPage from '../views/OptionPage.vue'
import LoginPage from '../views/LoginPage.vue'
import JiluPage from '../views/JiluPage.vue'

const routes = [
    {
        path: '/',
        name: 'loginpage',
        component: LoginPage,
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/optionpage',
        name: 'optionpage',
        component: OptionPage,
    },
    {
        path: '/jilupage',
        name: 'jilupage',
        component: JiluPage,
    },
   
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router