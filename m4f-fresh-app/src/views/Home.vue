<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row align-v="center">
        <job-card></job-card>
        <job-card></job-card>
        <job-card></job-card>
        <job-card></job-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import JobCard from "@/components/JobCard.vue";

export default {
  name: "Home",
  components: { "job-card": JobCard },
};
</script>
