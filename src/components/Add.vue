<template>
  <div class="form-horizontal">
    <div class="form-group">
      <div class="col-sm-6">
        <label>日期</label>
        <input type="date" class="form-control" placeholder="年/月/日" v-model="date"/>
      </div>
      <div class="col-sm-6">
        <label>时间</label>
        <input type="number" class="form-control" placeholder="时间（小时）" v-model.number="total_time"/>
      </div>
      <div class="col-sm-12">
        <label>任务</label>
        <input type="text" class="form-control" placeholder="任务内容" v-model="task"/>
      </div>
    </div>
    <button class="btn btn-save" @click="save">保存</button>
    <router-link to="/list" class="cancel">取消</router-link>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        date: '',
        total_time: '',
        task: ''
      }
    },
    methods: {
      ...mapActions([
        'save_task',
        'add_total'
      ]),
      save () {
        let data = {
          date: this.date,
          time: this.total_time,
          content: this.task
        }
        this.$http.post('/api/add', data)
          .then(res => {
            if (res.data.errCode === 0) {
              this.save_task(res.data.data)
              this.add_total(res.data.data.time)
              this.$router.push({path: '/list'})
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
  .col-sm-12{
    margin-top: 5px;
  }
  .btn-save {
    background-color: #db4c3f;
    color: #fff;
  }
  .btn-save:hover, .btn-save:focus{
    background-color: #c53727;
    color: #fff;
  }
  .cancel {
    color: #555;
    margin-left: 5px;
  }
  .cancel:hover {
    color: #555;
  }
</style>
