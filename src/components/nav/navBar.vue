<template>
  <nav class="navbar is-warning app-navbar" role="navigation" aria-label="main navigation" id="app-navbar">
    <div class="navbar-brand">
      <div class="navbar-item">
        <span class="title-text">toDoList</span>
      </div>

      <a role="button" class="navbar-burger" @click="isOpenMenue = !isOpenMenue">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" style="display: block" v-show="isOpenMenue">
      <div class="navbar-start" ref="menu" @click="isOpenMenue = false">
        <a class="navbar-item" @click="changePage(0)"> 未完成 </a>
        <a class="navbar-item" @click="changePage(1)"> 已完成 </a>
        <a class="navbar-item" @click="changePage(2)"> 全部 </a>
      </div>
    </div>
  </nav>
</template>

<script>
import bus from '@/utils/bus';
import { isParent } from '@/utils/dom';

export default {
  props: {
    msg: String,
  },
  data() {
    return {
      isOpenMenue: false,
    };
  },
  watch: {
    isOpenMenue(val) {
      if (val) {
        document.addEventListener('click', this.closeOption, true);
      }
    },
  },
  methods: {
    changePage() {
      bus.$emit('change-page', 0); //0:未完成，1:已完成，2：全部
    },
    closeOption(e) {
      this.isOpenMenue = false;
      document.removeEventListener('click', this.closeOption, true);
      let dom = this.$refs.menu;
      if (!isParent(e.target, dom)) {
        if (e && e.stopPropagation) {
          e.stopPropagation();
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#app-navbar {
  .title-text {
    font-size: 1.2rem;
    font-weight: 800;
    color: $primary;
  }

  .navbar-menu {
    position: absolute;
    width: 100%;
  }
}
</style>
