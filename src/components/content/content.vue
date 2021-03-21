<template>
  <div id="app-content">
    <draggable
      v-model="doneArray"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      handle=".handle"
      v-if="pageStatus === 1 || pageStatus === 2"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <div
          class="block do-list-item"
          v-for="item in doneArray"
          :key="item.id"
        >
          <div
            class="container"
            @touchstart="onMousedown(item.id)"
            @touchmove="onMouseup"
            @touchend="onMouseup"
          >
            <div class="notification">
              <radio-custom
                :value="true"
                @click.native="changeStatus(false, item.id)"
              ></radio-custom>
              <pre class="pre">{{ item.text }}</pre>
              <textarea
                class="textarea has-fixed-size is-small item-input"
                v-model="item.text"
              ></textarea>
              <div class="drag-area handle"></div>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
    <draggable
      v-model="toDoArray"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      handle=".handle"
      v-if="pageStatus === 0 || pageStatus === 2"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <div
          class="block do-list-item"
          v-for="item in toDoArray"
          :key="item.id"
        >
          <div
            class="container"
            @touchstart="onMousedown(item.id)"
            @touchmove="onMouseup"
            @touchend="onMouseup"
          >
            <div class="notification">
              <radio-custom
                :value="false"
                @click.native="changeStatus(true, item.id)"
              ></radio-custom>
              <pre class="pre">{{ item.text }}</pre>
              <textarea
                class="textarea has-fixed-size is-small item-input"
                v-model="item.text"
              ></textarea>
              <div class="drag-area handle"></div>
            </div>
          </div>
        </div>
        <div class="block do-list-item add-item" :key="-1">
          <button class="button is-success" @click="addItem">ADD</button>
        </div>
      </transition-group>
    </draggable>
    <drawer v-show="showDrawer">
      <div class="drawer-item button has-text-danger" @click="delItem">
        删除
      </div>
      <div class="drawer-item button" @click="showDrawer = false">取消</div>
    </drawer>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import radioCustom from "../elements/radio.vue";
import drawer from "../elements/drawer.vue";
import bus from "@/utils/bus";

export default {
  name: "HelloWorld",
  components: {
    draggable,
    radioCustom,
    drawer,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      toDoArray: [],
      doneArray: [],
      drag: false,
      activeItem: null,
      pageStatus: 0, //0:未完成，1:已完成，2：全部
      drawer: true,
      direction: "btt",
      targetId: null,
      timer: null,
      showDrawer: false,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  watch: {},
  methods: {
    addItem() {
      const id = this.getNewId();
      this.toDoArray.push({ id, text: "新事件" });
    },
    delItem() {
      this.showDrawer = false;
      for (let key in this.toDoArray) {
        if (this.toDoArray[key].id === this.targetId) {
          this.toDoArray.splice(key, 1);
          return;
        }
      }
      for (let key in this.doneArray) {
        if (this.doneArray[key].id === this.targetId) {
          this.doneArray.splice(key, 1);
          return;
        }
      }
    },
    saveData() {
      localStorage.setItem("toDoArray", JSON.stringify(this.toDoArray));
      localStorage.setItem("doneArray", JSON.stringify(this.doneArray));
    },
    getNewId() {
      for (let i = 0; i < 10000; i++) {
        if (
          !this.toDoArray.some((item) => item.id === i) &&
          !this.doneArray.some((item) => item.id === i)
        ) {
          return i;
        }
      }
    },
    changeStatus(isDone, id) {
      if (isDone) {
        for (let key in this.toDoArray) {
          if (this.toDoArray[key].id === id) {
            this.doneArray.push(this.toDoArray[key]);
            this.toDoArray.splice(key, 1);
            break;
          }
        }
      } else {
        for (let key in this.doneArray) {
          if (this.doneArray[key].id === id) {
            this.toDoArray.push(this.doneArray[key]);
            this.doneArray.splice(key, 1);
            break;
          }
        }
      }
    },

    onMousedown(id) {
      this.timer = setTimeout(() => {
        this.targetId = id;
        this.showDrawer = true;
      }, 1000);
    },
    onMouseup() {
      console.log(2222);
      clearTimeout(this.timer);
    },
  },
  created() {
    this.toDoArray = JSON.parse(localStorage.getItem("toDoArray")) || [];
    this.doneArray = JSON.parse(localStorage.getItem("doneArray")) || [];

    window.removeEventListener("beforeunload", (e) => this.saveData(e));
    window.removeEventListener("unload", (e) => this.saveData(e));

    window.addEventListener("beforeunload", (e) => this.saveData(e));
    window.addEventListener("unload", (e) => this.saveData(e));

    bus.$on("change-page", (value) => {
      this.pageStatus = value;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#app-content {
  background-color: hsl(0, 0%, 90%);
  padding: 0.1rem;
  margin-bottom: 8rem;
  .do-list-item {
    margin: 0.4rem;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .radio-custom {
    position: absolute;
    left: 0.2rem;
    top: 0.2rem;
    z-index: 2;
  }

  .drag-area {
    position: absolute;
    width: 2.5rem;
    height: 5.4rem;
    right: 0;
    bottom: 0;
  }

  .item-input {
    border: none;
    background-color: transparent;
    box-shadow: none;
    color: $primary;
    font-size: 1.2rem;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    outline: 0;
    resize: none;
    min-height: 2rem;
    padding: 1.25rem 2.5rem 1.25rem 1.5rem;
  }

  pre {
    display: block;
    visibility: hidden;
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
    min-height: 2rem;
  }

  .add-item {
    .button {
      height: 3rem;
      line-height: 3rem;
      padding: 0;
      font-size: 1.2rem;
      width: 100%;
    }
  }
  .drawer-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
  }
}
</style>
