<template>
  <main>
    <result-card v-for="(item, index) in data" v-bind:key="index" :result="item" @tap="showResultDetails" />
    <p v-if="data.length == 0 && !isLoading">Sorry, there are no results with the selected tags.</p>
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
    showResultDetails(result) {
      this.$emit('select', result);
      this.$router.push({
        name: 'DataWrapper',
        params: { lang: this.$route.params.lang, sponsor: this.$route.params.sponsor, view: 'details', search: result.name }
      });
    }
  }
};
</script>

<style></style>
