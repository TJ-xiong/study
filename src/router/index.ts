import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DraggableSort from '@/views/DraggableSort.vue'
import FlipAnimation from "@/views/FlipAnimation.vue";
import Throttle_debounce from "@/views/Throttle_debounce.vue";
import Selector from "@/views/Selector.vue";
import MusicScroll from "@/views/MusicScroll.vue";
import FlexboxHeterogeneousLayout from "@/views/FlexboxHeterogeneousLayout.vue";
import EchartsAutoY from "@/views/EchartsAutoY.vue";
import EChartsAdaptive from "@/views/EChartsAdaptive.vue";
import HighlightCode from "@/views/HighlightCode.vue";
import EchartsSetThePositionOfAxisPointer from "@/views/EchartsSetThePositionOfAxisPointer.vue";
import EchartsSlideX from "@/views/EchartsSlideX.vue";
import Dialog from "@/views/Dialog.vue";
import CustomRefDebounce from "@/views/CustomRefDebounce.vue";
import WrapListener from "@/views/WrapListener.vue";

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
        {
            path: '/flexboxHeterogeneousLayout',
            name: 'FlexboxHeterogeneousLayout',
            component: FlexboxHeterogeneousLayout,
        },
        {
            path: '/echartsAutoY',
            name: 'EchartsAutoY',
            component: EchartsAutoY,
        },
        {
            path: '/eChartsAdaptive',
            name: 'EChartsAdaptive',
            component: EChartsAdaptive,
        },
        {
            path: '/highlightCode',
            name: 'HighlightCode',
            component: HighlightCode,
        },
        {
            path: '/echartsSetThePositionOfAxisPointer',
            name: 'EchartsSetThePositionOfAxisPointer',
            component: EchartsSetThePositionOfAxisPointer,
        },
        {
            path: '/echartsSlideX',
            name: 'EchartsSlideX',
            component: EchartsSlideX,
        },
        {
            path: '/dialog',
            name: 'Dialog',
            component: Dialog,
        },
        {
            path: '/customRefDebounce',
            name: 'CustomRefDebounce',
            component: CustomRefDebounce,
        },
        {
            path: '/wrapListener',
            name: 'WrapListener',
            component: WrapListener,
        },
    ],
})

export default router
