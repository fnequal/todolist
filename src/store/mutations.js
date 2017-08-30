import * as types from './mutation-types'

export default {
  [types.INIT_TASK_LIST] (state, list) {
    state.list = list
  },
  [types.INIT_TOTAL_OBJ] (state, total) {
    state.total = total
  },
  [types.SAVE_TASK] (state, task) {
    state.list.push(task)
  },
  [types.DELETE_TASK] (state, id) {
    state.list.forEach((item, index) => {
      if (item._id === id) {
        state.list.splice(index, 1)
      }
    })
  },
  [types.FINISH_TASK] (state, id) {
    state.list.forEach((item, index) => {
      if (item._id === id) {
        item.done = true
      }
    })
  },
  [types.ADD_TOTAL] (state, time) {
    state.total.count ++
    state.total.time += time
  },
  [types.SUBTRACT_TOTAL] (state, time) {
    state.total.count --
    state.total.time -= time
  }
}
