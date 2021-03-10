<template>
  <div id="app-content">
    <div class="do-list">
      <div class="block do-list-item" v-for="item in 10" :key="item">
        <div class="container">
          <div class="notification">
            This container is <strong>centered</strong> on desktop and larger
            viewports.
          </div>
        </div>
      </div>
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
#app-content {
  background-color: hsl(0, 0%, 90%);
  padding: 0.1rem;
  .do-list-item {
    margin: 0.4rem;
  }
}
</style>
