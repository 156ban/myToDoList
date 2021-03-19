<template>
  <div id="app-content">
    <draggable v-model="myArray" group="people" v-bind="dragOptions" @start="drag = true" @end="drag = false" handle=".handle">
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <div class="block do-list-item" v-for="item in myArray" :key="item.id">
          <div class="container">
            <div class="notification">
              <input type="radio" class="radio" />
              <span>
                <textarea class="textarea has-fixed-size is-small item-input" v-model="item.name"></textarea>
              </span>
              <div class="drag-area handle"></div>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'HelloWorld',
  components: {
    draggable,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      myArray: [
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
        { id: 4, name: '4' },
        { id: 5, name: '5' },
        { id: 6, name: '6' },
        { id: 7, name: '7' },
        { id: 8, name: '8' },
        { id: 9, name: '9' },
        { id: 10, name: '10' },
      ],
      drag: false,
      activeItem: null,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
  },
  watch: {},
  methods: {
    addItem() {
      this.myArray.push({ id: Symbol(), status: false, test: '新事件' });
    },
    delItem(index) {
      this.myArray.splice(index, 1);
    },
    saveData() {
      localStorage.setItem('myArray', JSON.stringify(this.myArray));
    },
  },
  created() {
    const data = JSON.parse(localStorage.getItem('myArray'));
    console.log(data);
    if (data) {
      this.myArray = data;
    }

    window.removeEventListener('beforeunload', (e) => this.saveData(e));
    window.removeEventListener('unload', (e) => this.saveData(e));

    window.addEventListener('beforeunload', (e) => this.saveData(e));
    window.addEventListener('unload', (e) => this.saveData(e));
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

  .radio {
    position: absolute;
    width: 1rem;
    height: 1rem;
    left: 0.5rem;
    top: 0.5rem;
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
    height: 4rem;
    min-height: 0;
  }
}
</style>
