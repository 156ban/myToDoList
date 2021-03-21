<template>
  <div class="drawer">
      <slot>

      </slot>
  </div>
</template>

<script>
export default {

  data() {
    return {
    };
  },
  watch: {},
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.drawer {
 width: 100%;
 position: fixed;
 bottom: 0;
 background-color: #fff;
}
</style>
