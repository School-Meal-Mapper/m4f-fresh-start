<template>
  <div id="result-details">
    <section id="minimap">
      <!-- 
        little minimap goes here when Leaflet gets implemented, may just show this site's pin 
        When clicked on, it should go to the map page or close the details if it's already on
        the map page.
      -->
    </section>
    <b-card id="details">
      <div id="result-details-title">
        <h1>Name of Meal Site</h1>
        <a class="share-button"><i class="fas fa-share-alt"/></a>
      </div>
      <div class="tag-bar">
        List of tags, maybe we should have a unified tag bar
      </div>
      <!-- where Flags (warnings and important info) should be -->
      <!-- <b-card class="warning-flag">
        Example-text: This meal site is only for students of the Shefield County Schools.
        School id is required.
      </b-card> -->
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
        >{{ result.notes }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
/**
 * <result-details> is the pull up that contains *all* the expanded information of the particular meal site when you click on the <result-card>
 * in the ResultsPage, or when you click "expand information" on the <result-card-reduced> on the MapPage.
 */
export default {
  props: {
    result: Object,
  }
}
</script>

<style>

</style>