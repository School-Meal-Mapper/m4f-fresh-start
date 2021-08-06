<template>
  <div class="questionsList" role="tablist">
    <h1 class="learnTitle">Learn More About Free Meals</h1>
    <p>
      Having a healthy breakfast and lunch is an important part of the school day for all children. The National School Lunch Program
      supports families by offering free and reduced-price breakfast and lunch to children attending school. All families are welcome to
      apply to receive free or reduced price meals. Some families will qualify based on their participation in federal assistance programs.
      Some children are eligible based on their status. For other families, eligibility is determined by income.
    </p>
    <div class="questionsList" role="tablist">
      <b-card no-body class="mb-1 backgroundless">
        <b-card-header header-tag="header" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel1 class="font-weight-bold question">
            Is my child eligible for free or reduced-price meals during the school year?
          </b-button>
        </b-card-header>
        <b-collapse id="tabpanel1">
          <b-card-body>
            <b-card-text>
              All families are welcome to apply to receive free or reduced price meals. Eligibility is determined by income. You may use the
              chart below to see if your family qualifies for free or reduced price meals. People that already qualify for free or reduced
              price meals:
              <ul>
                <li>Families receiving SNAP, FDPIR, or TANF benefits.</li>
                <li>Foster children that are under the legal responsibility of a foster care agency or court.</li>
                <li>Children that participate in the Head Start program.</li>
                <li>Children that meet the definition of homeless, runaway, or migrant.</li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="header" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel2 class="font-weight-bold question">
            Do I need to fill out an application for each child?
          </b-button>
        </b-card-header>
        <b-collapse id="tabpanel2">
          <b-card-body>
            <b-card-text>
              No, each family only needs to fill out one application. Be sure to include all of the children in your household on the
              application. Fill out the application completely, as partially filled out applications cannot be approved.
            </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="header" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel3 class="font-weight-bold question">
            Should I fill out an application if I received a letter this school year saying my children are already approved for free meals?
          </b-button>
        </b-card-header>
        <b-collapse id="tabpanel3">
          <b-card-body>
            <b-card-text>
              No, but please read the letter carefully and follow any instructions enclosed. If any children from your family weren’t
              included in the notification letter, contact your school.
            </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="header" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel4 class="font-weight-bold question">
            My child’s application was approved last year. Do I need to fill out a new one?
          </b-button>
        </b-card-header>
        <b-collapse id="tabpanel4">
          <b-card-body>
            <b-card-text>
              Yes, families must fill out a new application every school year. If your family does not fill out a new application, your
              child will be charged full price for school meals.
            </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="header" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel5 class="font-weight-bold question"> I get WIC. Can my children get free meals? </b-button>
        </b-card-header>
        <b-collapse id="tabpanel5">
          <b-card-body>
            <b-card-text>
              Families who receive WIC may qualify for free or reduced price meals. Fill out an application to see if your family also
              qualifies for free and reduced price meals.
            </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="header" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel6 class="font-weight-bold question"> Who will see the information I provide? </b-button>
        </b-card-header>
        <b-collapse id="tabpanel6">
          <b-card-body>
            <b-card-text>
              Information your family provides will be checked by ____. Families may be asked to provide proof of household income.
            </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="header" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel7 class="font-weight-bold question"> If I don’t qualify now, can I reapply later? </b-button>
        </b-card-header>
        <b-collapse id="tabpanel7">
          <b-card-body>
            <b-card-text> Yes, families can apply for free or reduced price lunch at any time throughout the school year. </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="header" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel8 class="font-weight-bold question">
            What if I disagree with the school’s decision about my application?
          </b-button>
        </b-card-header>
        <b-collapse id="tabpanel8">
          <b-card-body>
            <b-card-text> Contact the director of your School Nutrition Office. </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="header" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel9 class="font-weight-bold question">
            Can I apply if someone in my family is not a U.S. citizen?
          </b-button>
        </b-card-header>
        <b-collapse id="tabpanel9">
          <b-card-body>
            <b-card-text>
              Yes, everyone is welcome to apply for free and reduced price meals regardless of documentation status.
            </b-card-text>
          </b-card-body>
        </b-collapse>
        <b-card-header header-tag="header" class="p-1 backgroundless" role="tab">
          <b-button block v-b-toggle.tabpanel10 class="font-weight-bold question">
            Do military families report income differently?
          </b-button>
        </b-card-header>
        <b-collapse id="tabpanel10">
          <b-card-body>
            <b-card-text>
              Basic pay, cash bonuses, and cash value allowances must be reported as income. Housing paid for by the Military Housing
              Privatization Initiative is not included in household income. Additional combat pay resulting from deployment is not included
              in household income.
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LearnFreeMealsPage',
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

.questionsList > .learnTitle {
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
