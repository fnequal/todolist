export const todayTasks = state => {
  let date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  m = m > 10 ? m : '0' + m
  d = d > 10 ? d : '0' + d
  let today = y + '-' + m + '-' + d
  return state.list.filter(item => item.date === today && !item.done)
}
