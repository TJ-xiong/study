import type { DirectiveBinding, ObjectDirective } from 'vue'

interface AdaptiveTextOptions {
    min?: number     // 最小字体
    max?: number     // 最大字体
    lines?: number   // 最多行数
    lineHeight?: number // 可选：自定义行高
}

const adaptiveText: ObjectDirective = {
    mounted(el: HTMLElement, binding: DirectiveBinding<AdaptiveTextOptions>) {
        const options = binding.value || {}

        const minFont = options.min ?? 14
        const maxFont = options.max ?? 20
        const lines = options.lines ?? 2
        const providedLineHeight = options.lineHeight

        // 设置自适应字体大小
        el.style.fontSize = `clamp(${minFont}px, 2vw, ${maxFont}px)`

        // 设置基础样式
        Object.assign(el.style, {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: lines.toString(),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        })

        if (providedLineHeight) {
            // 用户提供了行高，直接使用
            el.style.lineHeight = String(providedLineHeight)
            el.style.maxHeight = `${providedLineHeight * lines}em`
        } else {
            // 没提供：动态获取行高
            requestAnimationFrame(() => {
                const computed = window.getComputedStyle(el)
                const fontSize = parseFloat(computed.fontSize)
                let lineHeightPx: number

                if (computed.lineHeight === 'normal') {
                    lineHeightPx = fontSize * 1.4 // 默认估算
                } else {
                    lineHeightPx = parseFloat(computed.lineHeight)
                }

                const ratio = lineHeightPx / fontSize
                el.style.lineHeight = ratio.toFixed(2)
                el.style.maxHeight = `${ratio * lines}em`
            })
        }
    }
}

export default adaptiveText
