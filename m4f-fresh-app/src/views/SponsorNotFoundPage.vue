<template>
  <div class="home">
    <h1>Looks like [this sponsor] isn't on our site yet.</h1>
    <h2>Want to see them on Meals for Families?</h2>
    <br />
    <b-container class="emailContainer">
      <h2 style="color: #000000; padding-top: 10px">Let them know by sending them the email below!</h2>
      <b-container class="emailTextContainer">
        <p class="genText">
          Dear [this sponsor],
          I am a [student or parent/guardian] in your area who is interested in finding meal sites near me. I ask that you consider contacting Meals 4 Families to join their site to make it easier for families in your area to find free meal sites.
          <br />
          <br />
          Best,
          <br />
          [user name] 
        </p>
      </b-container>
    </b-container>
  </div>
</template>
<script></script>
<style>
<style lang="scss" > .root {
  --primary-color: "#1D6363";
  --banner-light: "#1D6363";
  --banner-dark: "#1B3C65";
  --nav-link-light: "#F8F8F8";
  --nav-link-dark: "#F8F8F8";
  --accentColor: "#ff4a3";
}

.genText {
  color: black;
  text-align: left;
  border: 2 px; 
  border-color: solid red;
  padding: 1em;
  border-radius: .25rem!important;
}

.emailContainer {
  background-color: #ffffff;
  border: 1 px solid #ced4da;
  border-radius: .25rem!important;
  height: 200px;
}

.emailTextContainer {
  border: 1 px solid #ced4da;
  border-radius: .25rem!important;
}
</style>
