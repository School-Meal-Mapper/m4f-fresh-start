<template>
  <main id="result-details" class="page">
    <section id="minimap" v-if="result">
      <!-- 
        little minimap goes here when Leaflet gets implemented, may just show this site's pin 
        When clicked on, it should go to the map page or close the details if it's already on
        the map page.
      -->
      <l-map
        ref="leafletMiniMap"
        :zoom="sponsor.map.initialMapZoom"
        :center="[result.location.lat, result.location.lng]"
        :options="{ zoomSnap: 0.5, setView: true }"
        :maxZoom="sponsor.map.maxZoom"
        :minZoom="sponsor.map.minZoom"
      >
        <!-- this is where the map tiles are, url is the src of the map images -->
        <l-tile-layer
          :url="sponsor.map.source[isDarkMode ? 'dark' : 'light'].url"
          :attribution="sponsor.map.source[isDarkMode ? 'dark' : 'light'].attribution"
        />
        <l-marker :lat-lng="[result.location.lat, result.location.lng]" :icon="markerImage" />
      </l-map>
    </section>
    <b-card id="details" v-if="result" class="details-card">
      <div id="result-details-title">
        <h1>{{ result.name }}</h1>
        <a class="share-button"><i class="fas fa-share-alt" /></a>
      </div>
      <div class="tag-bar"><tags-list :result="result" /></div>
      <!-- where Flags (warnings and important info) should be -->
      <!-- <b-card class="warning-flag">
        Example-text: This meal site is only for students of the Shefield County Schools.
        School id is required.
      </b-card> -->
      <hr />
      <b-card-text class="result-card-text"
        ><i class="fas fa-directions" />
        {{ icon_spacing + result.location.address }}
        <template v-if="result.location.address_2 == ''">
          <br />
          {{ icon_spacing + result.location.address_2 }}
        </template>
      </b-card-text>
      <hr />
      <b-card-text class="result-card-text"
        ><i class="far fa-clock" />
        {{ icon_spacing }}
        <span v-if="checkOpen(result)">
          <b><span class="open-indicator">Open </span>today until {{ getTodaysTime(result) }}.</b>
        </span>
        <span v-else>
          <b><span class="closed-indicator">Closed </span>now. </b>
          Opens at {{ getTomorrowsTime(result) }}
        </span>
      </b-card-text>
      <hr />
      <b-card-text class="result-card-text"> <i class="fas fa-phone" />{{ icon_spacing + result.contact.phone }} </b-card-text>
      <b-card-text class="result-card-text"> <i class="fas fa-comments" />{{ icon_spacing + 'English, Spanish' }} </b-card-text>
      <hr />
      <b-card-text class="result-card-text" v-if="result.web_link">
        <i class="fas fa-globe" />{{ icon_spacing + result.weblink }}
      </b-card-text>
      <b-card-text class="result-card-text" v-if="result.notes">{{ result.notes }} </b-card-text>
    </b-card>
    <div v-else>
      The page you are looking for is not available. Please click on the List or Map tabs on the bottom of the screen to see more results.
    </div>
  </main>
</template>

<script>
import sponsorData from '@/sponsorIndex.js';

import TagsList from '@/components/TagsList.vue';

import leafletDefaultIcon from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
export default {
  components: { LMap, LTileLayer, LMarker, TagsList },
  props: {
    result: Object
  },
  created() {
    this.icon_spacing = '    ';
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches; // there has to be a better way to get dark mode in Vue, but I have not found it yet.
    this.markerImage = L.icon({
      iconUrl: leafletDefaultIcon,
      iconAnchor: [16, 37]
    }); // this is temporary, this information and the imports associated should be moved to a minimap component, or in a constant js library
  },
  data() {
    return {
      sponsor: sponsorData(this.$route.params.sponsor)
    };
  },
  methods: {
    checkOpen() {
      return true;
    },
    getTodaysTime() {
      return '6:00 pm';
    },
    getTomorrowsTime() {
      return '12 pm Tuesday';
    },
    lookupTags() {
      // should make an overall ResultCard component that allows includes these functions
      // the ResultCard should have condensed, preview, and full
    },
    emitTap() {
      this.$emit('tap', this.result); // sends the result object back to the parent
    }
  }
};
</script>

<style>
#minimap {
  height: 300px;
  min-width: 100%;
}

.details-card {
  background-color: white;
  color: black;
  padding: 25px 40px;
  margin: 20px 0 0 0;
  width: 100%;
  max-width: 850px;
}
</style>
