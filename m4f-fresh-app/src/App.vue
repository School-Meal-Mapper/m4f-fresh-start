<template>
  <div class="home">
    <!-- Tab-skip buttons -->
    <!-- <a class="skip-to-main" href="#search-filter-wrapper" v-if="!checkParam">
      Skip to results.
    </a>
    <a class="skip-to-main" href="#mealsite-selector" v-if="checkParam">
      Skip to main.
    </a>   -->
    <div class="content">
      <!-- Header: -->
      <top-header></top-header>
      <div id="wrapper">
        <!-- Route pages will be inserted into here: -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
export default {
  components: {
    "top-header": TopHeader,
  },
  data() {
    return {
      logoLink: null,
      language: { name: "English", iso: "en" },
    };
  },
  created() {
    // this.logoLink = m4flogo;
  },
  methods: {
    // async fetchData() {
    //   const res = await fetch(districtData.data.spreadsheetUrl);
    //   if (districtData.data.faqUrl != null) {
    //     this.faqUrl = districtData.data.faqUrl;
    //   }
    //   if (districtData.data.providerinfoUrl != null) {
    //     const res3 = await fetch(districtData.data.providerinfoUrl);
    //     const info = await res3.json();
    //     this.info = info.feed.entry;
    //   }
    //   const entries = await res.json();

    //   this.entries = entries.feed.entry;
    //   this.logoLink = this.entries[0]["gsx$redirectlink"].$t;
    // },
    changeLanguage(item) {
      this.language = item;
      this.$root.updateLang(item.iso);
    },
  },
};
</script>

<style>
body {
  height: 100%;
  color: #808080;
  background-color: #ffffff;
  font-family: "Noto Sans", Arial, Helvetica, sans-serif;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000000;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
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

.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#wrapper {
  height: inherit;
  overflow: auto;
}
</style>
