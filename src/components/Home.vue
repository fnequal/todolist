<template>
  <div class="home">
    <p class="date"><em>今天</em>&nbsp;&nbsp;{{date}}&nbsp;&nbsp;{{day}}</p>
    <router-link to="/list" class="start">任务追踪</router-link>
    <div class="text-center today">
      <img src="../../static/img/idea.png" alt="">
      <div class="no-task" v-if="!todayTasks.length">
        <p>今天没有更多任务</p>
        <p>祝您一天过得愉快</p>
      </div>
      <h4 v-else class="today-tasks">当日任务</h4>
      <div class="list-group">
        <a class="list-group-item" v-for="task in todayTasks" :key="task._id">
          <div class="row">
            <div class="col-sm-1 finish">
              <label class="radio-item" @click.once="finishTask(task._id, task.time)" >
                <input type="radio">
                <span class="outside">
                  <span class="inside"></span>
                </span>
              </label>
            </div>
            <div class="col-sm-7">
              <p class="task">{{task.content}}</p>
            </div>
            <div class="col-sm-4 time">
              <span><i class="glyphicon glyphicon-calendar"></i>&nbsp;{{task.date}}&nbsp;</span>
              <span><i class="glyphicon glyphicon-time"></i>&nbsp;{{task.time}}小时</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'todayTasks'
      ]),
      date () {
        let date = new Date()
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        return y + '年' + m + '月' + d + '日'
      },
      day () {
        var week = new Date().getDay()
        switch (week) {
          case 0:
            return '星期天'
          case 1:
            return '星期一'
          case 2:
            return '星期二'
          case 3:
            return '星期三'
          case 4:
            return '星期二'
          case 5:
            return '星期五'
          case 6:
            return '星期六'
        }
      }
    },
    methods: {
      ...mapActions([
        'finish_task',
        'subtract_total'
      ]),
      finishTask (id, time) {
        let data = {
          id: id
        }
        this.$http.post('/api/finish', data)
          .then(res => {
            this.finish_task(id)
            this.subtract_total(time)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style>
  .home {
    max-width: 766px;
    margin: 10px auto;
  }
  .date {
    color: #999;
  }
  .date em {
    color: #333;
    font-size: 20px;
    font-style: normal;
  }
  .start {
    color: #dd4b39;
    opacity: .4;
    filter: alpha(opacity=40);
  }
  .start:hover {
    color: #dd4b39;
    opacity: 1;
    filter: alpha(opacity=100);
  }
  .today {
    padding: 30px 0;
  }
  .today .no-task {
    margin-top: 30px;
  }
  .today .no-task p:first-child{
    font-size: 20px;
    margin: 5px 0;
  }
  .today-tasks {
    padding-top: 20px;
  }
  .row * {
    margin: 0 auto;
  }
  .list-group-item {
    margin-bottom: 0;
    padding: 13px 15px;
    border: none;
    border-bottom: 1px solid #ccc;
  }
  .finish {
    text-align: right;
  }
  .radio-item {
    font-size: 14px;
    position: relative;
    cursor: pointer;
  }
  .radio-item input[type="radio"] {
    position: absolute;
    z-index: -1;
    top: 2px;
    left: 0;
    width: 18px;
    height: 18px;
    opacity: 0;
  }
  .radio-item .outside {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: 3px 0 0 0;
    vertical-align: top;
    border: 1px solid #999;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #fff;
  }
  .radio-item .outside .inside {
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: -4px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #fff;
  }
  .radio-item input:checked+.outside .inside {
    background: #dd4b39;
  }
  .task {
    float: left;
  }
  .time span{
    margin: 0 3px;
  }
</style>
