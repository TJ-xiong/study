import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DraggableSort from '@/components/DraggableSort.vue'
import FlipAnimation from "@/components/FlipAnimation.vue";
import Throttle_debounce from "@/components/Throttle_debounce.vue";
import Selector from "@/components/Selector.vue";
import MusicScroll from "@/components/MusicScroll.vue";

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
        },
        {
            path: '/throttle_debounce',
            name: 'throttle_debounce',
            component: Throttle_debounce,
        },
        {
            path: '/selector',
            name: 'selector',
            component: Selector,
        },
        {
            path: '/musicScroll',
            name: 'MusicScroll',
            component: MusicScroll,
        },
    ],
})

export default router
