<template>
  <div class="home">
    <div class="top">
      <p class="program-info" id="mealsite-info">
        Join us this summer for free meals at one of our <span style="color: #ffec60;"> 18 </span> locations!
      </p>
      <!-- search bar is created with b-form-input --->
      <b-form-input v-model="text" type="search" @keydown.native="search" :placeholder="$t('searchBar.searchPrompt')" id="searchPrompt"
        ><i class="fas fa-search"></i
      ></b-form-input>
      <!-- this is the button that takes you to the results list (see "v-on:click") --->
      <b-button class="find-site" v-on:click="mapLink">{{ this.$t('landingPage.findFreeMealsNearMe') }}</b-button>
    </div>
    <p class="announcement">Register <span style="font-weight: bolder;">here </span> to receive free meals during August 2021.</p>
    <!-- creates 2x3 buttons list, each button takes you to district-specific information --->
    <b-row cols="2" id="twoCols">
      <b-button v-on:click="mapLink" class="prog-btns">
        <b-icon-question-circle-fill style="width: 30px; height: 30px;"></b-icon-question-circle-fill>
        <br />
        {{ this.$t('districtLandingPage.learnMore') }}</b-button
      >
      <b-button v-on:click="mapLink" class="prog-btns">
        <b-icon-calendar3 style="width: 30px; height: 30px;"></b-icon-calendar3>
        <br />
        {{ this.$t('districtLandingPage.menuAndMore') }}</b-button
      >
      <b-button v-on:click="mapLink" class="prog-btns">
        <b-icon-check2-square style="width: 30px; height: 30px;"></b-icon-check2-square>
        <br />
        {{ this.$t('districtLandingPage.schoolMeals') }}</b-button
      >
      <b-button v-on:click="mapLink" class="prog-btns">
        <b-icon-cart4 style="width: 30px; height: 30px;"></b-icon-cart4>
        <br />
        {{ this.$t('districtLandingPage.groceries') }}</b-button
      >
      <b-button v-on:click="mapLink" class="prog-btns">
        <br />
        {{ this.$t('districtLandingPage.wrongProvider') }}</b-button
      >
      <!-- +++++++++++++++ need button for find another sponsor --->
      <b-button v-on:click="mapLink" class="prog-btns">
        <b-icon-chat-text style="width: 30px; height: 30px;"></b-icon-chat-text>
        <br />
        {{ this.$t('districtLandingPage.helpConnect') }}</b-button
      >
    </b-row>
    <router-view />
  </div>
</template>
<!-- 
<style lang="scss">
// @import './themes/DurhamMeal/SCSS/custom.scss';
// </style>
-->

<script>
import { districtData } from "@/districtData";

document.documentElement.style.setProperty(
  "--primary-color",
  districtData.colors.primaryColor
);
document.documentElement.style.setProperty(
  "--banner-light",
  districtData.colors.bannerColor
);
document.documentElement.style.setProperty(
  "--banner-dark",
  districtData.colors.bannerColorDark
);
document.documentElement.style.setProperty(
  "--nav-link-light",
  districtData.colors.navLink
);
document.documentElement.style.setProperty(
  "--nav-link-dark",
  districtData.colors.navLinkDark
);

export default {
  props: {
    msg: String,
  },
  created() {
    this.mapLink();
  },
  data() {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    return {
      entries: null,
      need: "none",
      language: { name: "English", iso: "en" },
      darkModeMediaQuery: darkModeMediaQuery,
      darkMode: darkModeMediaQuery.matches,
      mapUrl: "",
      attribution: null,
      socialMediaico: districtData.socialMedia,
      hoverItem: null,
      districtAbbr: districtData.districtAbbr,
      logoFormat: districtData.logoFormat,
      districtName: districtData.districtName,
      logoLink: null,
    };
  },
  mounted() {
    this.setDarkMode(this.darkMode);
    this.darkModeMediaQuery.addListener((e) => {
      this.darkMode = e.matches;
      this.setDarkMode(this.darkMode);
    });
  },
  methods: {
    mapLink() {
      location.href = location.href + "/map";
      return true;
    },
    changeLanguage: function (item) {
      this.language = item;
      this.$root.updateLang(item.iso);
    },
    passHover: function (item) {
      this.hoverItem = item;
    },
    passNoHover: function () {
      this.hoverItem = null;
    },
    searchLoc: function (location) {
      for (var index = 0; index < this.filteredMarkers.length; index++) {
        const entry = this.filteredMarkers[index].marker;
        if (
          entry["gsx$mealsitename"].$t
            .toLowerCase()
            .includes(location.toLowerCase()) ||
          location
            .toLowerCase()
            .includes(entry["gsx$mealsiteaddress1"].$t.toLowerCase()) ||
          entry["gsx$mealsiteaddress1"].$t
            .toLowerCase()
            .includes(location.toLowerCase())
        ) {
          const val = {
            locValue: index,
            isSetbyMap: false,
          };
          this.passLocation(val);
          return;
        }
      }
      var fetchString =
        "https://nominatim.openstreetmap.org/search?key=9Rl2TaZFQpBPsnQmQo6cq79sl3Rf9EfA&q=" +
        location +
        "&format=json";
      fetch(fetchString)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            alert(this.$t("searchBar.noResults"));
            return;
          }
          var location = null;
          var i;
          for (i = 0; i < data.length; i++) {
            if (
              data[i].lat >= 34 &&
              data[i].lat <= 36.21 &&
              data[i].lon <= -75.3 &&
              data[i].lon >= -84.15
            ) {
              //Making sure result is in NC
              location = data[i];
              break;
            }
          }
          if (location == null) {
            alert(this.$t("searchBar.noResults"));
            return;
          }
        });
    },
    searchZip(event) {
      if (event.which === 13) {
        event.preventDefault();
        if (this.zip.length != 5) {
          alert("Please enter a valid zipcode");
        } else {
          console.log(this.zip);
        }
      }
    },
  },
  computed: {
    showMap() {
      var urlString = window.location.href;
      return urlString.includes("/map");
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

.top {
  background-color: #0051ba;
  padding: 50px;
}

/*"join us" message*/
.top > .program-info {
  color: #ffffff;
  text-align: center;
}

/* search bar*/
.top > .searchPrompt {
  margin: 20px 5px;
  padding: 20px 5px;
  width: 294px;
}

/*styles the button that takes you to results list*/
.top > .find-site {
  text-align: center;
  color: #000000;
  background-color: #79b80a;
  margin: 2vh 20vh 2vh;
  padding: 10px;
}

/*styles the announcement across landing page*/
.announcement {
  margin: 20px 0px auto;
  padding: 15px;
  text-align: center;
  background-color: #ffec60;
  color: #000000;
  display: block;
}

/*styles the 6 buttons on landing page*/
.home > .twoCols > .prog-btns {
  background-color: #0051ba;
  color: #ffffff;
  width: 250px;
  height: 100px;
  text-align: center;
  display: inline-block;
  margin: 20px 40px;
  border-radius: 1em;
}

/*hover state for the 6 buttons*/
.home > .twoCols > .prog-btns:hover {
  opacity: 0.5;
}

.btn-secondary:disabled {
  background-color: #e9ecef !important;
  border-color: #a9a9a9 !important;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000000 !important;
  }
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
