<template>
  <div class="checkbox">
    <span class="close">
      <i class="fa fa-times" v-on:click="emitDelete(index)"></i>
    </span>
    <label>
      <span class="checkbox-mask"></span>
      <input type="checkbox" v-on:click="emitChangeStatus(index)">
      {{ name }}
    </label>
  </div>
</template>

<script>
export default {
  name: "TaskComponent",
  props: {
    name: {
      type: String
    },
    index: {
      type: Number
    }

  },
  methods: {
    emitDelete(index){
      this.$emit("Delete", index);
    },
    emitChangeStatus(index){
      this.$emit("Change", index);
    }
  }
}
</script>

<style scoped>

</style>
