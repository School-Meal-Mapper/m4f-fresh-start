<template>
  <div class="home">
    <!-- +++++++++++++++ add icon and change the on:click --->
    <!-- +++++++++++++++ statements need to become vars and 18 should be var based on meal site #'s--->
    <div class="top">
      <p class="program-info" id="mealsite-info">
        Join us this summer for free meals at one of our <span style="color: #ffec60;"> 18 </span> locations!
      </p>
      <b-form-input
        v-model="text"
        type="search"
        @keydown.native="search"
        :placeholder="$t('searchBar.searchPrompt')"
        id="searchPrompt"
      ></b-form-input>
      <b-button class="find-site" v-on:click="mapLink">{{ this.$t('landingPage.findFreeMealsNearMe') }}</b-button>
    </div>
    <p class="announcement">Register <span style="font-weight: bolder;">here </span> to receive free meals during August 2021.</p>
    <b-row cols="2" class="twoCols">
      <b-button v-on:click="mapLink" class="prog-btns"
        >{{ 'Learn More About Free Meals' }} <b-icon-question-circle-fill></b-icon-question-circle-fill
      ></b-button>
      <b-button v-on:click="mapLink" class="prog-btns">{{ 'Menu & Special Events' }} <b-icon-calendar3></b-icon-calendar3></b-button>
      <b-button v-on:click="mapLink" class="prog-btns"
        >{{ 'Register for Free School-Year Meals' }} <b-icon-check2-square></b-icon-check2-square
      ></b-button>
      <b-button v-on:click="mapLink" class="prog-btns">{{ 'Get Money for Groceries' }} <b-icon-cart4></b-icon-cart4></b-button>
      <b-button v-on:click="mapLink" class="prog-btns">{{ 'Not Your Local Meal Provider?' }}</b-button>
      <!-- +++++++++++++++ need button for find another sponsor --->
      <b-button v-on:click="mapLink" class="prog-btns">{{ 'Need Help? Connect With Us!' }} <b-icon-chat-text></b-icon-chat-text></b-button>
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
import { districtData } from '../themes/MealsForFamilies/districtData'

document.documentElement.style.setProperty('--primary-color', districtData.colors.primaryColor)
document.documentElement.style.setProperty('--banner-light', districtData.colors.bannerColor)
document.documentElement.style.setProperty('--banner-dark', districtData.colors.bannerColorDark)
document.documentElement.style.setProperty('--nav-link-light', districtData.colors.navLink)
document.documentElement.style.setProperty('--nav-link-dark', districtData.colors.navLinkDark)

export default {
  props: {
    msg: String
  },
  created() {
    this.mapLink()
  },
  components: {
    //AppHeader,
    //ThemeHeader
  },
  data() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    return {
      entries: null,
      need: 'none',
      language: { name: 'English', iso: 'en' },
      darkModeMediaQuery: darkModeMediaQuery,
      darkMode: darkModeMediaQuery.matches,
      mapUrl: '',
      attribution: null,
      socialMediaico: districtData.socialMedia,
      hoverItem: null,
      districtAbbr: districtData.districtAbbr,
      logoFormat: districtData.logoFormat,
      districtName: districtData.districtName,
      logoLink: null,
      text: undefined
    }
  },
  mounted() {
    this.setDarkMode(this.darkMode)
    this.darkModeMediaQuery.addListener((e) => {
      this.darkMode = e.matches
      this.setDarkMode(this.darkMode)
    })
  },
  methods: {
    mapLink() {
      location.href = location.href + '/map'
      return true
    },
    search(event) {
      if (event.which === 13) {
        console.log('here')
        event.preventDefault()
        this.$emit('search', this.text)
      }
    },
    /*
    setDarkMode(darkMode) {
      this.mapUrl = darkMode ? districtData.maps.dark.url : districtData.maps.normal.url
      this.attribution = darkMode ? districtData.maps.dark.attribution : districtData.maps.normal.attribution
    },
    boxSelected: function (content) {
      this.highlightFilters = addOrRemove(this.highlightFilters, content.need)
    },
    needSelected: function (val) {
      this.need = val
      this.highlightFilters = []
    }, */
    changeLanguage: function (item) {
      this.language = item
      this.$root.updateLang(item.iso)
    },
    passHover: function (item) {
      this.hoverItem = item
    },
    passNoHover: function () {
      this.hoverItem = null
    },
    searchLoc: function (location) {
      for (var index = 0; index < this.filteredMarkers.length; index++) {
        const entry = this.filteredMarkers[index].marker
        if (
          entry['gsx$mealsitename'].$t.toLowerCase().includes(location.toLowerCase()) ||
          location.toLowerCase().includes(entry['gsx$mealsiteaddress1'].$t.toLowerCase()) ||
          entry['gsx$mealsiteaddress1'].$t.toLowerCase().includes(location.toLowerCase())
        ) {
          const val = {
            locValue: index,
            isSetbyMap: false
          }
          this.passLocation(val)
          return
        }
      }
      var fetchString = 'https://nominatim.openstreetmap.org/search?key=9Rl2TaZFQpBPsnQmQo6cq79sl3Rf9EfA&q=' + location + '&format=json'
      fetch(fetchString)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            alert(this.$t('searchBar.noResults'))
            return
          }
          var location = null
          var i
          for (i = 0; i < data.length; i++) {
            if (data[i].lat >= 34 && data[i].lat <= 36.21 && data[i].lon <= -75.3 && data[i].lon >= -84.15) {
              //Making sure result is in NC
              location = data[i]
              break
            }
          }
          if (location == null) {
            alert(this.$t('searchBar.noResults'))
            return
          }
          /*this.searchLocData = latLng(location.lat, location.lon)
          const distances = this.filteredMarkers.map((entry) =>
            haversineDistance([location.lat, location.lon], [entry.marker.gsx$lat.$t, entry.marker.gsx$lon.$t], true)
          )
          const index = distances.indexOf(Math.min(...distances))
          const val = {
            locValue: index,
            isSetbyMap: false
          }
          this.passLocation(val)
          */
        })
    },
    searchZip(event) {
      if (event.which === 13) {
        event.preventDefault()
        if (this.zip.length != 5) {
          alert('Please enter a valid zipcode')
        } else {
          console.log(this.zip)
        }
      }
    }
  },
  computed: {
    /*
    districtOptions() {
      if (this.selectedState == 'nc') {
        return districts[this.selectedState]
      }
      if (this.selectedState == null) {
        return [{ value: null, text: this.$t('landingPage.youMustSelectState') }]
      } else {
        return [{ value: null, text: this.$t('landingPage.youMustSelectState') }]
      }
    }, */
    /**
     * Checks to see if the URL is for the landing page or for a meal site.
     * @returns {Boolean} True --> landing page; False --> meal site
     */
    checkParam() {
      //var urlString = window.location.href
      //var url = new URL(urlString)
      //console.log(url.searchParams.has('d'))
      console.log(this.$route.path)
      return this.$route.path == '/' && this.districtAbbr == 'mff'
    },
    showMap() {
      var urlString = window.location.href
      return urlString.includes('/map')
    }
  }
}
</script>

<style>
.root {
  --primary-color: blue;
  --banner-light: '#E9ECEF';
  --banner-dark: '#212529';
  --nav-link-light: '#F8F8F8';
  --nav-link-dark: '#F8F8F8';
}
/*
body {
  color: #808080 !important;
  background-color: #ffffff !important;
} */
/*styles the find site button*/
.top {
  background-color: #0051ba;
  padding: 50px;
}

.top > .program-info {
  color: #ffffff;
  text-align: center;
}

.top > .searchPrompt {
  margin: 20px 5px;
  padding: 20px 5px;
  width: 294px;
}

.top > .find-site {
  /* padding and margin if not pretty*/
  /* font-family: Noto Sans; */
  text-align: center;
  color: #000000;
  background-color: #79b80a;
  margin: 2vh 20vh 2vh;
  padding: 10px;
}
.announcement {
  margin: 20px 0px auto;
  padding: 15px;
  text-align: center;
  background-color: #ffec60;
  color: #000000;
  display: block;
}

/*styles the 6 buttons on figma*/
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

.skip-to-main {
  background: #ffec60;
  color: black;
  left: 50%;
  padding: 7px;
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  transition: transform 0.3s;
  z-index: 1000000000;
  border-radius: 50px;
}
.skip-to-main:focus {
  transform: translateY(0%);
}
</style>
