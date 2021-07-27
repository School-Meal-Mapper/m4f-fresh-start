<template>
  <b-card class="result-card" :title="result.name" @click="emitTap">
    <tags-list :result="result" />
    <hr />
    <b-card-text class="result-card-text"
      ><i class="fas fa-directions" />
      {{ icon_spacing + result.location.address }}
      <template v-if="result.location.address_2 == ''">
        <br />
        {{ icon_spacing + result.location.address_2 }}
      </template>
    </b-card-text>
    <hr />
    <b-card-text class="result-card-text"
      ><i class="far fa-clock" />
      {{ icon_spacing }}
      <span v-if="checkOpen(result)">
        <b
          ><span class="open-indicator">Open </span>today until
          {{ getTodaysTime(result) }}.</b
        >
      </span>
      <span v-else>
        <b><span class="closed-indicator">Closed </span>now. </b>
        Opens at {{ getTomorrowsTime(result) }}
      </span>
    </b-card-text>
    <hr />
    <b-card-text class="result-card-text">
      <i class="fas fa-phone" />{{
        icon_spacing + result.contact.phone
      }}
    </b-card-text>
    <b-card-text class="result-card-text">
      <i class="fas fa-comments" />{{ icon_spacing + "English, Spanish" }}
    </b-card-text>
    <hr />
    <b-card-text class="result-card-text" v-if="result.web_link">
      <i class="fas fa-globe" />{{
        icon_spacing + result.weblink
      }}
    </b-card-text>
    <b-card-text class="result-card-text" v-if="result.notes"
      >{{ result.notes.slice(0, 100) + "..." }}
    </b-card-text>
    <div class="accent-bar" /> <!-- Not used now, but could make it look better, like on Zillow. -->
  </b-card>
</template>

<script>
import TagsList from '../TagsList.vue';
export default {
  components: { TagsList },
  props: {
    display: String,
    result: Object,
  },
  created() {
    this.icon_spacing = "    ";
  },
  methods: {
    checkOpen() {
      return true;
    },
    getTodaysTime() {
      return "6:00 pm";
    },
    getTomorrowsTime() {
      return "12 pm Tuesday";
    },
    lookupTags() {
      // should make an overall ResultCard component that allows includes these functions
      // the ResultCard should have condensed, preview, and full
    },
    emitTap() {
      this.$emit('tap', this.result); // sends the result object back to the parent
    }
  },
};
</script>

<style>
.result-card-text {
  margin: 10px 0 10px 0;
  text-align: left;
}

.result-card hr {
  margin: 3px;
}

.result-card i {
  font-size: 1.2em;
  filter: drop-shadow(2px 2px 0.8px lightgray);
  margin-right: 0.5em;
}

.result-card .card-title {
  /* part of bootstrap-vue's auto-generated classes */
  font-size: 1.2em;
  margin-bottom: 15px;
}

.result-card {
  background-color: white;
  color: black;
  padding: 25px 40px;
  margin: 20px 0 0 0;
  max-width: 850px;
}

.open-indicator {
  color: green;
}

.closed-indicator {
  color: red;
}
</style>
