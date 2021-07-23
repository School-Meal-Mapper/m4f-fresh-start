<template>
  <div class="home">
    <div class="blueDiv">
      <br />
      <b-container>
        <h1>Welcome to M4F!</h1>
        <h2>Connect with a Local Sponsor to Find Free Meal Sites!</h2>
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
                params: { sponsor: selectedDistrict, lang: $route.params.lang },
                }"
              :disabled="this.selectedDistrict === null">Find free meals near me!</b-button>
          </p>
        </div>
          <p><strong>OR</strong></p>
          <div class="input-group rounded">
            <b-form-input 
              type="search" 
              id="searchDistrictBySchoolInput"
              class="form-control rounded" 
              placeholder="Search by the name of your local school. " 
              aria-label="Search"
              aria-describedby="search-addon" 
            ></b-form-input>
            <b-button type="submit" class="mffGenButton">
                <b-icon icon="search"></b-icon>
                <i class="fas fa-search"></i>
              </b-button>
            
          </div>
          <br />
          <br />
      </b-container>
    </div>
    <div class="whiteDiv">
      <div class="container">
      <b-link>
        <p>
          Don't see a free meal sponsor in your county?
          <b-button class="triangleButton">
            <b-icon aria-label="arrow" icon="triangle-fill" rotate="90"></b-icon>
          </b-button>
        </p>
      </b-link>
      </div>
    </div>
    <div class="greyDiv">
      <div class="container">
      <b-link href="https://www.meals4families.community">
        <p>
          Learn more about our mission to connect families with free meals.
          <b-button 
            class="triangleButton">
            <b-icon icon="triangle-fill" rotate="90"></b-icon>
          </b-button>
        </p>
      </b-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { nc, districts } from "../constants";
import sponsorData from "@/sponsorIndex";
export default {
  name: "MFFLandingPage",
  components: {},
  data() {
    return {
      nc: nc,
      districts: districts,
      selectedState: null,
      selectedDistrict: null,
      sponsor: sponsorData(this.$route.params.sponsor),
    };
  },
  watch: {
    "$route.params.sponsor"(to, from) {
      if (to != from) {
        this.sponsor = sponsorData(this.$route.params.sponsor);
        this.refreshCSSVariables();
      }
    },
  },
  computed: {
    districtOptions() {
      if (this.selectedState == "nc") {
        return districts[this.selectedState];
      }
      if (this.selectedState == null) {
        return [{ value: null, text: "You must select your state." }];
      } else {
        return [{ value: null, text: "You must select your state." }];
      }
    },
  },
};
</script>
<style>
.root {
  --primary-color: blue;
  --banner-light: "#E9ECEF";
  --banner-dark: "#212529";
  --nav-link-light: "#F8F8F8";
  --nav-link-dark: "#F8F8F8";
}
.blueDiv {
  color: #ffffff;
  background-color: #0956bc;
  @media (prefers-color-scheme-dark) {
    color: #ffffff !important;
    background-color: #000000 !important;
  }
}
.whiteDiv {
  background-color: #ffffff;
  color: #000000;
}
.greyDiv {
  background-color: #e9eaeb;
  color: #000000;
}
h1, h2, p {
  text-align: center;
}
#mffGenDiv {
  color: #ffffff;
  background-color: #0956bc;
  @media (prefers-color-scheme-dark) {
    color: #ffffff !important;
    background-color: #000000 !important;
  }
}
.mffGenButton {
  color: #000000;
  background-color: #79b80a;
  box-shadow: 0px 2px 2px;
}
.triangleButton {
  color: #79b80a;
  background-color: #ffffff00;
  border: 0px;
}
</style>
