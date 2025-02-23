/**
 * 格式化日期为 `hh:mm`
 * @param {any} date 日期
 */
export function formatDate(date) {
  var d = new Date(date);
  var h = d.getHours();
  var m = d.getMinutes();
  var hh = h >= 10 ? h : `0${h}`;
  var mm = m >= 10 ? m : `0${m}`;
  return `${hh}:${mm}`;
}
/**
 * 格式化金额为千分位
 * @param {number} n 金额
 */
export function formatMoney(n) {
  var s = '';
  var fraction = Math.round(n*100)%100;
  if (fraction > 0) {
    s = `${s}.${fraction}`;
  }
  n = n|0;
  while (n >= 1000) {
    var fix = `${n%1000}`.padStart(3, '0');
    s = `,${fix}${s}`;
    n = Math.floor(n/1000);
  }
  return n + s;
}
