<template>
  <div class="home">
    <div class="blueDiv">
      <br />
      <h1>Welcome to M4F!</h1>
      <h2>Connect with a Local Sponsor to Find Free Meal Sites!</h2>
      <b-container>
        <div class="district-buttons">
          <b-form-select v-model="selectedState" :options="nc"
            >Select your state.
          </b-form-select>
          <br />
          <br />
          <b-form-select
            v-model="selectedDistrict"
            :options="districtOptions"
            :disabled="this.selectedState !== 'nc'"
            >Select a sponsor in your county.
          </b-form-select>
          <br />
          <br />
          <b-button
            class="genericSiteButton"
            :disabled="this.selectedDistrict === null"
            v-on:click="districtLink"
            >Find Free Meals Near Me!</b-button
          >
          <br />
          <br />
          <p><strong>OR</strong></p>
          <div class="searchBarGroup">
            <mdb-form-inline>
              <input
                type="text"
                placeholder="Enter the name of your local school."
                aria-label="Search"
              />
              <mdb-btn color="mdb-color" rounded size="sm">Search</mdb-btn>
            </mdb-form-inline>
          </div>
          <br />
          <br />
        </div>
      </b-container>
    </div>
    <div class="whiteDiv">
      <p>Don't see a free meal sponsor in your county?</p>
      <p>Learn more about our mission to connect families with free</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import JobCard from "@/components/JobCard.vue";
import { nc, districts } from "../constants";
export default {
  name: "Home",
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
.blueDiv {
  color: #ffffff;
  background-color: #0956bc;
}
.genericSiteButton {
  background-color: #79b80a;
  color: #000000;
}
</style>
