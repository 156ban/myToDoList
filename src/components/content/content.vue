<template>
  <div id="app-content">
    <draggable
      v-model="myArray"
      group="people"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      handle=".handle"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <div class="block do-list-item" v-for="item in myArray" :key="item.id">
          <div class="container">
            <div class="notification">
              <radio-custom v-model="item.status"></radio-custom>
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
  </div>
</template>

<script>
import draggable from "vuedraggable";
import radioCustom from "../elements/radio.vue";

export default {
  name: "HelloWorld",
  components: {
    draggable,
    radioCustom
  },
  props: {
    msg: String,
  },
  data() {
    return {
      myArray: [
        { id: 1, text: "1" , status: false},
        { id: 2, text: "2" , status: false},
        { id: 3, text: "3" , status: false},
        { id: 4, text: "4" , status: false},
        { id: 5, text: "5" , status: false},
        { id: 6, text: "6" , status: false},
        { id: 7, text: "7" , status: false},
        { id: 8, text: "8" , status: false},
        { id: 9, text: "9" , status: false},
        { id: 10, text: "10" , status: false},
      ],
      drag: false,
      activeItem: null,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  watch: {},
  methods: {
    addItem() {
      this.myArray.push({ id: Symbol(), status: false, test: "新事件" });
    },
    delItem(index) {
      this.myArray.splice(index, 1);
    },
    saveData() {
      localStorage.setItem("myArray", JSON.stringify(this.myArray));
    },
  },
  created() {
    const data = JSON.parse(localStorage.getItem("myArray"));
    if (data) {
      this.myArray = data;
    }

    window.removeEventListener("beforeunload", (e) => this.saveData(e));
    window.removeEventListener("unload", (e) => this.saveData(e));

    window.addEventListener("beforeunload", (e) => this.saveData(e));
    window.addEventListener("unload", (e) => this.saveData(e));
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
}
</style>
