const time = {
    Hour: (dt) => {
        const date = new Date(dt * 1000)
        const hour = date.getHours()
        const min = (hour > 12 ? `${date.getMinutes()} pm` : `${date.getMinutes()} am`)
        return `${hour}:${min}`
    },
   
    Date: (dt) => {
        const date = new Date(dt * 1000)
        const day = date.getDate()
        const month = date.getMonth() +1
        return `${day}/${month}`
    }
}
export default time;
