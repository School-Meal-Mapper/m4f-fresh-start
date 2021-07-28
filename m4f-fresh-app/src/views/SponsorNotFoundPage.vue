<template>
  <div class="home">
    <h1>Looks like [this sponsor] isn't on our site yet.</h1>
    <h2>Want to see them on Meals for Families?</h2>
    <br />
    <!-- white rounded container for email text, Your Name input, and Send Email button -->
    <b-container class="emailContainer">
      <h2 style="color: #000000; padding-top: 10px">Let them know by sending them the email below!</h2>
      <div class="row">
        <div class="col-sm-6 form-group">
          <label for="name" style="color: black;">
              Your Name:</label>
          <input type="text" class="form-control" id="name" name="name" required>
        </div>
      </div>
      <p id="emailText" style="border:2px; border-style:solid; border-color:#ced4da; padding: 1em;">
        Dear [this sponsor],
        I am a [student or parent/guardian] in your area who is interested in finding meal sites near me. I ask that you consider contacting Meals 4 Families to join their site to make it easier for families in your area to find free meal sites.
        <br />
        <br />
        Best,
        <br />
        [Your Name] 
      </p>
      <div style="text-align: center;">
        <!-- href to emailLink() enclosed in <a> since it would not work in button href -->
        <b-button class="mffGenButton">
        <a :href="emailLink()" style="color: black;">Send Email</a>
        </b-button>
      </div>
    </b-container>
  </div>
</template>
<script>
import { emailLink } from '../utilities'
export default {
  name: 'sponsor-not-found-page',
  components: {},
  methods: {
    emailLink: emailLink
  }
}
</script>
<style>
<style lang="scss" > .root {
  --primary-color: "#1D6363";
  --banner-light: "#1D6363";
  --banner-dark: "#1B3C65";
  --nav-link-light: "#F8F8F8";
  --nav-link-dark: "#F8F8F8";
  --accentColor: "#ff4a3";
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
  border-radius: .25rem!important;
}

.emailContainer {
  background-color: #ffffff;
  border: 1 px solid #ced4da;
  border-radius: .25rem!important;
  height: 400px;
  padding: 25px;
}

</style>
