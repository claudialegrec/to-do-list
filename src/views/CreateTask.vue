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
            v-for="(task, index) in getCreatedTasks"
            :key="task.taskId"
            v-bind:class="{ danger: task.status === 'DONE' }"
        >
          <taskComponent
            :name="task.name"
            :index="index"
            v-on:Delete="deleteTask"
            @Change="changeStatus"
          ></taskComponent>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // Libraries
 //import axios from 'axios';
  import {mapGetters} from "vuex";

  // Components
  import createTaskInput from '../components/createTaskInput';
  import taskComponent from '../components/taskComponent';

  export default {
  name: "CreateTask",
  data() {
    return {
      newTask:"",
      taskList:[]
    }
  },
    computed:{
      ...mapGetters('tasks',[
          "getCreatedTasks"
      ])
    },
    components: {
      createTaskInput,
      taskComponent
    },
    methods: {
      assignTaskValue(value){
        this.newTask = value;
      },
      async addTask(){

        const newTask = {
          name: this.newTask,
          status: "NEW",
        };

         await this.$store.dispatch("tasks/addTask", newTask);
         this.newTask = "";
       

      },
      generateID() {
        const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        return randLetter + Date.now();
      },
      async deleteTask(taskIndex){
          console.log(taskIndex)
          await this.$store.dispatch("tasks/deleteTask", {taskIndex: taskIndex, taskType: "NEW"})
      },
      async changeStatus(taskIndex){
          await this.$store.dispatch("tasks/changeStatus", {taskIndex: taskIndex, taskType: "NEW"});
      },
      async getAllTasks(){

        const createdTasks = this.$store.getters["tasks/getCreatedTasks"];

        if (createdTasks && createdTasks.length === 0) {
          await this.$store.dispatch("tasks/getAllTasks", "NEW");
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
