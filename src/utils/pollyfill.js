// 兼容一些旧的安卓浏览器
if (!crypto.randomUUID) {
  var hex = '0123456789abcdef';
  var rand = () => Math.floor(Math.random()*hex.length);
  crypto.randomUUID = function uuidv4() {
    return `00000000-1000-4000-8000-000000000000`.replace(/[018]/g, rand);
  }
}
