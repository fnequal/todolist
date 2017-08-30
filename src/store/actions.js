import * as types from './mutation-types'

export default {
  init_list ({commit}, list) {
    commit(types.INIT_TASK_LIST, list)
  },
  init_total ({commit}, total) {
    commit(types.INIT_TOTAL_OBJ, total)
  },
  save_task ({commit}, task) {
    commit(types.SAVE_TASK, task)
  },
  delete_task ({commit}, id) {
    commit(types.DELETE_TASK, id)
  },
  finish_task ({commit}, id) {
    commit(types.FINISH_TASK, id)
  },
  add_total ({commit}, time) {
    commit(types.ADD_TOTAL, time)
  },
  subtract_total ({commit}, time) {
    commit(types.SUBTRACT_TOTAL, time)
  }
}
