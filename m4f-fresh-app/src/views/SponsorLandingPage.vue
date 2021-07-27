<template>
  <div class="home">
    <div class="top">
      <p class="program-info" id="mealsite-info">
        Join us this summer for free meals at one of our
        <span style="color: #fff4a3"> 18 </span> locations!
      </p>
      <!-- search bar is created with b-form-input --->
      <b-form id="search" @submit="search">
        <b-list-group horizontal class="need-location-group">
          <b-form-input
            v-model="text"
            type="search"
            @keydown.native="search"
            id="searchPrompt"
            :placeholder="$t('SponsorLanding.search')"
          ></b-form-input>
          <b-button variant="primary" class="search-btn"
            ><i class="fas fa-search"></i
          ></b-button>
        </b-list-group>
      </b-form>
      <!-- this is the button that takes you to the results list (see "v-on:click") --->
      <b-button
        class="find-site"
        :to="{
          name: 'ResultsPage',
          params: { sponsor: $route.params.sponsor, lang: $route.params.lang },
          query: { searchText: text },
        }"
        >{{ this.$t("SponsorLanding.findSite") }}
      </b-button>
    </div>
    <p class="announcement">
      Register <span style="font-weight: bolder">here </span> to receive free
      meals during August 2021.
    </p>
    <!-- creates 2x3 buttons list, each button takes you to district-specific information --->
    <b-row cols="2" id="rowCol">
      <b-col class="col">
        <b-button
          class="prog-btns"
          :to="{
            name: 'LearnFreeMealsPage',
            params: {
              sponsor: $route.params.sponsor,
              lang: $route.params.lang,
            },
          }"
        >
          <b-icon-question-circle-fill
            class="btnIcon"
          ></b-icon-question-circle-fill>
          <br />{{ this.$t("SponsorLanding.learnMore") }}</b-button
        >
        <b-button
          class="prog-btns"
          :to="{
            name: 'MenuAndInfoPage',
            params: {
              sponsor: $route.params.sponsor,
              lang: $route.params.lang,
            },
          }"
        >
          <b-icon-calendar3 class="btnIcon"></b-icon-calendar3>
          <br />{{ this.$t("SponsorLanding.menuAndInfo") }}</b-button
        >
        <b-button
          class="prog-btns"
          :to="{
            name: 'SchoolMealsPage',
            params: {
              sponsor: $route.params.sponsor,
              lang: $route.params.lang,
            },
          }"
        >
          <b-icon-check2-square class="btnIcon"></b-icon-check2-square>
          <br />{{ this.$t("SponsorLanding.schoolMeals") }}</b-button
        >
      </b-col>
      <b-col class="col">
        <b-button
          class="prog-btns"
          :to="{
            name: 'GroceriesPage',
            params: {
              sponsor: $route.params.sponsor,
              lang: $route.params.lang,
            },
          }"
        >
          <b-icon-cart4 class="btnIcon"></b-icon-cart4>
          <br />{{ this.$t("SponsorLanding.groceries") }}</b-button
        >
        <b-button class="prog-btns"> <br /></b-button>
        <!-- need button for find another sponsor --->
        <b-button
          class="prog-btns"
          :to="{
            name: 'HelpAndConnectPage',
            params: {
              sponsor: $route.params.sponsor,
              lang: $route.params.lang,
            },
          }"
        >
          <b-icon-chat-text class="btnIcon"></b-icon-chat-text>
          <br />{{ this.$t("SponsorLanding.helpConnect") }}</b-button
        >
      </b-col>
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
import sponsorData from "@/sponsorIndex.js";
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
  data() {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    return {
      sponsorTheme: sponsorData(this.$route.params.sponsor),
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
      text: "",
    };
  },
  methods: {
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
    search(event) {
      if (event.which === 13) {
        event.preventDefault();
        this.$emit("search", this.text);
      }
    },
    refreshCSSVariables() {
      document.documentElement.style.setProperty(
        "--banner-light",
        this.sponsorTheme.colors.bannerColor
      );
      document.documentElement.style.setProperty(
        "--banner-dark",
        this.sponsorTheme.colors.bannerColorDark
      );
      document.documentElement.style.setProperty(
        "--nav-link-light",
        this.sponsorTheme.colors.navLink
      );
      document.documentElement.style.setProperty(
        "--nav-link-dark",
        this.sponsorTheme.colors.navLinkDark
      );
      document.documentElement.style.setProperty(
        "--accentColor",
        this.sponsorTheme.colors.accentColor
      );
    }
  },
  mounted() {
    this.refreshCSSVariables();
  },
  watch: {
    "$route.params.sponsor"(to, from) {
      if (to != from) {
        this.sponsorTheme = sponsorData(this.$route.params.sponsor);
        this.refreshCSSVariables();
      }
    }
  }
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
.top > #search > .need-location-group {
  margin: auto;
  padding: 20px 5px;
  width: 70%;
}
/*styles the button that takes you to results list*/
.top > .find-site {
  text-align: center;
  color: #000000;
  background-color: #79b80a;
  margin: auto;
  padding: 10px;
  position: absolute;
  left: 50%;
}
.top > .find-site:hover {
  opacity: 0.5;
}
/*styles the announcement across landing page*/
.announcement {
  margin: 20px 0px auto;
  padding: 15px;
  text-align: center;
  background-color: #fff4a3;
  color: #000000;
  display: block;
}
/*styles the 6 buttons on landing page*/
.home > #rowCol > .col > .prog-btns {
  background-color: #0051ba;
  color: #ffffff;
  width: 90%;
  height: 50%;
  text-align: center;
  display: inline-block;
  margin: 20px auto 0px;
  border-radius: 1em;
}
.home > #rowCol > .col > .prog-btns > .btnIcon {
  width: 20%;
  height: 20%;
}
/*hover state for the 6 buttons*/
.home > #rowCol > .col > .prog-btns:hover {
  opacity: 0.5;
}
@media (prefers-color-scheme: dark) {
  .home {
    background-color: #000000 !important;
  }
}
</style>
