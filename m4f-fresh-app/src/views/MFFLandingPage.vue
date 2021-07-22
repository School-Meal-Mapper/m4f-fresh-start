<template>
  <div class="home">
    <div class="blueDiv">
      <br />
      <b-container>
        <h1>Welcome to M4F!</h1>
        <h2>Connect with a Local Sponsor to Find Free Meal Sites!</h2>
        <div class="district-buttons" id="mffGenDiv">
          <p>
            <b-form-select v-model="selectedState" :options="states">Please select your state.</b-form-select>
            <br />
            <br />
            <b-form-select v-model="selectedDistrict" :options="districtOptions" :disabled="this.selectedState !== 'nc'">
              Please select your district.
            </b-form-select>
          </p>
          <b-button id="mffGenButton" :disabled="this.selectedDistrict === null" v-on:click="districtLink">
            Find free meals near me!
          </b-button>
        </div>
          <br />
          <p><strong>OR</strong></p>
          <div class="input-group rounded">
            <input type="search" class="form-control rounded" placeholder="Search by the name of your local school. " aria-label="Search"
              aria-describedby="search-addon" />
            <b-button id="mffGenButton">
              <b-icon icon="search"></b-icon>
              <i class="fas fa-search"></i>
            </b-button>
          </div>
          <br />
          <br />
      </b-container>
    </div>
    <div class="whiteDiv">
      <br />
      <p>Don't see a free meal sponsor in your county?</p>
    </div>
    <div class="greyDiv">
      <br />
      <p>Learn more about our mission to connect families with free</p>
      <br />
    </div>
    <div class="whiteDiv">
      <p>Don't see a free meal sponsor in your county?</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { nc, districts } from "../constants";
export default {
  name: "MFFLandingPage",
  components: {},
  data() {
    return {
      nc: nc,
      districts: districts,
    };
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
}
.greyDiv {
  background-color: #aeaeae;
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
#mffGenButton {
  color: #000000;
  background-color: #79B80A;
  box-shadow: 0px 2px 2px;
}
</style>
