<template>
  <div class="main-page">
    <div class="nav-bar">
      <navBar></navBar>
    </div>
    <div class="content">
      <content-tmp></content-tmp>
    </div>
  </div>
</template>

<script>
import navBar from "./nav/navBar";
import contentTmp from "./content/content";

export default {
  name: "mainPage",
  components: {
    navBar,
    contentTmp,
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.main-page {
  color: $primary;
  .nav-bar {
    height: 3.25rem;
  }
  .content {
    height: calc(100vh - 3.25rem);
    background-color: hsl(0, 0%, 90%);
    overflow-y: auto;
  }
}
</style>
