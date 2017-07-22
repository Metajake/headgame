// Shorthand Console Log
function cl(toLog){
  console.log(toLog);;
}

// Make Bitmapdata Sprite
function BMDSprite(color, type, x, y, width, height){
  // draw to the canvas context
  if(type == "circle"){
    // FIGURE OUT WHAT THE FUCK IS GOING ON HERE (With BMD/Sprite width, height, position)! REF: http://www.html5gamedevs.com/topic/13555-drawing-a-circle-with-bitmapdata/
    bmd = game.add.bitmapData(width, height);
    bmd[type](x, y, width/4 /* MAKE SENSE OF THIS*/, color);
  } else {
    bmd = game.add.bitmapData();
    bmd.ctx.beginPath();
    bmd.ctx[type](null, null, width, height);
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();
  }

  // use the bitmap data as the texture for the sprite
  return game.add.sprite(x, y, bmd);
}
