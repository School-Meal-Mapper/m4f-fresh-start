<template>
  <div class="menu">
    <h1 class="menu-title">Menu and Special Events</h1>
    <b-form-group label="Special Events" v-slot="{ ariaDescribedby }">
      <b-form-radio-group :aria-describedby="ariaDescribedby">
        <b-form-radio value="normal">All Events</b-form-radio>
        <b-form-radio value="readonly">School-Year Events</b-form-radio>
        <b-form-radio value="normal">Summer Events</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <b-calendar id="calendar" :readonly="readonly"></b-calendar>
    <div>
      <b-button class="menu-btn"> Go To School Menu </b-button>
    </div>
  </div>
</template>

<script>
import sponsorData from '@/sponsorIndex.js';
//import Backend from '@/backend.js';
export default {
  name: 'MenuAndInfoPage',
  components: {},
  data() {
    return {
      sponsorTheme: sponsorData(this.$route.params.sponsor)
    };
  },
  computed: {
    readonly() {
      return this.state === 'readonly';
    }
  },
  methods: {
    refreshCSSVariables() {
      document.documentElement.style.setProperty('--banner-light', this.sponsorTheme.colors.bannerColor);
      document.documentElement.style.setProperty('--banner-dark', this.sponsorTheme.colors.bannerColorDark);
      document.documentElement.style.setProperty('--nav-link-light', this.sponsorTheme.colors.navLink);
      document.documentElement.style.setProperty('--nav-link-dark', this.sponsorTheme.colors.navLinkDark);
      document.documentElement.style.setProperty('--accentColor', this.sponsorTheme.colors.accentColor);
    }
  },
  mounted() {
    this.refreshCSSVariables();
    //this.menuLink = (await Backend.getProviderInfo(this.$route.params.sponsor)).menu_site;
  }
};
</script>

<style lang="scss">
.root {
  --banner-light: '#E9ECEF';
  --banner-dark: '#212529';
}

.menu {
  text-align: center;
  flex-grow: 1;
  margin: 20px;
  @media (max-width: 768px) {
    margin: 10px;
  }
}

.menu > .menu-title {
  margin: 10px auto;
}

.b-calendar .b-calendar-inner {
  min-width: 800px;
  margin: 10px auto;
  @media (max-width: 768px) {
    min-width: 250px;
  }
}

.menu-btn {
  margin: 10px auto;
  background-color: var(--banner-light);
  @media (prefers-color-scheme: dark) {
    background-color: var(--banner-dark);
  }
}

.menu-btn:hover {
  background-color: var(--banner-light);
  @media (prefers-color-scheme: dark) {
    background-color: var(--banner-dark);
  }
  opacity: 0.5;
}
</style>
