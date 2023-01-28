<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, ref } from 'vue';
import lottie from 'lottie-web/build/player/lottie.js';
import type { AnimationItem, AnimationConfigWithData, AnimationConfig } from 'lottie-web';
import { getEvents } from '../utils/getEvents';
import type { AnimationSource, AnimationEffect } from '../types/animation';

const getRandomId = (key: AnimationSource['animationKey']) => `${key}_i${Math.floor(Math.random() * 10000 + 1)}`;

const props = defineProps<{
  animation: AnimationSource;
  reverse?: boolean;
  options?: Partial<AnimationConfig>;
  size?: number;
  loop?: AnimationConfig['loop'];
  autoplay?: AnimationConfig['autoplay'];
  speed?: number;
  animEffect?: AnimationEffect;
  wrapperStyle?: any;
  onClick?: (e: MouseEvent) => void;
}>();

const animation = ref<AnimationItem>();
const animationId = ref<string>(getRandomId(props.animation.animationKey));
const events = ref<any>({});
const useAnimationRef = ref<HTMLElement>();

const defaultStyles = ref<any>({
  overflow: 'hidden',
  outline: 'none',
  width: `${props.size || 24}px`,
  height: `${props.size || 24}px`,
  ...props.wrapperStyle,
});

const setEvents = ({ reverse, animEffect }: { reverse?: boolean; animEffect?: AnimationEffect }) => {
  const evt = animation.value
      ? getEvents({
        animation: animation.value,
        reverse: !!reverse,
        animEffect: animEffect || 'CLICK_PLAY_AND_BACKWARDS',
      })
      : undefined;
  if (evt) events.value = evt;
};

// 设置导航事件
watch(
    () => props.reverse,
    (reverse) => {
      setEvents({ reverse, animEffect: props.animEffect });
    },
);

// 设置动画速度
watch(
    () => props.speed,
    (speed) => {
      if (animation.value) {
        animation.value.setSpeed(speed || 1);
      }
    },
    { immediate: true },
);

const eventProps = ref({
  style: defaultStyles,
  onClick: (e: MouseEvent) => {
    props.onClick?.(e);
    if (events.value && 'onClick' in events.value) events.value.onClick();
  },
  onMouseenter: (e: MouseEvent) => {
    if (events.value && 'onMouseenter' in events.value) events.value.onMouseenter();
  },
  onMouseleave: (e: MouseEvent) => {
    if (events.value && 'onMouseleave' in events.value) events.value.onMouseleave();
  },
});

onMounted(() => {
  const defaultOptions: AnimationConfigWithData = {
    container: useAnimationRef.value as Element,
    renderer: 'svg',
    animationData: props.animation.animationData,
    loop: !!props.loop,
    autoplay: !!props.autoplay,
    rendererSettings: {
      // LOADS DOM ELEMENTS WHEN NEEDED. MIGHT SPEED UP INITIALIZATION FOR LARGE NUMBER OF ELEMENTS.
      progressiveLoad: true,
      // lottie-web missing id type
      // @ts-ignore-next-line
      id: animationId.value,
    },
    ...props.options,
  };
  console.log('lottie', lottie)
  // 初始化 animation
  animation.value = lottie.loadAnimation(defaultOptions);
  // 初始化 events
  setEvents({ reverse: props.reverse, animEffect: props.animEffect });
});

onBeforeUnmount(() => {
  animation.value?.destroy();
  animation.value = undefined;
});
</script>

<template>
  <div ref="useAnimationRef" v-bind="eventProps" />
</template>
