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
      />>
    </l-map>
  </main>
</template>

<script>
import sponsorData from '@/sponsorIndex.js';

import { LMap, LTileLayer } from 'vue2-leaflet';
export default {
  components: { LMap, LTileLayer },
  props: {
    data: Array // list of Result Meal Site Objects
  },
  created() {
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches; // there has to be a better way to get dark mode in Vue, but I have not found it yet.
    console.log(this.isDarkMode);
  },
  data() {
    return {
      sponsor: sponsorData(this.$route.params.sponsor)
    };
  }
};
</script>

<style>
.map {
  height: 100px; /* for some reason this lets the map grow. */
  flex-grow: 1;
}
</style>
