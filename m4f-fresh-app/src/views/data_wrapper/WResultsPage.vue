<template>
  <main>
    <result-card v-for="(item, index) in data" v-bind:key="index" :result="item" @tap="showResultDetails" />
    <p v-if="data.length == 0 && !isLoading">So sorry, there are no results with the selected tags.</p>
  </main>
</template>

<script>
import ResultCard from '@/components/results/ResultCard.vue';
export default {
  components: { ResultCard },
  props: {
    data: Array,
    isLoading: Boolean
  },
  data() {
    return {};
  },
  methods: {
    showResultDetails() {}
  }
};
</script>

<style></style>
