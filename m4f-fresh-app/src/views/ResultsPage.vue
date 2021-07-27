<template>
  <div id="result-page">
    <nav id="page-header">
      <b-button
        :to="{
          name: 'SponsorLandingPage',
          params: { lang: $route.params.lang, sponsor: $route.params.sponsor },
        }"
        ><i class="fas fa-chevron-left" /> Back to Provider Home</b-button
      >
      <b-button @click="test"> Test </b-button>
      <div><results-filter @select="updateTagsSelected" /></div>
    </nav>
    <main>
      <result-card
        v-for="(item, index) in filteredResults"
        v-bind:key="index"
        :result="item"
      />
      <p v-if="filteredResults.length == 0">
        So sorry, there are no results with the selected tags.
      </p>
    </main>
  </div>
</template>

<script>
import sponsorData from "@/sponsorIndex.js";
import Backend from "@/backend.js";

import ResultCard from "@/components/ResultCard.vue";
import ResultsFilter from "@/components/ResultsFilter.vue";
// import Tag from './Tag.vue'
/**
 * ResultsPage.vue replaces ResultsList.vue
 */
export default {
  components: { ResultCard, ResultsFilter },
  // components: { Tag },
  created() {
    this.filteredResults = this.results;
  },
  data() {
    return {
      sponsor: sponsorData(this.$route.params.sponsor),
      results: [], // original results from the spreadsheet
      filteredResults: [],
      tagsSelected: [],
    };
  },
  methods: {
    async test() {
      console.log(this.sponsor.sponsorAbbr);
      console.log(await Backend.getMealSites(this.$route.params.sponsor));
      console.log(this.results, "results passed in");
      console.log(this.filteredResults, "self-filtered results");
    },
    updateTagsSelected: function (tagsSelected) {
      this.tagsSelected = tagsSelected;

      let unreactiveResults = this.results;
      this.tagsSelected.forEach((tag) => {
        unreactiveResults = unreactiveResults.filter((m) => {
          try {
            const splittedTag = tag.split(".");
            if (splittedTag[0] == "dietaryoptionsoffered") {
              return m.marker["gsx$dietaryoptionsoffered"].$t
                .toLowerCase()
                .includes(splittedTag[1]);
            }
            return m.marker["gsx$" + tag].$t == "TRUE";
          } catch (e) {
            /* I used try-catch because for some reason if the column doesn't exist, it stops function execution rather 
               than returning undefined.
            */
            console.error(
              `Note! The tag name (${tag}) is not set up right. Check the spreadsheet or the checkbox's value attribute.`
            );
            return true;
          }
        });
      });

      this.filteredResults = unreactiveResults; // this sends the data to be reacted upon
    },
  },
  watch: {
    tagsSelected: function () {
      this.filteredResults = this.updateTagsSelected();
    },
  },
  async mounted() {
    this.results = (
      await Backend.getMealSites(this.$route.params.sponsor)
    ).filter((site) => site.open_status);
  },
};
</script>

<style>
#result-page {
  display: flex;
  flex-direction: column;
  background-color: #eee;
  width: 100%;
  height: 100%;
  overflow: auto;
}

#page-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  /* height: 50px; */
}
</style>
