<template>
  <div class="radio-custom" @click="changeValue">
    <div class="radio-custom-inner" :class="{'inner-color': value}"></div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    value: Boolean
  },
  data() {
    return {
      isOpenMenue: false,
    };
  },
  watch: {},
  methods: {
      changeValue() {
          this.$emit('input',!this.value);
      }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.radio-custom {
  position: absolute;
  border: 0.1rem solid $primary;
  height: 1.2rem;
  width: 1.2rem;
  left: 0.2rem;
  padding: 0.1rem;
  top: 0.2rem;
  border-radius: 0.2rem;

  .radio-custom-inner {
    width: 100%;
    height: 100%;
    border-radius: 0.2rem;
  }

  .inner-color {
    background: $primary;
  }
}
</style>
