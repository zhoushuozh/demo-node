var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  
  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query 
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/
  
  if (request.method === 'GET') {
    if (path === '/') { 
      var string = fs.readFileSync('./index.html','utf8')  
      var amount = fs.readFileSync('./db','utf8')
      string = string.replace('&&&amount&&&', amount)
      response.setHeader('Content-Type', 'text/html;charset=utf-8') 
      response.write(string)
      response.end()  
    } else if (path === '/style.css') {  
      var string = fs.readFileSync('./style.css','utf8')
      response.setHeader('Content-Type', 'text/css')
      response.write(string)
      response.end()
    } else if (path === '/main.js') { 
      var string = fs.readFileSync('./main.js','utf8')
      response.setHeader('Content-Type', 'application/javascript')
      response.write(string)
      response.end()
    } else if (path === '/pay'){
      let amount = fs.readFileSync('./db', 'utf8')
      amount -= 1
      fs.writeFileSync('./db', amount)
      let callbackName = query.callback
      response.setHeader('Content-Type', 'application/javascript')
      response.write(`
	${callbackName}.call(undefined,'success')	      
      `)
      response.end()
    } else { 
      response.statusCode = 404
      //response.setHeader('Content-Type', 'text/html;charset=utf-8')
      //response.write('找不到对应的路径')
      response.end()
    }
    } else if (request.method === 'POST') {
      if (path === '/') {
        var payload = "";

        request.addListener("data", function (chunk) {
          payload += chunk;
        })

        //POST结束输出结果
        request.addListener("end", function () {
          var params = querystring.parse(payload);
          console.log(params)
          response.setHeader('Content-Type', 'text/html;charset=utf-8')  // 设置响应头 Content-Type
          response.end('这是 POST 返回的页面');
       })
     }
   }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用浏览器打开 http://localhost:' + port)


