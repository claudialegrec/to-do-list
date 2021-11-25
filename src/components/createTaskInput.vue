<template>
  <div class="add-control">
    <div class="form-group has-feedback">
      <input
          v-on:keyup.enter="emitCreateTaskEvent"
          type="text"
          class="form-control"
          placeholder="✍️ Add item..."
          v-on:input="$emit('input', $event.target.value)"/>
      <i
          v-on:click="emitCreateTaskEvent"
          class="fa fa-plus form-control-feedback add-btn"
          title="Add item"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "createTaskInput",
  methods: {
    emitCreateTaskEvent(){
      this.$emit("AddTask")
    }
  }
}
</script>

<style scoped>

</style>
