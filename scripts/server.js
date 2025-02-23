var http = require('http');
var fs = require('fs');
const path = require('path');

var STATIC = path.resolve(__dirname, '../dist');

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
function onHttpComing(req, res) {
  var pathname = req.url.split('?')[0];
  // 支持 publicPath
  pathname = pathname.replace('/react-demo-ResponsiveCardSlider', '');
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }
  var ext = path.extname(pathname).substring(1);
  var filePath = path.join(STATIC, pathname);
  var fStream = fs.createReadStream(filePath);
  fStream.once('error', () => {
    res.statusCode = 404;
    res.end();
  })
  fStream.pipe(res);
  // console.log(pathname, ext);
  
  // res.end('ok');
}

http.createServer(onHttpComing).listen(9009, () => {
  console.log('Serving %o on http://localhost:9009', 'dist');
});
