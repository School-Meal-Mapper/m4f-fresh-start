<template>
  <div>
    Welcome to the the Free Meals Info! Here we have info for
    {{ this.$route.params.sponsor }}.
    <h1>Learn free meals page.</h1>
    <b-list-group>
      <b-list-group-item href="#" active class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Learn more about free meals</h5>
          <small>3 days ago</small>
        </div>

        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>

        <small>Donec id elit non mi porta.</small>
      </b-list-group-item>

      <b-list-group-item href="#" class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Learn more about free meals</h5>
          <small class="text-muted">3 days ago</small>
        </div>

        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>

        <small class="text-muted">Donec id elit non mi porta.</small>
      </b-list-group-item>

      <b-list-group-item href="#" disabled class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Disabled List group item</h5>
          <small class="text-muted">3 days ago</small>
        </div>

        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>

        <small class="text-muted">Donec id elit non mi porta.</small>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: 'LearnFreeMealsPage',
  components: {}
};
</script>

<style></style>
