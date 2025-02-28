import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DraggableSort from '@/components/DraggableSort.vue'
import FlipAnimation from "@/components/FlipAnimation.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/draggableSort',
            name: 'draggableSort',
            component: DraggableSort,
        },
        {
            path: '/flipAnimation',
            name: 'flipAnimation',
            component: FlipAnimation,
        }
    ],
})

export default router
