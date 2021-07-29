<template>
  <div id="faqs" class="page">
    <h3>About Free Meals</h3>
    <p>Connect with your local meal provider for more information on free meals.</p>
    <ul class="fa-ul contact-list">
      <li class="fa-li" v-if="contact.phone">
        <i class="fas fa-phone-alt" /><a :href="`tel:${contact.phone}`">{{ `${contact.person}, ${contact.phone}` }}</a>
      </li>
      <li class="fa-li" v-if="contact.sponsor_site">
        <i class="fas fa-globe" /><a :href="contact.sponsor_redirect">{{ contact.sponsor_site }}</a>
      </li>
      <li class="fa-li" v-if="contact.facebook">
        <i class="fab fa-facebook" /><a :href="contact.facebook">{{ contact.facebook }}</a>
      </li>
      <li class="fa-li" v-if="contact.twitter">
        <i class="fab fa-twitter" /><a :href="`https://www.twitter.com/${contact.twitter}`">{{ '@' + contact.twitter }}</a>
      </li>
      <li class="fa-li" v-if="contact.instagram">
        <i class="fab fa-instagram" /><a :href="`https://www.instagram.com/${contact.instagram}`">{{ '@' + contact.instagram }}</a>
      </li>
    </ul>

    <div class="accordion" role="tablist" v-if="qnas">
      <b-card no-body class="mb-1 backgroundless" v-for="(qna, index) in qnas" v-bind:key="index">
        <b-card-header header-tag="header" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle="'accordion-' + index.toString()" class="font-weight-bold question">
            {{ qna[`${$i18n.locale}_question`] || qna.en_question }}
          </b-button>
        </b-card-header>
        <b-collapse :id="'accordion-' + index.toString()" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              {{ qna[`${$i18n.locale}_answer`] || qna.en_answer }}
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import Backend from '@/backend.js';
export default {
  data() {
    return {
      isLoading: true,
      qnas: [],
      contact: {}
    };
  },
  async mounted() {
    this.contact = await Backend.getProviderInfo(this.$route.params.sponsor);
    this.qnas = await Backend.getFaq(this.$route.params.sponsor);
    console.log(this.qnas, 'the object received');
    console.log(this.$i18n.locale);
  }
};
</script>

<style lang="scss">
#faqs {
  text-align: center;
  flex-grow: 1;
  margin: 20px;
  @media (max-width: 768px) {
    margin: 10px;
  }
}

#faqs h3 {
  margin: 15px auto;
  font-weight: bold;
}

.contact-list {
  width: 80%;
  margin: 0 auto;
}

.contact-list li {
  width: 100%;
  margin: 5px auto;
}

.contact-list i {
  padding-right: 0.6em;
  font-size: 1.3em;
}

.btn-block {
  color: #313639 !important;
  @media (prefers-color-scheme: dark) {
    color: #f8f8f8 !important;
  }
}

.btn-block:hover {
  color: var(--nav-link-light) !important;
  @media (prefers-color-scheme: dark) {
    color: var(--nav-link-dark) !important;
  }
}

.backgroundless {
  background-color: rgba(0, 0, 0, 0);
  border: none;
}

.question {
  // outline-style: solid;
  // outline-color: #dcdcdc;
  // outline: solid #dcdcdc;
  border: 2px solid #dcdcdc;
  background-color: white;
  @media (prefers-color-scheme: dark) {
    color: #f8f9fa !important; // same as bootstrap's gray-100
  }
}

.question:hover {
  background-color: var(--banner-light);
  outline-style: solid;
  outline-color: black;
  @media (prefers-color-scheme: dark) {
    background-color: var(--banner-dark);
  }
}
.question[aria-expanded='false'] {
  &::after {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f067';
    margin-left: 15px;
  }
}
.question[aria-expanded='true'] {
  &:after {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f068';
    margin-left: 15px;
  }
}
</style>
