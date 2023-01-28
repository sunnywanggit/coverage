
<template>
  <div class="comp-bottom-footer">
    <div class="right-nav-list">
      <a class="nav home-page" href="https://www.linctex.com/" title="home page" target="_blank"></a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  hideAbout: Boolean,
  noBtmPadding: Boolean,
});
const isLoginShow = ref(false);

onMounted(() => {
  const root = document.getElementById('__nuxt');
  if (root && !props.noBtmPadding) {
    root.style.paddingBottom = '30px';
  }
});

function toggleLoginShow() {
  isLoginShow.value = !isLoginShow.value;
}

function handleFeedbackClick() {
  if (true) {
    window.open('https://forms.gle/myPj8uFWAs1mGU9u8')
  } else {
    isLoginShow.value = true;
  }
}
</script>
