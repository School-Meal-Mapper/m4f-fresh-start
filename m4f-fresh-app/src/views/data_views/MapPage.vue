<template>
  <main class="map">
    <l-map
      ref="leafletMap"
      :zoom="sponsor.map.initialMapZoom"
      :center="sponsor.map.initialMapCenter"
      :options="{ zoomSnap: 0.5, setView: true }"
      :maxZoom="sponsor.map.maxZoom"
      :minZoom="sponsor.map.minZoom"
    >
      <!-- this is where the map tiles are, url is the src of the map images -->
      <l-tile-layer
        :url="sponsor.map.source[isDarkMode ? 'dark' : 'light'].url"
        :attribution="sponsor.map.source[isDarkMode ? 'dark' : 'light'].attribution"
      />
      <v-marker-cluster
        ref="marks"
        :options="{
          spiderfyOnMaxZoom: true,
          maxClusterRadius: 40,
          disableClusteringAtZoom: sponsor.map.clusterZoom
        }"
      >
        <l-marker
          v-for="(site, index) in data"
          v-bind:key="index"
          :lat-lng="[site.location.lat, site.location.lng]"
          :icon="icons.default"
          @click="showSiteDetails(site)"
        />
      </v-marker-cluster>
    </l-map>
  </main>
</template>

<script>
import sponsorData from '@/sponsorIndex.js';
import L from 'leaflet';
import leafletDefaultIcon from 'leaflet/dist/images/marker-icon.png';

import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'; // this is a plugin to Leaflet we are using just to have markers group together when they are too close
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
export default {
  components: { LMap, LTileLayer, LMarker, 'v-marker-cluster': Vue2LeafletMarkerCluster },
  props: {
    data: Array // list of Result Meal Site Objects
  },
  created() {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches; // there has to be a better way to get dark mode in Vue, but I have not found it yet.

    // predefine the Leaflet icons the map uses here and labels them for easy swapping
    this.icons = {
      default: L.icon({
        iconUrl: leafletDefaultIcon,
        // iconSize: [32, 32], // commented to keep it default size
        iconAnchor: [16, 37] // I assume this is what pixel of the icon is the "tip" of the marker
      })
    };
  },
  data() {
    return {
      sponsor: sponsorData(this.$route.params.sponsor)
    };
  },
  methods: {
    showSiteDetails(site) {
      console.log(site);
      this.$emit('select', site);
      this.$router.push({
        name: 'DataWrapper',
        params: { lang: this.$route.params.lang, sponsor: this.$route.params.sponsor, view: 'details' }
      });
    }
  }
};
</script>

<style>
@import '~leaflet.markercluster/dist/MarkerCluster.css';
@import '~leaflet.markercluster/dist/MarkerCluster.Default.css';

.map {
  height: 100px; /* for some reason this lets the map grow. */
  flex-grow: 1;
}
</style>
