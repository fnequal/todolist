<template>
  <div class="panel panel-default text-center">
    <div class="panel-heading">信息</div>
    <div class="panel-body">
      <p>共<span>{{total.count}}</span>个任务待完成</p>
      <p>需消耗<span>{{total.time}}</span>小时</p>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      total () {
        return this.$store.state.total
      }
    }
  }
</script>

<style>
  .panel-body p span {
    color: #db4c3f;
  }
</style>
