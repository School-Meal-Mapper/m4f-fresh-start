<template>
  <div class="tag-list">
    <tag-oval
      v-for="(tag, index) in includedTags"
      v-bind:key="index"
      :value="tag.value"
      :subvalue="tag.subvalue"
    />
  </div>
</template>

<script>
import TagOval from "@/components/TagOval.vue";

export default {
  components: { TagOval },
  props: {
    result: Object, // meal site result object, pass this in and it will generate a list of tags in a div
  },
  computed: {
    includedTags: function () {
      const validTagNames = Object.keys(this.result.tags).filter((key) => {
        // find which tags are checked/have non empty lists
        return this.result.tags[key];
      });
      let include = [];
      validTagNames.forEach((tagName) => {
        if (Array.isArray(this.result.tags[tagName])) {
          this.result.tags[tagName].forEach((subtag) => {
            include.push({ value: tagName, subvalue: subtag });
          });
        } else {
          include.push({ value: tagName });
        }
      });
      return include;
    },
  },
};
</script>

<style>
.tag-list {
}
</style>
