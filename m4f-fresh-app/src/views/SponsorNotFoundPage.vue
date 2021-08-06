<template>
  <div class="page" id="SNFPage">
    <h1 style="margin: 25px">
      Looks like <strong>{{ $route.params.sponsorname }}</strong> isn't on our site yet.
    </h1>
    <h2>Want to see them on Meals for Families?</h2>
    <br />
    <!-- white rounded container for email text, Your Name input, and Send Email button -->
    <div class="emailContainer">
      <h2 style="color: #000000; padding-top: 10px">Let them know by sending them the email below!</h2>
      <div class="row">
        <div class="col-sm-6 form-group">
          <label for="name" style="color: black"> Your Name:</label>
          <input type="text" class="form-control" v-model="yourName" />
        </div>
      </div>
      <p id="emailText" style="border: 2px; border-style: solid; border-color: #ced4da; padding: 1em">
        Dear {{ $route.params.sponsorname }} Nutrition Team,
        <br />
        I am a parent in your area who is interested in finding meal sites near me. I ask that you consider contacting Meals 4 Families to
        join their site to make it easier for families in your area to find free meal sites.
        <br />
        <br />
        Best,
        <br />
        {{ yourName }}
      </p>
      <div style="text-align: center">
        <!-- button that opens pre-filled email to send to sponsors -->
        <b-button class="mffGenButton" :href="emailLink(yourName)" style="color: black">Send Email</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import { emailLink } from '../utilities';
export default {
  name: 'sponsor-not-found-page',
  components: {},
  data() {
    return {
      yourName: ''
    };
  },
  methods: {
    emailLink: emailLink
  }
};
</script>
<style>
<style lang='scss' > .root {
  --primary-color: '#1D6363';
  --banner-light: '#1D6363';
  --banner-dark: '#1B3C65';
  --nav-link-light: '#F8F8F8';
  --nav-link-dark: '#F8F8F8';
  --accentColor: '#ff4a3';
}

#SNFPage {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  color: var(--accentColor);
  background-color: var(--banner-light);
  @media (prefers-color-scheme-dark) {
    color: #ffffff !important;
    background-color: #000000 !important;
  }
}

.mffGenButton {
  color: #000000;
  background-color: var(--accentColor);
  box-shadow: 0px 2px 2px;
  border: none;
}

#emailText {
  color: black;
  text-align: left;
  border: 5 px;
  border-color: solid red;
  padding: 1em;
  border-radius: 0.25rem !important;
}

@media (max-width: 768px) {
  .emailContainer {
    background-color: #ffffff;
    border: 1 px solid #ced4da;
    border-radius: 0.25rem !important;
    padding: 25px;
    height: 570px;
    margin-left: 25px;
    margin-right: 25px;
  }
}

@media (min-width: 768px) {
  .emailContainer {
    background-color: #ffffff;
    border: 1 px solid #ced4da;
    border-radius: 0.25rem !important;
    padding: 25px;
    height: 500px;
    margin-left: 100px;
    margin-right: 100px;
  }
}
</style>
