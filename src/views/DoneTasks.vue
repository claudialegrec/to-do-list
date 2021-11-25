<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 col-xs-6 col-xs-offset-3">

      <createTaskInput
          v-on:input="assignTaskValue"
          v-on:AddTask="addTask"
      ></createTaskInput>

      <p class="err text-danger text-center hidden"><i class="fa fa-warning"></i> Oops! Please, enter name item</p>
      <p class="no-items text-muted text-center hidden"><i class="fa fa-ban"></i></p>
      <ul class="todo-list">
        <li
            v-for="(task, index) in getDoneTasks"
            :key="task.taskId"
            v-bind:class="{ danger: task.status === 'DONE' }"
        >
          <div class="checkbox">
            <span class="close">
              <i class="fa fa-times" v-on:click="deleteTask(index)"></i>
            </span>
            <label>
              <span class="checkbox-mask"></span>
              <input type="checkbox" v-on:click="changeStatus(index)">
              {{task.name}}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

// Components
import createTaskInput from '../components/createTaskInput';

export default {
name: "DoneTasks",
  data() {
    return {
      newTask:"",
      taskList:[]
    }
  },
  computed:{
    ...mapGetters('tasks',[
      "getDoneTasks"
    ])
  },
  components: {
    createTaskInput
  },
  methods: {
    assignTaskValue(value){
      this.newTask = value;
    },
    async addTask(){
      
      const newTask = {
        name: this.newTask,
        status: "DONE",
      };

      if (this.newTask !== ""){
        // add task to server
        await this.$store.dispatch("tasks/addTask", newTask);
         this.newTask = "";
      }

    },
    generateID() {
      const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      return randLetter + Date.now();
    },
    async deleteTask(taskIndex){
        await this.$store.dispatch("tasks/deleteTask", {taskIndex: taskIndex, taskType: "DONE"})
    },
    async changeStatus(taskIndex){
      await this.$store.dispatch("tasks/changeStatus", {taskIndex: taskIndex, taskType: "DONE"});
    },
    async getAllTasks() {

      const createdTasks = this.$store.getters["tasks/getDoneTasks"];

      if (createdTasks && createdTasks.length === 0) {
        await this.$store.dispatch("tasks/getAllTasks", "DONE");
      }
    }
  },
  created() {
    this.getAllTasks();
  }
}
</script>

<style scoped>

</style>
