/* invaders404: https://github.com/pjnovas/invaders404 */
(function(){var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/\b_super\b/:/.*/;this.Class=function(){};Class.extend=function(prop){var _super=this.prototype;initializing=true;var prototype=new this();initializing=false;for(var name in prop){prototype[name]=typeof prop[name]=="function"&&typeof _super[name]=="function"&&fnTest.test(prop[name])?(function(name,fn){return function(){var tmp=this._super;this._super=_super[name];var ret=fn.apply(this,arguments);this._super=tmp;return ret;};})(name,prop[name]):prop[name];}
function Class(){if(!initializing&&this.init)
this.init.apply(this,arguments);}
Class.prototype=prototype;Class.prototype.constructor=Class;Class.extend=arguments.callee;return Class;};})();function Controls(){throw'Controls class is Static.';};Controls.Left="Left";Controls.Right="Right";Controls.Shoot="Shoot";function Keyboard(){throw'KeyboardCode class is Static.';};Keyboard.Left=37;Keyboard.Right=39;Keyboard.Up=38;Keyboard.Down=40;Keyboard.Space=32;function ImageMapper(){throw'ImageMapper class is Static.';};ImageMapper.Ship=function(){return[[0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],[0,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0],[0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0]];};ImageMapper.ShipShoot=function(){return[[1],[1],[1],[1],[1],[1],[1]];};ImageMapper.Invasion=function(){return[[2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,1,2,1,1,1,2,2,2,1,2],[2,2,1,1,2,1,2,1,2,2,1,1,2],[2,1,2,1,2,1,2,1,2,1,2,1,2],[2,1,1,1,2,1,2,1,2,1,1,1,2],[2,2,2,1,2,1,1,1,2,2,2,1,2],[2,2,2,2,2,2,2,2,2,2,2,2,2]];};ImageMapper.AlienCrab=function(){return[[0,0,1,0,0,0,0,0,1,0,0],[3,0,0,1,0,0,0,1,0,0,3],[3,0,0,1,0,0,0,1,0,0,3],[3,0,1,1,1,1,1,1,1,0,3],[3,0,1,0,1,1,1,0,1,0,3],[3,1,1,1,1,1,1,1,1,1,3],[2,1,1,1,1,1,1,1,1,1,2],[2,0,1,1,1,1,1,1,1,0,2],[2,0,1,1,1,1,1,1,1,0,2],[2,0,1,0,0,0,0,0,1,0,2],[2,0,1,0,0,0,0,0,1,0,2],[0,3,0,2,2,0,2,2,0,3,0]];};ImageMapper.AlienSquid=function(){return[[0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,1,0,0],[0,1,1,0,1,1,1,0,1,1,0],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1],[0,0,1,0,0,0,0,0,1,0,0],[0,0,1,0,0,0,0,0,1,0,0],[0,1,0,3,0,0,0,3,0,1,0],[3,0,1,0,3,0,3,0,1,0,3]];};ImageMapper.DeadAlien=function(){return[[1,0,0,0,0,0,0,0,0,0,1],[0,1,0,0,0,1,0,0,0,1,0],[0,0,1,0,0,1,0,0,1,0,0],[0,0,0,1,0,1,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,1,0,0,0],[0,0,1,0,0,1,0,0,1,0,0],[0,1,0,0,0,1,0,0,0,1,0],[1,0,0,0,0,1,0,0,0,0,1]];};ImageMapper.AlienShoot=function(){return[[0,1,0],[1,0,0],[0,1,0],[0,0,1],[0,1,0],[1,0,0],[0,1,0]];};ImageMapper.Shield=function(){return[[1,0,0,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,1,0],[1,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,0,1],[1,1,1,1,0,1,0,1,0,0,1,0,0,0,0,0,1,1,0,0,1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1],[1,0,1,1,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1],[1,0,0,1,0,1,1,1,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,0,1,1,1,0,1,0,0,1,0,1,1,0]];};ImageMapper.ShieldBrick=function(){return[[[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1]],[[0,1,1,1,0,1],[1,1,1,0,0,0],[1,1,0,1,1,0],[0,0,1,0,1,1],[1,0,0,1,0,1],[1,1,0,0,1,1]],[[0,0,0,1,0,1],[0,0,0,0,0,0],[1,0,0,1,0,0],[0,0,1,0,1,1],[1,0,0,1,0,1],[1,1,0,0,0,0]]];};function ImageCreator(){throw'ImageCreator class is Static.';};ImageCreator.getImages=function(options){var images=[];var bricks=[];var mapper=options.mapper||[];var w=options.width||100;var h=options.height||100;var states=options.states||[];var bSize=options.brickSize||5;var color=options.color||'#000';var canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;var ctx=canvas.getContext('2d');function buildBricks(){var arrLen=mapper.length;for(var i=0;i<arrLen;i++){var colLen=mapper[i].length;for(var j=0;j<colLen;j++){var val=mapper[i][j];if(val){var b=new Brick({ctx:ctx,x:(j*bSize),y:(i*bSize),width:bSize,height:bSize,color:color,value:val});bricks.push(b);}}}}
function createImage(state){ctx.clearRect(0,0,w,h);var bLen=bricks.length;for(var i=0;i<bLen;i++){if(bricks[i].value===1||bricks[i].value===state)
bricks[i].draw();}
var imgData=canvas.toDataURL("image/png");var image=new Image();image.src=imgData;images.push(image);}
buildBricks();for(var i=0;i<states.length;i++){createImage(states[i]);}
var i=bricks.length-1;do{bricks[i]=null;}while(i--);return images;}
var DrawableElement=Class.extend({init:function(options){this.ctx=(options.ctx)?options.ctx:null;this.size={width:options.width||0,height:options.height||0};this.position={x:options.x||0,y:options.y||0};this.brickSize=options.brickSize||1;this.color=options.color||'#000';this.bricks=[];this.onDestroy=options.onDestroy||function(){};},build:function(){},update:function(){},draw:function(img){if(this.ctx!=null)
this.ctx.drawImage(img,this.position.x,this.position.y);},destroy:function(){this.ctx=null;if(this.size!=null){this.size.width=null;this.size.height=null;this.size=null;}
if(this.position!=null){this.position.x=null;this.position.y=null;this.position=null;}
this.brickSize=null;this.color=null;var bricks=this.bricks;if(bricks!=null){var bricksL=bricks.length;for(var i=0;i<bricksL;i++)
bricks[i]=null;this.bricks=null;}}});var Shoot=DrawableElement.extend({init:function(options){this._super(options);this.MOVE_FACTOR=5;this.dir=options.dir;this.shootImage=options.shootImage;this.collateBricks=options.collateBricks;this.collateAliens=options.collateAliens;this.timer=null;},build:function(){},loop:function(){var dir=this.dir;var vel=this.MOVE_FACTOR;this.position.y+=(vel*dir);if(this.hasCollision()){this.collided();return;}},update:function(){clearInterval(this.timer);var self=this;this.timer=setInterval(function(){self.loop();},20);},draw:function(){this._super(this.shootImage);},collided:function(){this.destroy();},destroy:function(){clearInterval(this.timer);this.collateBricks=null;this.collateAliens=null;this.onDestroy(this);this._super();},hasCollision:function(){var sX=this.position.x;var sY=this.position.y;if(sY<0||sY>400)
return true;function checkCollision(arr){var cb=arr;var cbLen=cb.length;for(var i=0;i<cbLen;i++){var cbO=cb[i];var cbL=cbO.position.x;var cbT=cbO.position.y;var cbR=cbL+cbO.size.width;var cbD=cbT+cbO.size.height;if(sX>=cbL&&sX<=cbR&&sY>=cbT&&sY<=cbD&&!cbO.destroyed){arr[i].collided();return true;}}
return false;}
if(checkCollision(this.collateBricks))return true;if(this.collateAliens&&checkCollision(this.collateAliens))return true;}});var Ship=DrawableElement.extend({init:function(options){this._super(options);this.maxMove={left:options.maxMoveLeft,right:options.maxMoveRight};this.onShipHit=options.onShipHit||function(){};this.MOVE_FACTOR=5;this.brickSize=2;this.shootImage=null;this.shoots=[];this.imgs=[];var map=ImageMapper.Ship();this.size={width:this.brickSize*map[0].length,height:this.brickSize*map.length};this.build();this.shield=options.shield;this.invasion={};},build:function(){this.buildShootImage();var opts={width:this.size.width,height:this.size.height,states:[1],brickSize:this.brickSize,mapper:ImageMapper.Ship(),color:this.color};this.imgs=ImageCreator.getImages(opts);},update:function(actions){var vel=this.MOVE_FACTOR;if(actions.indexOf(Controls.Left)>-1){if(this.position.x>this.maxMove.left){this.position.x-=vel;}}
else if(actions.indexOf(Controls.Right)>-1){if(this.position.x<(this.maxMove.right-this.size.width)){this.position.x+=vel;}}
var shootIdx=actions.indexOf(Controls.Shoot);if(shootIdx>-1&&this.shoots.length===0){actions.splice(shootIdx,1);this.makeShoot();}},draw:function(){this._super(this.imgs[0]);var s=this.shoots;var sLen=s.length;for(var i=0;i<sLen;i++){s[i].draw();}},collided:function(){this.onShipHit();},destroy:function(){this.onShipHit=null;this.shootImage=null;for(var i=0;i<this.shoots.length;i++){this.shoots[i].destroy();}
this.shoots=[];this.imgs=[];this.shield=null;this.invasion=null;this._super();},makeShoot:function(){var self=this;var s=new Shoot({ctx:this.ctx,x:this.position.x+(this.size.width/2),y:this.position.y,dir:-1,shootImage:this.shootImage,onDestroy:function(s){for(var i=0;i<self.shoots.length;i++){if(self.shoots[i]===s){self.shoots.splice(i,1);break;}}},collateBricks:this.shield.bricks,collateAliens:this.invasion.aliens});this.shoots.push(s);s.update();},buildShootImage:function(){var map=ImageMapper.ShipShoot(),brickSize=2,width=brickSize*map[0].length,height=brickSize*map.length;var opts={width:width,height:height,states:[1],brickSize:brickSize,mapper:map,color:this.color};this.shootImage=ImageCreator.getImages(opts)[0];}});var Invasion=DrawableElement.extend({init:function(options){this._super(options);this.size={width:390,height:210};this.shield=options.shield;this.ship=options.ship;this.MOVE_FACTOR=10;this.DOWN_FACTOR=12;this.CURR_VEL=600;this.VEL_FACTOR=50;this.dir=1;this.lastDir=1;this.lastPer=100;this.state=0;this.alienSize=30;this.aliens=[];this.crabImages=[];this.squidImages=[];this.deadAlienImgs=[];this.shootImage=null;this.shoots=[];this.build();this.aliensAmm=this.aliens.length;this.hadAlienCollision=false;this.onAliensClean=options.onAliensClean||function(){};this.timer=null;this.update();},build:function(){var self=this;this.buildShootImage();this.buildAliensImages();var aSize=this.alienSize;var x=this.position.x;var y=this.position.y;var ctx=this.ctx;var aliensArr=ImageMapper.Invasion();var aArrLen=aliensArr.length;for(var i=0;i<aArrLen;i++){var aColLen=aliensArr[i].length;for(var j=0;j<aColLen;j++){if(aliensArr[i][j]){var alien;var opts={ctx:ctx,x:(j*aSize)+x,y:(i*aSize)+y,width:aSize,height:aSize,destroyedImg:this.deadAlienImgs,shield:this.shield,ship:this.ship,onDestroy:function(alien){for(var i=0;i<self.aliens.length;i++){if(self.aliens[i]===alien){self.aliens.splice(i,1);break;}}},onWallCollision:function(){self.hadAlienCollision=true;}};switch(aliensArr[i][j]){case 1:opts.stateImgs=this.crabImages;break;case 2:opts.stateImgs=this.squidImages;break;}
alien=new Alien(opts);this.aliens.push(alien);}}}},loop:function(){this.state=!this.state;var vel=this.MOVE_FACTOR;var hMove=0;var vMove=0;var arr=this.aliens;var arrLen=arr.length;if(arrLen===0){clearInterval(this.timer);this.onAliensClean();}
if(this.hadAlienCollision){this.dir*=-1;this.hadAlienCollision=false;vMove=this.DOWN_FACTOR;this.lastDir=this.dir;}
hMove=(vel*this.dir);this.position.x+=hMove;this.position.y+=vMove;var shooterIdx=Math.floor(Math.random()*arrLen);var shoot=false;if(this.state&&Math.floor(Math.random()*2))
shoot=true;for(var i=0;i<arrLen;i++){arr[i].position.x+=hMove;arr[i].position.y+=vMove;if(shoot&&shooterIdx===i)
this.makeShoot(arr[i]);arr[i].update();}
if(this.vMove>0)this.vMove=0;var cPer=(arrLen*100)/this.aliensAmm;if((this.lastPer-cPer)>9){this.CURR_VEL-=this.VEL_FACTOR;this.lastPer=cPer;this.update();return;}},update:function(){clearInterval(this.timer);var self=this;this.timer=setInterval(function(){self.loop();},this.CURR_VEL);},draw:function(){var state=this.state;var arr=this.aliens;var arrLen=arr.length;for(var i=0;i<arrLen;i++){if(arr[i]!==undefined)
arr[i].draw(state);}
var shoots=this.shoots;var shootsLen=shoots.length;for(var i=0;i<shootsLen;i++){shoots[i].draw();}},destroy:function(){clearInterval(this.timer);this.shield=null;this.ship=null;for(var i=0;i<this.shoots.length;i++){this.shoots[i].destroy();}
this.shoots=[];this._super();},makeShoot:function(alien){var shield=this.shield;var ship=this.ship;var self=this;var s=new Shoot({ctx:this.ctx,x:alien.position.x+(alien.size.width/2),y:alien.position.y,dir:1,shootImage:this.shootImage,onDestroy:function(s){for(var i=0;i<self.shoots.length;i++){if(self.shoots[i]===s){self.shoots.splice(i,1);break;}}},collateBricks:shield.bricks,collateAliens:[ship]});this.shoots.push(s);s.update();},buildShootImage:function(){var map=ImageMapper.AlienShoot(),brickSize=2,width=brickSize*map[0].length,height=brickSize*map.length;var opts={width:width,height:height,states:[1],brickSize:brickSize,mapper:map,color:'#fff'};this.shootImage=ImageCreator.getImages(opts)[0];},buildAliensImages:function(){var opts={width:30,height:30,states:[1],brickSize:2};opts.mapper=ImageMapper.DeadAlien();opts.color='white';this.deadAlienImgs=ImageCreator.getImages(opts);opts.states=[2,3];opts.mapper=ImageMapper.AlienCrab();opts.color='#ff2727';this.crabImages=ImageCreator.getImages(opts);opts.mapper=ImageMapper.AlienSquid();opts.color='#f8ff41';this.squidImages=ImageCreator.getImages(opts);}});var Alien=DrawableElement.extend({init:function(options){this._super(options);this.images=options.stateImgs||[];this.destroyedImg=options.destroyedImg||[];this.onWallCollision=options.onWallCollision||[];this.shield=options.shield||null;this.ship=options.ship||null;this.destroyed=false;this.shoots=[];},build:function(){},update:function(){this.hasCollision();var sX=this.position.x;if(sX<20||sX>(590-this.size.width))
this.onWallCollision();var sY=this.position.y+this.size.height;if(sY<0)this.ship.collided();},draw:function(state){if(!this.destroyed){var idx=(state)?0:1;this._super(this.images[idx]);}
else{this._super(this.destroyedImg[0]);this.destroy();this.onDestroy(this);}},hasCollision:function(){var sX=this.position.x+this.size.width/2;var sY=this.position.y+this.size.height*0.8;function checkCollision(arr){var cb=arr;var cbLen=cb.length;for(var i=0;i<cbLen;i++){var cbO=cb[i];var cbL=cbO.position.x;var cbT=cbO.position.y;var cbR=cbL+cbO.size.width;var cbD=cbT+cbO.size.height;if(sX>=cbL&&sX<=cbR&&sY>=cbT&&sY<=cbD&&!cbO.destroyed){arr[i].collided(true);return true;}}
return false;}
if(checkCollision(this.shield.bricks))return true;if(checkCollision([this.ship]))return true;},collided:function(){this.destroyed=true;},destroy:function(){this._super();}});var Brick=DrawableElement.extend({init:function(options){this._super(options);this.destroyed=false;this.value=options.value||1;},build:function(){},update:function(){},draw:function(){if(!this.destroyed){this.ctx.beginPath();this.ctx.rect(this.position.x,this.position.y,this.size.width,this.size.height);this.ctx.fillStyle=this.color;this.ctx.fill();}},destroy:function(){this.destroyed=true;}});var ShieldBrick=DrawableElement.extend({init:function(options){this._super(options);this.state=0;this.imgsState=options.imgsState;this.destroyed=false;},build:function(){},update:function(){},draw:function(){if(!this.destroyed){this._super(this.imgsState[this.state]);}},collided:function(full){if(full)this.state=3;else this.state++;if(this.state>2){this.destroyed=true;}},destroy:function(){this._super();}});var Shield=DrawableElement.extend({init:function(options){this._super(options);this.imgs=[];this.build();},build:function(){this.createImagesStateBricks();var bSize=this.brickSize;var x=this.position.x;var y=this.position.y;var ctx=this.ctx;var color=this.color;var fernetArr=ImageMapper.Shield();var fArrLen=fernetArr.length;for(var i=0;i<fArrLen;i++){var fColLen=fernetArr[i].length;for(var j=0;j<fColLen;j++){if(fernetArr[i][j]){var b=new ShieldBrick({ctx:ctx,x:(j*bSize)+x,y:(i*bSize)+y,width:bSize,height:bSize,color:color,imgsState:this.imgs});this.bricks.push(b);}}}},update:function(){},draw:function(){var b=this.bricks;var bLen=b.length;for(var i=0;i<bLen;i++){b[i].draw();}},destroy:function(){var b=this.bricks;var bLen=b.length;for(var i=0;i<bLen;i++){b[i].destroy();}
this.bricks=[];this._super();},createImagesStateBricks:function(){var opts={width:this.brickSize,height:this.brickSize,states:[1],brickSize:2,color:this.color};var states=ImageMapper.ShieldBrick();for(var i=0;i<states.length;i++){opts.mapper=states[i];this.imgs.push(ImageCreator.getImages(opts)[0]);}}});var Invaders404=Class.extend({init:function(options){this.canvas=null;this.ctx=null;this.loopInterval=30;this.currentDir=[];this.shield={};this.ship={};this.invasion={};this.initCanvas();this.onLoose=options.onLoose||function(){};this.onWin=options.onWin||function(){};this.isOnGame=false;this.fps=0
this.now=null;this.lastUpdate=(new Date)*1-1;this.fpsFilter=this.loopInterval;var self=this;var fpsOut=document.getElementById('fps');setInterval(function(){fpsOut.innerHTML=self.fps.toFixed(1)+"fps";},1000);},initCanvas:function(){this.canvas=document.getElementById('canvas404');this.ctx=this.canvas.getContext('2d');},start:function(){this.build();this.loop();},build:function(){var self=this;this.shield=new Shield({ctx:this.ctx,x:80,y:290,brickSize:12,color:'#fff'});var cnvW=this.canvas.width;this.ship=new Ship({ctx:this.ctx,shield:this.shield,maxMoveLeft:5,maxMoveRight:cnvW-10,x:((cnvW-10)/2),y:370,color:'#1be400',onShipHit:function(){self.stop();self.onLoose();}});this.invasion=new Invasion({ctx:this.ctx,x:20,y:10,shield:this.shield,ship:this.ship,onAliensClean:function(){self.stop();self.onWin();}});this.ship.invasion=this.invasion;this.currentDir=[];this.isOnGame=true;this.bindControls();},loop:function(){this.update();this.draw();if(this.isOnGame){var self=this;setTimeout(function(){self.loop();},self.loopInterval);}},update:function(){this.shield.update();this.ship.update(this.currentDir);},draw:function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);this.shield.draw();this.ship.draw();this.invasion.draw();var thisFrameFPS=1000/((this.now=new Date)-this.lastUpdate);this.fps+=(thisFrameFPS-this.fps)/this.fpsFilter;this.lastUpdate=this.now;},bindControls:function(params){var self=this;var gameKeys=[Keyboard.Space,Keyboard.Left,Keyboard.Right];function getAction(code){switch(code){case Keyboard.Space:return Controls.Shoot;case Keyboard.Left:return Controls.Left;case Keyboard.Right:return Controls.Right;}
return null;}
function setGamePadAction(){var keysPressed=[];if(gamepad.buttons.A_Button||gamepad.buttons.X_Button||gamepad.buttons.B_Button||gamepad.buttons.Y_Button)
keysPressed.push(Controls.Shoot);if(gamepad.axes.Left_Stick_X||gamepad.axes.Pad_Left)
keysPressed.push(Controls.Left);if(gamepad.axes.Right_Stick_X||gamepad.axes.Pad_Right)
keysPressed.push(Controls.Right);for(var i=0;i<keysPressed.length;i++){if(self.currentDir.indexOf(keysPressed[i])===-1)
self.currentDir.push(keysPressed[i]);}}
window.addEventListener("MozGamepadAxisMove",setGamePadAction,false);window.addEventListener("MozGamepadButtonDown",setGamePadAction,false);window.addEventListener("MozGamepadButtonUp",function(){var pos=-1;if(!gamepad.axes.Left_Stick_X&&!gamepad.axes.Pad_Left){pos=self.currentDir.indexOf(Controls.Left);if(pos>-1)self.currentDir.splice(pos,1);}
if(!gamepad.axes.Right_Stick_X&&!gamepad.axes.Pad_Right){pos=self.currentDir.indexOf(Controls.Right);if(pos>-1)self.currentDir.splice(pos,1);}},false);document.addEventListener('keydown',function(event){if(self.isOnGame){var key=event.keyCode;if(gameKeys.indexOf(key)>-1){var dir=getAction(key);if(self.currentDir.indexOf(dir)===-1)
self.currentDir.push(dir);event.stopPropagation();event.preventDefault();return false;}}});document.addEventListener('keyup',function(event){if(self.isOnGame){var key=event.keyCode;var dir=getAction(key);var pos=self.currentDir.indexOf(dir);if(pos>-1)
self.currentDir.splice(pos,1);}});},unbindControls:function(params){document.removeEventListener('keydown',function(){});document.removeEventListener('keyup',function(){});},destroy:function(){this.shield.destroy();this.invasion.destroy();this.ship.destroy();},stop:function(){this.isOnGame=false;for(var i=0;i<this.currentDir.length;i++)
this.currentDir[i]=null;this.currentDir=[];this.destroy();},drawSplash:function(callback){var ctx=this.ctx,cellSize=1,cols=this.canvas.height/cellSize,colsL=this.canvas.width/cellSize,colIdx=0;function drawColumn(idx,color){for(j=0;j<colsL;j++){ctx.save();ctx.fillStyle=color;ctx.fillRect(idx*(cellSize+20),j*cellSize,cellSize+20,cellSize);ctx.restore();}}
var timerAux=setInterval(function(){if(colIdx<colsL/10){drawColumn(colIdx,"#F0DB4F");drawColumn(colIdx+1,"#ddc649");drawColumn(colIdx+2,"#c4ad41");drawColumn(colIdx+3,"#938631");drawColumn(colIdx+4,"#6d6224");colIdx++;}
else{clearInterval(timerAux);callback();}},this.loopInterval);},goFullscreen:function(){var canvas=this.canvas,requestFullscreen=canvas.requestFullscreen||canvas.mozRequestFullScreen||canvas.webkitRequestFullScreen;if(requestFullscreen){requestFullscreen.call(canvas);}},exitFullscreen:function(){var cancelFullscreen=document.cancelFullscreen||document.mozCancelFullScreen||document.webkitCancelFullScreen;if(cancelFullscreen){cancelFullscreen.call(document);}}});


var invaders;
window.addEventListener('load', function(){
	initInvaders404();
	setFullscreenLabel();
	sendAnalytics();
});

document.documentElement.addEventListener('keypress', function(ev){
	var keycd = ev.which || ev.keyCode;
	if(ev.ctrlKey && [10, 13].indexOf(keycd) !== -1 && invaders){
			invaders.goFullscreen();
	}
});

function setFullscreenLabel(){
	var canvas = document.getElementById('canvas404');
	if (canvas.requestFullscreen || canvas.mozRequestFullScreen || canvas.webkitRequestFullScreen){
		document.getElementById('fullscrenLabel').innerHTML = 'Pantalla Completa: Ctrl+Enter';
	}
}

function play (){
	var splash = document.getElementById('splash');
	splash.style.display = "none";
				splash.style.opacity = 0;

        		invaders.start();
        	}

       	function showSplash(){
        		invaders.drawSplash(function (){
				var splash = document.getElementById('splash');
				splash.style.display = "block";

		setInterval(function(){
			var opa = parseFloat(splash.style.opacity) || 0;
			if (opa < 1){
				splash.style.opacity = opa + 0.2;
			}
		}, 200);
	});
}

function initInvaders404(){
	invaders = new Invaders404({
		onLoose: function(){
			showSplash();
			invaders.exitFullscreen();
		},
		onWin: function(){
			showSplash();
		}
	});

	invaders.start();
}


function sendAnalytics(){
	var ga = window.ga || console.debug.bind(console),
		page = document.location.pathname + document.location.search,
		ref =  document.referrer;

	ga('send', 'event', 'error', '404', 'page: ' + page + ' ref: ' + ref, {
		'nonInteraction': 1
	});

}
