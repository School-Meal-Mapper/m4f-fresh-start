<template>
  <div class="home">
    <!-- Tab-skip buttons -->
    <!-- <a class="skip-to-main" href="#search-filter-wrapper" v-if="!checkParam">
      Skip to results.
    </a>
    <a class="skip-to-main" href="#mealsite-selector" v-if="checkParam">
      Skip to main.
    </a>   -->
    <top-header></top-header>
    <router-view />
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
    };
  },
};
</script>

<style>
html,
body {
  height: 100%;
}
body {
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
  font-family: "Noto Sans", Avenir, Helvetica, Arial, sans-serif;
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
  background: "fff4a3";
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

.home {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

#wrapper {
  height: inherit;
  overflow: auto;
}
</style>
