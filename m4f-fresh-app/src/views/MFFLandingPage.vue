<template>
  <div id="homePage" class="page">
    <br />
    <b-container>
      <h1>Welcome to M4F!</h1>
      <h2>Connect with a Local Sponsor to Find Free Meal Sites!</h2>
      <br />
      <div class="input-group rounded">
        <b-form-input
          v-model="text"
          type="search"
          id="searchBySchoolInput"
          class="form-control rounded"
          placeholder="Search by the name of your local school. "
          aria-label="Search"
          aria-describedby="search-addon"
        ></b-form-input>
        <b-button type="submit" class="mffGenButton">
          <b-icon icon="search"></b-icon>
        </b-button>
      </div>
      <!-- start test code -->
      <div class="mt-2">Value: {{ text }}</div>
      <br />
      <input type="text" v-model="search" placeholder="search blogs" />
      <p id="test">{{ blogSearchText }}</p>
      <!-- end test code -->
      <p><strong>OR</strong></p>
      <div class="district-buttons" id="mffGenDiv">
        <p>
          <b-form-select v-model="selectedState" :options="nc" class="mb-3">
            <b-form-select-option :value="null">Please select your state.</b-form-select-option>
          </b-form-select>
          <b-form-select v-model="selectedDistrict" :options="districtOptions" :disabled="this.selectedState !== 'nc'" class="mb-3">
            <b-form-select-option :value="null">Please select your district.</b-form-select-option>
          </b-form-select>
          <b-button
            class="mffGenButton"
            :to="{
              name: 'SponsorLandingPage',
              params: { sponsor: selectedDistrict, lang: $route.params.lang }
            }"
            :disabled="this.selectedDistrict === null"
            >Find free meals near me!</b-button
          >
        </p>
      </div>
      <br />
      <br />
      <b-card class="homeLinkCard">
        <b-link class="homeLink" href="https://www.meals4families.community">
          <p>
            Learn more about our mission to connect families with free meals.
            <b-button class="triangleButton">
              <b-icon icon="triangle-fill" rotate="90" aria-label="arrow"></b-icon>
            </b-button>
          </p>
        </b-link>
      </b-card>
      <br />
      <b-card class="homeLinkCard">
        <b-link class="homeLink">
          <p>
            Don't see a free meal sponsor in your county?
            <b-button
              class="triangleButton"
              :to="{
                name: 'SponsorNotFoundPage',
                params: { lang: $route.params.lang }
              }"
            >
              <b-icon aria-label="arrow" icon="triangle-fill" rotate="90"></b-icon>
            </b-button>
          </p>
        </b-link>
      </b-card>
    </b-container>
  </div>
</template>
<script>
// @ is an alias to /src
import { nc, districts } from '../constants';
import sponsorData from '@/sponsorIndex';
import { testSchoolsArray } from '../allSchoolsData';
export default {
  name: 'MFFLandingPage',
  components: {},
  data() {
    return {
      nc: nc,
      districts: districts,
      selectedState: null,
      selectedDistrict: null,
      sponsor: sponsorData(this.$route.params.sponsor),
      text: '',
      search: '',
      testSchoolsArray
    };
  },
  methods: {},
  watch: {
    '$route.params.sponsor'(to, from) {
      if (to != from) {
        this.sponsor = sponsorData(this.$route.params.sponsor);
        this.refreshCSSVariables();
      }
    }
  },
  computed: {
    districtOptions() {
      if (this.selectedState == 'nc') {
        return districts[this.selectedState];
      }
      if (this.selectedState == null) {
        return [{ value: null, text: 'You must select your state.' }];
      } else {
        return [{ value: null, text: 'You must select your state.' }];
      }
    },

    blogSearchText: function () {
      return this.testSchoolsArray.filter((school) => {
        return school.match(this.search);
      });
    }
  }
};
</script>
<style>
.root {
  --primary-color: '#1D6363';
  --banner-light: '#1D6363';
  --banner-dark: '#1B3C65';
  --nav-link-light: '#F8F8F8';
  --nav-link-dark: '#F8F8F8';
  --accentColor: '#ff4a3';
}
#homePage {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  color: var(--accentColor);
  background-color: var(--banner-light);
  @media (prefers-color-scheme-dark) {
    color: #ffffff !important;
    background-color: #000000 !important;
  }
}
h1,
h2,
p {
  text-align: center;
}
#mffGenDiv {
  color: #ffffff;
  background-color: var(--banner-light);
  @media (prefers-color-scheme-dark) {
    color: #ffffff !important;
    background-color: #000000 !important;
  }
}
.mffGenButton {
  color: #000000;
  background-color: var(--accentColor);
  box-shadow: 0px 2px 2px;
}
.triangleButton {
  color: #ffffff;
  background-color: #ffffff00;
  border: 0px;
}
.triangleButton:hover {
  color: var(--accentColor);
  background-color: #ffffff00;
  border: 0px;
}
.homeLinkCard {
  background-color: var(--banner-light);
  color: #ffffff;
  border-color: #ffffff;
}
.homeLink {
  color: #ffffff;
}
.homeLink:hover {
  color: var(--accentColor);
}
</style>
