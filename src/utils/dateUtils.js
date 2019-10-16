/*包 含 n
个 日 期 时 间 处 理 的 工 具 函 数 模 块
*/
/* 格 式 化 日 期 */
export function formateDate(time) {
    if (!time) return ''
    let date = new Date(time)
    const h=date.getHours()
    const m=date.getMinutes()
    const s=date.getSeconds()

    const H=h>10? h:'0'+h
    const M=m>10? m:'0'+m
    const S=s>10? s:'0'+s
    

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        + ' ' + H + ':' + M + ':' + S
}