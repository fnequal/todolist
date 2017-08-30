<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container">
        <a href="/" class="navbar-brand">
          <i class="glyphicon glyphicon-tasks"></i>
          任务板
        </a>
        <form class="navbar-form navbar-left" method="get" @submit.prevent="search">
          <div class="form-group">
            <input type="text" class="form-control" name="title" v-model="title">
            <i class="glyphicon glyphicon-search search" @click="search"></i>
          </div>
        </form>
        <a href="javascript:void(0);" class="user">
          <i class="glyphicon glyphicon-user"></i>
        </a>
      </div>
    </nav>
    <div class="container">
      <div class="col-sm-3">
        <side></side>
      </div>
      <div class="col-sm-9 right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import Side from './components/Side'
  export default {
    components: {'side': Side},
    data () {
      return {
        title: ''
      }
    },
    methods: {
      ...mapActions([
        'init_list',
        'init_total'
      ]),
      search () {
        if (this.title.trim().length) {
          this.$router.push({path: '/search', query: {title: this.title}})
        }
      }
    },
    mounted () {
      var win = document.documentElement.clientHeight
      document.querySelector('.right').style.minHeight = win - 72 + 'px'

      this.$http.get('/api/list')
        .then(res => {
          this.init_list(res.data.data.list)
          this.init_total(res.data.data.total)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style>
  .navbar.navbar-default {
    border-bottom: solid 1px #ca2100;
    background-color: #db4c3f;
  }
  .navbar-default .navbar-brand {
    color: #fff!important;
  }
  input:focus {
    border-color: #fff!important;
  }
  .search {
    color: #db4c3f;
    margin-left: -30px;
    cursor: pointer;
  }
  .glyphicon-tasks {
    vertical-align: top;
  }
  .user {
    float: right;
  }
  .glyphicon-user {
    font-size: 20px;
    color: #fff;
    margin-top: 15px;
  }
  .right {
    background-color: #fff;
  }
</style>
