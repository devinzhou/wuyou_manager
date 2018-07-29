<template>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="评论管理" name="first">
        <component-manage-comment/>
      </el-tab-pane>
      <el-tab-pane label="反馈管理" name="second">
        <component-manage-feedback/>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
</template>

<script>
import ComponmentManage from './componnet-manage-comment.vue';
import ComponmentFeedback from './componnet-manage-feedback.vue';
export default {
  data() {
      return {
          activeName2: 'first'
      }
  },
  mounted(){
  },
  components: {
    'component-manage-comment': ComponmentManage,
    'component-manage-feedback': ComponmentFeedback
  },
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    },
      handleClick(tab, event) {
          console.log(tab, event);
      }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
    .page-bar {
        width: 100%;
        margin: auto;
    }
</style>
