<template>
  <div class="list">
    <router-link v-if="$route.name!=='Add'" to="/" class="back"><i class="glyphicon glyphicon-arrow-left"></i>&nbsp;返回</router-link>
    <router-link v-if="$route.name!=='Add'" to="/list/add" class="add"><i class="glyphicon glyphicon-plus"></i>&nbsp;添加任务</router-link>
    <router-view></router-view>
    <hr/>
    <div class="task-list">
      <p v-if="!list.length"><strong>还没有任何任务</strong></p>
      <div class="list-group">
        <a class="list-group-item" v-for="task in list" :key="task._id">
          <div class="row">
            <div class="col-sm-1 finish">
              <i v-if="!task.done" class="glyphicon glyphicon-tag"></i>
              <i v-else="task.done" class="glyphicon glyphicon-ok"></i>
            </div>
            <div class="col-sm-7">
              <p>{{task.content}}</p>
            </div>
            <div class="col-sm-3 time">
              <span><i class="glyphicon glyphicon-calendar"></i>&nbsp;{{task.date}}&nbsp;</span>
              <span><i class="glyphicon glyphicon-time"></i>&nbsp;{{task.time}}小时</span>
            </div>
            <div class="col-sm-1">
              <a class="btn-remove" @click="deleteTask(task.time, task.done, task._id)"><i class="glyphicon glyphicon-remove"></i></a>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapState([
        'list'
      ])
    },
    methods: {
      ...mapActions([
        'delete_task',
        'subtract_total'
      ]),
      deleteTask (time, done, id) {
        this.$http.delete('/api/delete/' + id)
          .then(res => {
            if (res.data.errCode === 0) {
              this.delete_task(id)
              if (!done) {
                this.subtract_total(time)
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style>
  .list {
    padding: 20px 0;
  }
  .back, .add {
    color: #dd4b39;
    opacity: .4;
    filter: alpha(opacity=40);
    margin-right: 8px;
  }
  .back:hover, .add:hover {
    color: #dd4b39;
    opacity: 1;
    filter: alpha(opacity=100);
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
  .time span{
    margin: 0 3px;
  }
  .btn-remove {
    color: #dd4b39;
    cursor: pointer;
  }
  .btn-remove:hover {
    color: #c53727;
  }
</style>
