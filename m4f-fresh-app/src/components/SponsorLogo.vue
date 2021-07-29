<template>
  <span class="pagetitle">
    <picture>
      <source
        :srcset="require(`@/districtLogos/${sponsor.sponsorAbbr}-logo-dark.${sponsor.logoFormat}`)"
        media="(prefers-color-scheme: dark)"
      />
      <img
        :src="require(`@/districtLogos/${sponsor.sponsorAbbr}-logo.${sponsor.logoFormat}`)"
        height="80"
        :alt="`${sponsor.sponsorName} Logo`"
        class="image"
      />
    </picture>
  </span>
</template>
<script>
import sponsorData from '@/sponsorIndex';

/**
 * <sponsor-logo> - Component that holds logic for the sponsor logo depending on the URL.
 */
export default {
  name: 'sponsor-logo',
  data() {
    return {
      sponsor: sponsorData(this.$route.params.sponsor)
    };
  },
  watch: {
    '$route.params.sponsor'(to, from) {
      if (to != from) {
        this.sponsor = sponsorData(this.$route.params.sponsor);
      }
    }
  }
};
</script>
<style lang="scss">
@media only screen and (max-width: 350px) {
  .image {
    height: 50px !important;
  }
}
@media only screen and (max-width: 480px) {
  .image {
    height: 60px;
  }
}
</style>
<style lang="sass"></style>
