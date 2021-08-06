<template>
  <div id="result-page" class="page">
    <nav id="results-header">
      <div class="results-header-row">
        <div class="results-header-flex">
          <b-link
            :to="{
              name: 'SponsorLandingPage',
              params: {
                lang: $route.params.lang,
                sponsor: $route.params.sponsor
              }
            }"
            class="back-link"
          >
            <i class="fas fa-chevron-left" /> Return to Provider Home
          </b-link>
          <!-- <b-button @click="test"> Test </b-button>
          <p>{{ `Showing ${filteredResults.length} results.`}}</p> -->
          <results-filter v-model="tagsSelected" />
        </div>
      </div>
      <div class="search-row">
        <form>
          <b-form-input v-model="searchText" id="searchbar" type="search" placeholder="Enter a location to find closest sites." />
        </form>
      </div>
    </nav>
    <main>
      <result-card v-for="(item, index) in filteredResults" v-bind:key="index" :result="item" @tap="showResultDetails" />
      <b-spinner v-if="isLoading" label="primary" />
      <p v-if="filteredResults.length == 0 && !isLoading">So sorry, there are no results with the selected tags.</p>
    </main>
  </div>
</template>

<script>
import sponsorData from '@/sponsorIndex.js';
import Backend from '@/backend.js';

import ResultCard from '@/components/results/ResultCard.vue';
import ResultsFilter from '@/components/results/ResultsFilter.vue';
// import Tag from './Tag.vue'
/**
 * ResultsPage.vue replaces ResultsList.vue
 */
export default {
  components: { ResultCard, ResultsFilter },
  // components: { Tag },
  props: {
    initialSearch: String
  },
  created() {
    this.filteredResults = this.results;
  },
  data() {
    return {
      sponsor: sponsorData(this.$route.params.sponsor),
      results: [], // original results from the spreadsheet
      filteredResults: [],
      tagsSelected: [],
      isLoading: true,
      searchText: ''
    };
  },
  methods: {
    async test() {
      console.log(this.sponsor.sponsorAbbr);
      console.log(await Backend.getMealSites(this.$route.params.sponsor));
      console.log(this.results, 'results passed in');
      console.log(this.filteredResults, 'self-filtered results');
    },
    updateTagsSelected() {
      let tempRes = this.results;
      this.tagsSelected.forEach((tag) => {
        tempRes = tempRes.filter((site) => {
          try {
            const splittedTag = tag.split('.');
            if (splittedTag[0] == 'dietaryoptionsoffered') {
              return site.tags['dietaryoptionsoffered'].toLowerCase().includes(splittedTag[1]);
            }
            return site.tags[tag];
          } catch (e) {
            /* I used try-catch because for some reason if the column doesn't exist, it stops function execution rather 
               than returning undefined.
            */
            console.error(`Note! The tag name (${tag}) is not set up right. Check the spreadsheet or the checkbox's value attribute.`);
            return true;
          }
        });
      });
      return tempRes; // this sends the data to be reacted upon
    },
    showResultDetails() {}
  },
  watch: {
    tagsSelected: function () {
      this.filteredResults = this.updateTagsSelected();
    }
  },
  async mounted() {
    this.results = (await Backend.getMealSites(this.$route.params.sponsor)).filter((site) => site.open_status);
    this.isLoading = false;
    this.filteredResults = this.results;

    this.searchText = this.initialSearch ?? '';
  }
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
  flex-grow: 1;
}

#result-page main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#results-header {
  width: 100%;
  background-color: white;
  /* height: 50px; */
}

.results-header-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.results-header-flex {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 850px;
  flex-wrap: wrap;
  margin: 10px 0 5px 0;
}

.search-row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.search-row form {
  width: 100%;
  max-width: 850px;
  margin: 10px 10px 20px 10px;

  display: inline-block;
}

#searchbar {
}

.back-link {
  display: inline-block;
}
</style>
