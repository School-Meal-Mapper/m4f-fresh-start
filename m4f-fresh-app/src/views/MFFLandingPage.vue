<template>
  <div>
    M4f landing page
    <h3>
      {{
        this.$route.query.lang == "es"
          ? "Bienvenidos temporario"
          : "TEMPORARY Welcome"
      }}
    </h3>
    <router-link
      :to="{
        name: 'SponsorLandingPage',
        params: { lang: $route.params.lang, sponsor: 'chccs' },
      }"
      >Go to CHCCS</router-link
    >
  </div>
</template>

<script>
export default {
  name: "MFFLandingPage",
  components: {},
};
</script>

<style></style>

<!--
<template>
  <div class="district-buttons">
    <p class="intro" id="mealsite-selector">{{ this.$t('landingPage.welcomeStatement') }}</p>
    <p>
      <b-form-select v-model="selectedState" :options="optionsStates">{{ this.$t('landingPage.pleaseSelectState') }}</b-form-select>
      <br />
      <br />
      <b-form-select v-model="selectedSponsor" :options="optionsSponsors" :disabled="this.selectedState !== 'nc'">{{
        this.$t('landingPage.findYourCountyAndSelectProvider')
      }}</b-form-select>
    </p>
    <b-button :disabled="this.selectedSponsors === null" v-on:click="districtLink">{{
      this.$t('landingPage.findFreeMealsNearMe')
    }}</b-button>

    {{ this.$route.query.lang == 'en' ? 'TEMPORARY Welcome' : 'Bienvenidos temporario' }}
  </div>
</template>

<script>
import { nc, districts } from './../constants.js'

export default {
  created() {
    this.optionsStates = nc
    this.optionsSponsors = districts
  },
  data() {
    return {
      selectedState: null,
      selectedSponsor: null
    }
  },
  method: {
    districtLink() {
      if (this.selectedDistrict != null) {
        this.$router.push(`/${'chccs'}`) // temporarily only redirect to chccs
      }
    }
  }
}
</script>

<style>
.district-buttons {
  margin: 20vh auto;
  text-align: center;
  color: #000000;
}
.btn-secondary:disabled {
  background-color: #e9ecef !important;
  border-color: #a9a9a9 !important;
}

@media (prefers-color-scheme: dark) {
  .district-buttons {
    color: #f5f5f5;
  }
  .custom-select {
    color: #f5f5f5 !important;
  }
  select:disabled {
    color: #000000 !important;
  }
}
</style>
-->
