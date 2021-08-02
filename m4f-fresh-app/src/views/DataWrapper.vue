<template>
  <div id="results-wrapper" class="page">
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
            <i class="fas fa-chevron-left" /> Go Back
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
    <b-spinner v-if="isLoading" label="primary" class="centered" />
    <!-- 
      Here I am letting this component manage the routing of the pages. This does not seem
      like best practices, but I cannot figure out how I would set up index.js to route to these
      pages without requiring an extra parameter in the URL path. If you want to add up an additional
      view for the landing page, you must add to the :sponsor/:view route's regex with the name of that path.
      Then, add an v-if below with the view's route.
     -->
    <results-page v-if="$route.params.view === 'list'" :data="filteredResults" :isLoading="isLoading" />
    <map-page v-else-if="$route.params.view === 'map'" :data="filteredResults" :isLoading="isLoading" />
    <!-- Original setup: <router-view :data="filteredResults" :isLoading="isLoading" /> -->

    <div class="view-switcher-spacer" />
    <b-navbar class="view-switcher">
      <b-nav pills>
        <b-nav-item
          class="view-switcher-link"
          :to="{ name: DataWrapper, params: { lang: this.$route.params.lang, sponsor: this.$route.params.sponsor, view: 'list' } }"
          >List</b-nav-item
        >
        <b-nav-item
          class="view-switcher-link"
          :to="{ name: DataWrapper, params: { lang: this.$route.params.lang, sponsor: this.$route.params.sponsor, view: 'map' } }"
          >Map</b-nav-item
        >
      </b-nav>
    </b-navbar>
  </div>
</template>

<script>
import sponsorData from '@/sponsorIndex.js';
import Backend from '@/backend.js';

import ResultsFilter from '@/components/results/ResultsFilter.vue';
import ResultsPage from '@/views/data_views/ResultsPage.vue';
import MapPage from '@/views/data_views/MapPage.vue';
export default {
  components: {
    ResultsFilter,
    ResultsPage,
    MapPage
  },
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
    }
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

    this.searchText = this.$route.query.searchText ?? '';
  }
};
</script>

<style>
#results-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #eee;
  width: 100%;
  height: 100%;
  overflow: auto;
  flex-grow: 1;
}

#results-wrapper main {
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

.centered {
  margin: auto;
}

.view-switcher {
  position: fixed;
  bottom: 0;
  align-self: flex-end;
  height: 3rem;
  width: 100%;
  background-color: white;
  border-top: 1px solid black;
}

.view-switcher-spacer {
  width: 100%;
  height: 3rem;
}

.view-switcher ul {
  justify-content: space-between !important;
}

.view-switcher li {
  display: inline-block;
}

.view-switcher .nav-link {
  color: black;
}
</style>
