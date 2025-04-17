import type { ObjectDirective } from 'vue'

interface ResizeAdaptiveOptions {
    min?: number;
    max?: number;
    lines?: number;
    lineHeight?: number;
}

const resizeAdaptiveText: ObjectDirective<HTMLElement, ResizeAdaptiveOptions> = {
    mounted(el, binding) {
    const options = binding.value || {};
    const min = options.min ?? 14;
    const max = options.max ?? 20;
    const lines = options.lines ?? 2;
    const lineHeight = options.lineHeight ?? 1.4;

    const applyFontSize = () => {
        const containerWidth = el.clientWidth;
        if (containerWidth === 0) return;

        // 先设置为单行
        el.style.whiteSpace = 'nowrap';
        el.style.overflow = 'hidden';
        el.style.display = 'block';

        // 初始化字体
        let fontSize = max;
        el.style.fontSize = `${fontSize}px`;

        // 尝试缩小字体直到 fits
        const precision = 0.1;
        while (el.scrollWidth > containerWidth && fontSize > min) {
            fontSize -= precision;
            el.style.fontSize = `${fontSize}px`;
        }

        // 判断最终是否仍然溢出
        if (el.scrollWidth > containerWidth) {
            // 换行展示，但保持 fontSize 不变
            el.style.whiteSpace = 'normal';
            el.style.display = '-webkit-box';
            el.style.lineHeight = `${lineHeight}`;
            el.style.maxHeight = `${fontSize * lineHeight * lines}px`;
            el.style.overflow = 'hidden';
            el.style.textOverflow = 'ellipsis';
            (el.style as any).webkitLineClamp = String(lines);
            (el.style as any).webkitBoxOrient = 'vertical';
            // ❗️关键：字体保持不动
            el.style.fontSize = `${fontSize}px`;
        }
    }

    const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(applyFontSize);
    })

    resizeObserver.observe(el);
    requestAnimationFrame(applyFontSize);

        (el as any).__resizeObserver__ = resizeObserver;
    },

    unmounted(el) {
        const observer = (el as any).__resizeObserver__ as ResizeObserver | undefined;
        if (observer) observer.disconnect();
    }
}

export default resizeAdaptiveText
