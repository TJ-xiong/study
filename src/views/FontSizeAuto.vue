<template>
  <div class="container">

    <code>
      ✅ 在容器变小时，先让文字缩小（从 20px → 最小 14px），尽可能不换行；
      🚫 只有当字体已经最小，仍然放不下一行，才允许换行并显示最多两行 ...。</code>
    <div class="text-box" v-resize-adaptive-text="{ min: 14, max: 20, lines: 2 }">
      这是一段可以根据屏幕宽度自动调整字体大小的文字，最多显示两行，超出部分自动显示省略号。
    </div>

    <highlight-code code-id="resizeAdaptiveText">
      fontSize优先级 > 换行
    </highlight-code>

    <div class="text-box">
      <AdaptiveText :minFontSize="14" :maxFontSize="20" :lines="2">
        这是一段可以根据屏幕宽度自动调整字体大小的文字，最多显示两行，超出部分自动显示省略号。
      </AdaptiveText>
    </div>

    <highlight-code code-id="fontSizeAuto"/>

    <code>组件化：</code>
    <highlight-code code-id="adaptiveText"/>

    <code>指令化：</code>
    <div class="text-box" v-adaptive-text="{ min: 16, max: 24, lines: 2, lineHeight: 1.5 }">
      这是一段可以根据屏幕宽度自动调整字体大小的文字，最多显示两行，超出部分自动显示省略号。
    </div>
    <highlight-code code-id="fontSizeAutoDirective"/>

    <code>详细解释font-size: clamp(14px, 2vw, 20px);</code>
    <highlight-code code-id="clamp"/>

    <code>em:</code>
    <highlight-code code-id="em"/>

    <code>emDemo</code>
    <EmLineClampDemo/>
    <highlight-code code-id="emDemo"/>
  </div>
</template>

<script setup lang="ts">
import AdaptiveText from "@/components/AdaptiveText.vue";
import HighlightCode from "@/views/HighlightCode.vue";
import EmLineClampDemo from "@/components/EmLineClampDemo.vue";
</script>

<style scoped>

.text-box {
  width: 80%;
  background: darkkhaki;
  //font-size: clamp(14px, 2vw, 20px); /* 随屏幕大小自适应 */
  //line-height: 1.4;
  //max-height: calc(1.4em * 2); /* 1.4 行高 × 2 行 */
  //overflow: hidden;
  //display: -webkit-box;
  //-webkit-line-clamp: 2; /* 限制 2 行 */
  //-webkit-box-orient: vertical;
  //text-overflow: ellipsis;
}
</style>