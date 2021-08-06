<template>
  <div id="homePage" class="page">
    <br />
    <b-container>
      <h1>Welcome to M4F!</h1>
      <h2>Connect with a Local Sponsor to Find Free Meal Sites!</h2>
      <br /><br />
      <!-- START vue-bootstrap-typeahead searchbar -->
      <!-- :data is array of all NC schools from Copy of All_NC_Schools_July_2021 spreadsheet, sheet 2, @hit is handlehit, a function which processes the chosen school and takes the user to the corresponding SponsorNotFound page or SponsorLanding page -->
      <vue-bootstrap-typeahead
        v-model="query"
        :data="processed"
        @hit="handleHit"
        id="searchBySchoolInput"
        placeholder="Search by the name of your local school. "
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <!-- END vue-bootstrap-typeahead searchbar -->
      <br />
      <p><strong>OR</strong></p>
      <!-- START select state and sponsor dropdown menu -->
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
      <!-- END select state and sponsor dropdown menu -->
      <br />
      <br />
      <!-- Additional info links at bottom of page -->
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
import { ourSponsors } from '../allSchoolsData';
import allSchoolsBackend from '../allSchoolsData';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
// import Backend from '../backend';
export default {
  name: 'MFFLandingPage',
  components: {
    VueBootstrapTypeahead // https://www.npmjs.com/package/vue-bootstrap-typeahead
  },
  data() {
    return {
      nc: nc,
      districts: districts,
      selectedState: null,
      selectedDistrict: null,
      sponsor: sponsorData(this.$route.params.sponsor),
      processed: [],
      processedObj: [],
      ourSponsors
    };
  },
  async mounted() {
    this.processed = await allSchoolsBackend.parseAllSchoolsSheet();
    this.processedObj = await allSchoolsBackend.getSchoolObject();
  },
  methods: {
    /* handles selected school option from VueBootstrapTypeahead search bar */
    handleHit(evt) {
      this.selectedSchool = evt;
      var Sponsor = this.getSponsor(this.selectedSchool);
      var ours = this.isSponsorOurs(Sponsor);
      console.log(this.isSponsorOurs(Sponsor));
      if (ours) {
        this.$router.push({
          name: 'SponsorLandingPage',
          params: { sponsor: this.getSponsorValue(Sponsor), lang: this.$route.params.lang }
        });
      } else {
        this.$router.push({ name: 'SponsorNotFoundPage', params: { sponsorname: Sponsor, lang: this.$route.params.lang } });
      }
    },
    /* returns the sponsor, takes school as param (called in handleHit) */
    getSponsor(school) {
      for (let i = 0; i < this.processed.length; i++) {
        if (this.processedObj[i].schoolName == school) {
          return this.processedObj[i].sponsorName;
        }
      }
    },
    /* returns true if sponsor is on M4F, false if sponsor is not on M4F (called in handleHit) */
    isSponsorOurs(Sponsor) {
      if (ourSponsors.includes(Sponsor)) {
        return true;
      } else {
        return false;
      }
    },
    /* returns value of sponsor (within districts from districtData.js) (called to direct router to a SponsorLanding page in handleHit) */
    getSponsorValue(Sponsor) {
      let ncDistricts = districts['nc'];
      for (let i = 0; i < ncDistricts.length; i++) {
        if (ncDistricts[i].text == Sponsor) {
          return ncDistricts[i].value;
        }
      }
    }
  },
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
