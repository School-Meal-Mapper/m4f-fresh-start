<template>
  <b-navbar toggleable="lg" type="dark" class="banner" id="topnav">
    <div class="logoSlot d-flex flex-row">
      <b-navbar-brand class="left">
        <sponsor-logo :abbr="sponsor.sponsorAbbr" :format="sponsor.logoFormat" :name="sponsor.sponsorName" />
      </b-navbar-brand>
    </div>

    <b-navbar-toggle target="nav-collapse" aria-label="More options"></b-navbar-toggle>

    <b-collapse id="nav-collapse" v-model="expanded" is-nav>
      <b-navbar-nav class="ml-auto">
        <!-- insert custom components -->
        <slot> </slot>
        <!-- route-based components -->
        <b-nav-text right>
          <b-button
            v-if="this.$route.params.sponsor === undefined"
            href="https://www.meals4families.community"
            size="sm"
            class="accentButton my-2 my-sm-0"
            variant="buttons"
            type="link"
          >
            <b>{{ language != 'en' ? 'sobre nosotros' : 'About Us' }}</b>
          </b-button>
          <b-button
            v-else-if="this.$route.path.includes('/faq')"
            @click="goBackPage"
            size="sm"
            class="accentButton my-2 my-sm-0"
            variant="buttons"
          >
            <b>Go Back</b>
          </b-button>
          <b-button
            v-else
            size="sm"
            class="accentButton my-2 my-sm-0"
            variant="buttons"
            @click="collapseNav"
            :to="{
              name: 'FAQPage',
              params: {
                lang: $route.params.lang,
                sponsor: $route.params.sponsor
              }
            }"
          >
            <b>Questions and Contact Information</b>
          </b-button>
        </b-nav-text>
        <!-- permabuttons (language dropdowns, home button to m4f, button to sponsor website) -->
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <i class="fas fa-language fa-xlg" aria-hidden="true" />
            <span class="sr-only">Toggle Language Dropdown</span>
          </template>
          <b-dropdown-item
            v-for="langOption in languages"
            v-bind:key="langOption.iso"
            @click="$router.push({ params: { lang: langOption.iso } })"
          >
            <!-- <span :title="$t('languages.' + langOption.iso)"> -->
            <span :title="'languages.' + langOption.iso">
              {{ langOption.name }}
            </span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item
          :to="{
            name: 'MFFLandingPage',
            params: { lang: $route.params.lang }
          }"
          right
        >
          <template>
            <i class="fas fa-home fa-lg" aria-hidden="true" />
            <span class="sr-only">Return to M4F</span>
          </template>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import sponsorData from '@/sponsorIndex.js';
import { supported_languages } from '@/constants.js';
import SponsorLogo from '@/components/SponsorLogo.vue';

/**
 * <top-header> is the horizontal navigation at the top of the screen throughout the
 * website.
 */
export default {
  components: { SponsorLogo },
  name: 'top-header',
  props: {},
  data() {
    return {
      sponsor: sponsorData(this.$route.params.sponsor),
      language: this.$route.params.lang ?? 'en',
      text: '',
      window: {
        width: 0,
        height: 0
      },
      expanded: false
    };
  },
  watch: {
    '$route.params.sponsor'(to, from) {
      if (to != from) {
        this.sponsor = sponsorData(this.$route.params.sponsor);
        this.refreshCSSVariables();
      }
    },
    '$route.params.lang'(to, from) {
      to ??= 'en';
      from ??= 'en';
      console.log(to, from);
      if (to != from) {
        this.$root.$i18n.locale = to ?? 'en'; // changes a global variable in i18n plugin
        this.language = this.$route.params.lang ?? 'en';
      }
    }
  },
  computed: {
    filteredLangs: function () {
      return this.languages.slice(0, 2);
    },
    selectLangs: function () {
      if (this.window.width > 991) {
        return this.languages.slice(2);
      } else {
        return this.languages;
      }
    }
  },
  created() {
    this.languages = supported_languages;
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    console.log(this.$route);
  },
  methods: {
    goBackPage() {
      this.collapseNav();
      this.$router.go(-1);
    },
    collapseNav() {
      this.expanded = false;
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    refreshCSSVariables() {
      document.documentElement.style.setProperty('--banner-light', this.sponsor.colors.bannerColor);
      document.documentElement.style.setProperty('--banner-dark', this.sponsor.colors.bannerColorDark);
      document.documentElement.style.setProperty('--nav-link-light', this.sponsor.colors.navLink);
      document.documentElement.style.setProperty('--nav-link-dark', this.sponsor.colors.navLinkDark);
      document.documentElement.style.setProperty('--accentColor', this.sponsor.colors.accentColor);
    }
  },
  mounted() {
    this.refreshCSSVariables();
  }
};
</script>

<style lang="scss">
:root {
  --banner-light: '#E9ECEF';
  --banner-dark: '#212529';
  --nav-link-light: '#000000';
  --nav-link-dark: '#ffffff';
  --accentColor: '#ffffff';
}

#topnav {
  // position: absolute;
  width: 100%;
  align-items: center;
  // z-index: 1038;
}

.navbar-brand {
  margin-right: 2px !important;
  font-size: 0.95rem !important;
  padding: 0.2rem 0 !important;
  font-weight: 600;
}

.add-business {
  float: right;
}

.language {
  padding: 0 5px;
}

.fa-xlg {
  font-size: 1.66666666em;
  line-height: 0.75em;
  vertical-align: -0.0667em;
}

.navbar-nav {
  margin-bottom: 16px !important;
}

.nav-item {
  margin: auto 0;
  text-align: right;
}

.heading > h1 {
  display: none;
}

.navbar-nav > li > .dropdown-menu {
  background-color: var(--banner-light);
  text-align: right;
  @media (prefers-color-scheme: dark) {
    background-color: var(--banner-dark);
  }
}

.navbar-nav > li > .dropdown-menu a {
  color: var(--nav-link-light);
  @media (prefers-color-scheme: dark) {
    color: var(--nav-link-dark);
  }
}

#topnav .navbar-text {
  text-align: right;
}

.btn-buttons {
  color: black !important;
  @media (prefers-color-scheme: light) {
    color: var(--nav-link-light);
  }
}

.navbar-nav > li > .dropdown-menu a:hover {
  // background-color: $nav-dropdown-bg-hover;
  @media (prefers-color-scheme: dark) {
    // background-color: $nav-dropdown-bg-hover-dark;
  }
}

.logoSlot {
  display: flex;
}
.logoSlot .left {
  flex: 1;
}
.logoSlot.right {
  flex: 1;
}

@media (min-width: 768px) {
  .navbar-nav {
    margin-bottom: 0 !important;
  }
  .navbar-brand {
    margin-right: 2px !important;
    font-size: 1.25rem !important;
  }
}

.sm-name {
  display: inline;
  // @include media-breakpoint-up(lg) {
  //   display: none;
  // }
}

.center-content {
  @media (max-width: 768px) {
    display: none;
  }
  position: fixed;
  margin-top: 1rem;
}

.searchTitle {
  color: var(--banner-light);
  @media (prefers-color-scheme: dark) {
    color: var(--banner-dark);
  }
}
.banner {
  background-color: var(--banner-light);
  // box-shadow: 0px 2px 3px rgb(0 0 0 / 40%);
  @media (prefers-color-scheme: dark) {
    background-color: var(--banner-dark);
  }
}

.nav-link {
  color: var(--nav-link-light) !important;
  @media (prefers-color-scheme: dark) {
    color: var(--nav-link-dark) !important;
  }
}

.accentButton {
  background-color: var(--accentColor) !important;
  box-shadow: 2px 2px 3px rgb(0 0 0 / 60%);
}
</style>
