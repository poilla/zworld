var express = require('express');
var app = express();

app.use(express.static('public'));
app.listen(9000);
console.log('服务器已启动');
