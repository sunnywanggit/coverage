<template>
  <div>
    <use-animation anim-effect="HOVER_PLAY_AND_BACKWARDS" :animation="UMail" :size="28" />
  </div>
</template>
<script setup>
import UMail from './assets/useanimations/mail';
import UseAnimation from './components/use-animation'
</script>
