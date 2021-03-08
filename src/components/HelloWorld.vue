<template>
  <div class="hello">
    <div class="columns is-mobile" v-for="item in 10" :key="item">
      <div class="column is-one-quarter list-item">
        <code>is-one-quarter</code>
      </div>
      <div class="column list-item">Auto</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.hello {
}
</style>
