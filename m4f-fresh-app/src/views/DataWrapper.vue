<template>
  <div id="results-wrapper" class="page">
    <nav id="results-header" v-show="$route.params.view != 'details'">
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
        <b-form @submit="stopSubmit">
          <b-form-input
            @blur="searchBarSubmission"
            v-model="searchText"
            ref="address-searchbar"
            id="searchbar"
            type="search"
            placeholder="Enter your address to find closest sites."
          />
        </b-form>
      </div>
    </nav>
    <b-spinner v-if="isLoading" label="primary" class="centered" />
    <p v-if="hasLoadingTimedOut">The site was unable to reach our servers. Try again in a couple seconds and refresh.</p>
    <!-- 
      Here I am letting this component manage the routing of the pages. This does not seem
      like best practices, but I cannot figure out how I would set up index.js to route to these
      pages without requiring an extra parameter in the URL path. If you want to add up an additional
      view for the landing page, you must add to the :sponsor/:view route's regex with the name of that path.
      Then, add an v-if below with the view's route.
     -->
    <results-page v-if="$route.params.view === 'list'" :data="filteredResults" :isLoading="isLoading" @select="displayDetails" />
    <map-page v-else-if="$route.params.view === 'map'" :data="filteredResults" :isLoading="isLoading" @select="displayDetails" />
    <details-page v-else-if="$route.params.view === 'details'" :result="detailedResult" />
    <!-- Original setup: <router-view :data="filteredResults" :isLoading="isLoading" /> -->

    <div class="view-switcher-spacer" />
    <b-nav pills justified align="center" class="view-switcher">
      <b-nav-item
        class="view-switcher-link"
        :to="{ name: 'DataWrapper', params: { ...$route.params, view: 'list' } }"
        :disabled="$route.params.view === 'list'"
        ><span class="view-switcher-border-pos">List</span></b-nav-item
      >
      <b-nav-item
        class="view-switcher-link"
        :to="{ name: 'DataWrapper', params: { ...$route.params, view: 'map' } }"
        :disabled="$route.params.view === 'map'"
        ><span class="view-switcher-border-pos">Map</span></b-nav-item
      >
    </b-nav>
  </div>
</template>

<script>
import sponsorData from '@/sponsorIndex.js';
import Backend from '@/backend.js';
//import { haversineDistance } from '@/utilities.js';

import ResultsFilter from '@/components/results/ResultsFilter.vue';
import ResultsPage from '@/views/data_views/ResultsPage.vue';
import MapPage from '@/views/data_views/MapPage.vue';
import DetailsPage from '@/views/data_views/DetailsPage.vue';
export default {
  components: {
    ResultsFilter,
    ResultsPage,
    MapPage,
    DetailsPage
  },
  props: {
    initialSearch: String
  },
  data() {
    return {
      sponsor: sponsorData(this.$route.params.sponsor),
      results: [], // original results from the spreadsheet
      filteredResults: [],
      tagsSelected: [],
      isLoading: true,
      hasLoadingTimedOut: false,
      detailedResult: undefined,
      searchText: '',
      prevSearchText: this.$route.query.searchText
    };
  },
  methods: {
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
    displayDetails(result) {
      // pulls up the additional details of each meal site
      this.detailedResult = result;
    },
    stopSubmit(e) {
      // when user presses Enter, it will blur (lose focus) the search bar, which will then call searchBarSubmission
      e.preventDefault();
      this.$refs['address-searchbar'].blur();
    },
    searchBarSubmission() {
      // changes URL and activates search-filtering function
      this.$router.replace({
        name: 'DataWrapper',
        params: {
          ...this.$route.params,
          search: this.searchText == '' ? null : this.searchText
        }
      });
      this.searchLoc();
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    //see notes in utilities.js
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
      var dLon = this.deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d;
    },
    //takes in coordinates for two points then checks the value of the distance between those 2 points, TODO: decide on a distance range like 10-15 miles
    //currently checks if meal sites are within 10 miles of searched location
    closeBy(lat1, lng1, lat2, lng2) {
      if (this.getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) > -10 && this.getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) <= 10) {
        return true;
      }
      return false;
    },
    searchLoc() {
      //makes what user searched (searchText) not case sensitive
      const lowercaseSearch = this.searchText.toLowerCase();
      //returns meal sites that include what user searched
      this.filteredResults = this.results.filter((site) => {
        return (
          lowercaseSearch.includes(site.name.toLowerCase()) ||
          site.name.toLowerCase().includes(lowercaseSearch) ||
          lowercaseSearch.includes(site.location.address.toLowerCase()) ||
          site.location.address.toLowerCase().includes(lowercaseSearch)
        );
      });
      //API: search + reverse --> we should use the API to search user input (searchText), get the list of OSM objects, measure distance of objects to meal sites (within 10 mi?) and return those sites
      //fetchstring is how we run API searches based on location user enters
      var fetchString =
        'https://nominatim.openstreetmap.org/search?key=9Rl2TaZFQpBPsnQmQo6cq79sl3Rf9EfA&q=' + this.searchText + '&format=json';
      fetch(fetchString)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            alert('Out of Bounds: Try a different address.');
            return;
          }
          //location is going to be the chosen address(es) from running OSM
          var location = null;
          var i;
          for (i = 0; i < data.length; i++) {
            if (data[i].lat >= 34 && data[i].lat <= 36.21 && data[i].lon <= -75.3 && data[i].lon >= -84.15) {
              //Making sure result is in NC: OSM objects are not bound in NC so this evaluates OSM objects to see which ones are in NC then sets location to that OSM object
              location = data[i];
              break;
            }
          }
          if (location == null) {
            return;
          }
          let sortedResults = this.results;
          //sortedResults returns meal sites that have a close distance to locations that OSM matched to what the user searched
          sortedResults = sortedResults.filter((site) => {
            if (this.closeBy(location.lat, location.lon, site.location.lat, site.location.lng)) {
              return site;
            }
          });
          this.filteredResults = sortedResults;
          return this.filteredResults;
        });
    }
  },
  watch: {
    tagsSelected: function () {
      this.filteredResults = this.updateTagsSelected();
    }
  },
  async mounted() {
    try {
      this.results = (await Backend.getMealSites(this.$route.params.sponsor)).filter((site) => site.open_status);
    } catch (e) {
      // executes if cannot reach backend's server
      this.hasLoadingTimedOut = true;
      console.error(`Cannot reach the spreadsheet data. Please check backend.js, sponsorIndex.js or the spreadsheet for share permissions.
      The link to the resource is: ${this.sponsor.data.spreadsheetUrl}`);
      console.log(`If you click on the link above and it seems like it returns valid json, make sure the problem isn't backend.js throwing
      an error because a column is formatted incorrectly or missing. If that's the case, try to fix the spreadsheet before
      changing backend.js`);
    }

    this.isLoading = false;
    this.filteredResults = this.results;

    // lookups
    this.searchText = this.initialSearch;
    if (this.searchText) {
      this.searchLoc(); // basically 'presses enter' if the input bar had text on creation
    }
    if (this.$route.params.view === 'details' && this.filteredResults.length == 1) {
      this.detailedResult = this.filteredResults[0]; // if the search param on details page matches only 1 site, display that site's details
    }
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

/*
#searchbar {
}
*/

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
  height: 3em;
  width: 100%;
  background-color: white;
  border-top: 1px solid black;
}

.view-switcher-spacer {
  width: 100%;
  height: 3em;
}

.view-switcher .nav-link {
  color: black;
}

/** 
  This shows the border on the span within <b-nav-item>. 
  The border only shows up if the disabled class is set
  on the b-nav-item.
*/
.view-switcher .disabled .view-switcher-border-pos {
  border: 1px solid black;
  padding: 2px 20%;
}
</style>
