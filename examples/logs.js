
/**
 * Module dependencies.
 */

var Canvas = require('../')
  , size = process.stdout.getWindowSize()
  , Log = require('./log');

process.on('SIGINT', function(){
  ctx.reset();
  process.nextTick(function(){
    process.exit();
  });
});

process.on('SIGWINCH', function(){
  size = process.stdout.getWindowSize();
  canvas.width = size[0];
  canvas.height = size[1];
});

var canvas = new Canvas(size[0], size[1])
  , ctx = canvas.getContext('2d')
  , a = new Log(5, 2, 20, 10).title('express')
  , b = new Log(20, 2, 20, 10).title('tap')
  , c = new Log(35, 2, 20, 10).title('mocha');

ctx.hideCursor();
setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  a.draw(ctx);
  b.draw(ctx);
  c.draw(ctx);
}, 1000 / 20);

setInterval(function(){
  a.write(['something', 'else', 'happened'][Math.random() * 3 | 0]);
}, 200);

setInterval(function(){
  b.write(['something', 'else', 'happened'][Math.random() * 3 | 0]);
}, 250);

setInterval(function(){
  c.write(['something', 'else', 'happened'][Math.random() * 3 | 0]);
}, 150);