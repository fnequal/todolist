<template>
  <div class="list">
    <router-link v-if="$route.name!=='Add'" to="/" class="back"><i class="glyphicon glyphicon-home"></i>&nbsp;首页</router-link>
    <router-view></router-view>
    <hr/>
    <div class="task-list">
      <h4 v-if="!searchTasks.length">搜索不到与“<span>{{title}}</span>”相关的任务</h4>
      <h4 v-else>共搜索到与“<span>{{title}}</span>”相关的任务{{searchTasks.length}}条</h4>
      <div class="list-group">
        <a class="list-group-item" v-for="task in searchTasks" :key="task._id">
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
              <a class="btn-remove" @click="deleteTask(task)"><i class="glyphicon glyphicon-remove"></i></a>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        searchTasks: []
      }
    },
    computed: {
      title () {
        let title = this.$route.query.title
        return decodeURI(title)
      }
    },
    methods: {
      ...mapActions([
        'delete_task',
        'subtract_total'
      ]),
      deleteTask (item) {
        let index = this.searchTasks.indexOf(item)
        this.$http.delete('/api/delete/' + item._id)
          .then(res => {
            if (res.data.errCode === 0) {
              this.delete_task(item._id)
              if (!item.done) {
                this.subtract_total(item.time)
              }
              this.searchTasks.splice(index, 1)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      search (title) {
        this.$http.get('/api/search/' + title)
          .then(res => {
            this.searchTasks = res.data.data
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted () {
      this.search(this.title)
    },
    watch: {
      title (newVal, oldVal) {
        this.search(newVal)
      }
    }
  }
</script>

<style>
  .list {
    padding: 20px 0;
  }
  .task-list h4 {
    padding: 10px;
  }
  .task-list h4 span {
    color: #db4c3f;
  }
  .back {
    color: #dd4b39;
    opacity: .4;
    filter: alpha(opacity=40);
    margin-right: 8px;
  }
  .back:hover {
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
