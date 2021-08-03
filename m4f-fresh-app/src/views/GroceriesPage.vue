<template>
  <div class="questionsList" role="tablist">
    <h1 class="grocTitle">Groceries Page</h1>
    <div class="questionsList" role="tablist">
      <b-card no-body class="mb-1 backgroundless">
        <b-card-header header-tag="P-EBT" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel1 class="font-weight-bold question"> What is P-EBT? </b-button>
        </b-card-header>
        <b-collapse id="tabpanel1">
          <b-card-body>
            <b-card-text>
              Because of the Covid-19 pandemic, many children who depended on their schools for breakfast and lunch had to switch to remote
              learning. P-EBT (or Pandemic Electronic Benefits Transfer) is a program that helps families provide their children with the
              meals that their children would have gotten in school. In June 2021, this program was extended through the end of Summer 2021.
            </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="Eligibility" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel2 class="font-weight-bold question"> How do I know if my child is eligible? </b-button>
        </b-card-header>
        <b-collapse id="tabpanel2">
          <b-card-body>
            <b-card-text>
              Children over the age of 6 are eligible for P-EBT and automatically enrolled in P-EBT if:
              <ul>
                <li>
                  They went to a Community Eligibility Provision (CEP) school that provides free meals for all students throughout all of
                  May 2021
                </li>
                or
                <li>They participated in their school’s free or reduced price meals program throughout all of May 2021</li>
              </ul>
              Children younger than 6 are eligible for P-EBT and automatically enrolled in P-EBT if:
              <ul>
                <li>They received SNAP or Food Stamps during May 2021.</li>
              </ul>
              You are still eligible and will receive your P-EBT payment in September (instead of July) if:
              <ul>
                <li>You sign your child up for free or reduced meals between May and August 2021.</li>
                <li>You sign up for SNAP during summer 2021.</li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="Apply" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel3 class="font-weight-bold question"> How do I apply for P-EBT? </b-button>
        </b-card-header>
        <b-collapse id="tabpanel3">
          <b-card-body>
            <b-card-text>
              There is no direct application for P-EBT. To apply for P-EBT, you need to apply for free and reduced meals through your
              child’s school. There are many different applications for the free and reduced meal program, and they vary between schools.
              Ask your child’s school for a paper application or a link to their online portal.
            </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="Enroll" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel4 class="font-weight-bold question">
            How do I enroll my child to receive P-EBT benefits?
          </b-button>
        </b-card-header>
        <b-collapse id="tabpanel4">
          <b-card-body>
            <b-card-text>
              Your child is automatically enrolled to receive P-EBT benefits if:
              <ul>
                <li>Your child is 6 or older and currently receives free or reduced priced meals at school.</li>
                <li>Your child is 6 or younger and currently receives SNAP benefits.</li>
              </ul>
              Otherwise, you can apply for P-EBT benefits for your child by:
              <ul>
                <li>Enrolling your child in the Free and Reduced Price Lunch program through their school (for children 6 and older).</li>
                <li>Enroll your child in SNAP (for children 6 and younger).</li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="Payment" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel5 class="font-weight-bold question"> When would I get my P-EBT payment? </b-button>
        </b-card-header>
        <b-collapse id="tabpanel5">
          <b-card-body>
            <b-card-text>
              If your child received free or reduced meals or went to a school that provided free meals for all of its students during May
              2021, you will receive your payment in late July 2021. If your child becomes eligible between June - August, then you will
              receive your payment in September 2021.
            </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="Money" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel6 class="font-weight-bold question"> How much money would I receive with P-EBT? </b-button>
        </b-card-header>
        <b-collapse id="tabpanel6">
          <b-card-body>
            <b-card-text> Answer </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="Activate" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel7 class="font-weight-bold question"> How do I activate my P-EBT card? </b-button>
        </b-card-header>
        <b-collapse id="tabpanel7">
          <b-card-body>
            <b-card-text> Answer </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="PreviousEBT" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel8 class="font-weight-bold question"> What if I already use EBT? </b-button>
        </b-card-header>
        <b-collapse id="tabpanel8">
          <b-card-body>
            <b-card-text> Your child’s P-EBT payment will go directly into your EBT account and you can use the same card. </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroceriesPage',
  components: {}
};
</script>

<style lang="scss">
.questionsList {
  text-align: center;
  flex-grow: 1;
  margin: 20px;
  @media (max-width: 768px) {
    margin: 10px;
  }
}

.questionsList > .grocTitle {
  margin: 10px auto;
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
  border: 2px solid #dcdcdc;
  background-color: white;
  @media (prefers-color-scheme: dark) {
    color: #f8f9fa !important;
    background-color: #000000;
  }
}
p.card-text {
  text-align: left;
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
