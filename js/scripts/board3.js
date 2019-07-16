
document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
//Reference: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
context = document.getElementById('mainBoard').getContext("2d");
//var canvasDiv = document.getElementById('canvasDiv');
var mainBoard = document.getElementById('mainBoard');
var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var curColor = colorPurple;
var clickColor = new Array();

//canvas2 = document.getElementById('canvas2').getContext("2d");
//var canvasDiv2 = document.getElementById('canvasDiv2');
window.setInterval(record, 1000); 
function record(){
  var q = document.getElementById("mainBoard");
  console.log(q,"errorrrrrr");
  //document.getElementById("newBoard2").innerHTML = q;
}

$('#mainBoard').mousedown(function(e){
  //Mouse clicked
  $('#status_ind').html("<h1>mousedown"+e.pageX+" "+sketch+"</h1>");
  sketch = true;
  addClick(event.layerX, event.layerY);
  //addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw(context);

});

$('#mainBoard').mousemove(function(e){
  //Mouse is moving
  $('#status_ind').html("<h1>mousemove"+e.pageX+" "+sketch+"</h1>");
if(sketch){ //If mouse was clicked, draw line
  addClick(event.layerX, event.layerY, true);
  //addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
  redraw(context);
}

});

$('#mainBoard').mouseup(function(e){
  //If mouse is no longer clicked, do not draw line
  $('#status_ind').html("<h1>mouseup</h1>")
  sketch = false;
  //repeatIt();
});

$('#mainBoard').mouseleave(function(e){
  //If mouse is pointing outside the canvas, do not draw line
  $('#status_ind').html("<h1>mouseleave</h1>");
  sketch = false;
});
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array(); //Records mouse drag event (T/F)
var clickTimeStamp = new Array();
var sketch;


var clickXs = new Array();
var clickYs = new Array();
var clickDrags = new Array(); 
var clickTimeStamps = new Array();



var output_json1 = {"clickX":clickX,"clickY":clickY,"clickDrag":clickDrag,"clickTimeStamp":clickTimeStamp};
localStorage.setItem("test",JSON.stringify(output_json1));



/*localStorage.setItem("clickX", clickX);
localStorage.setItem("clickY", clickY);
localStorage.setItem("clickDrag", clickDrag);
localStorage.setItem("clickTimeStamp", clickTimeStamp);*/


//Touchscreen support
var element;
var cvs = document.getElementById('canvas')
var modalHead = document.getElementById('editor-stage')
var modalBody = document.getElementById('editor-slide')
cvs.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });
cvs.addEventListener('touchstart', function(e){
    e.preventDefault();
    sketch = true;
    addClick(event.touches[0].clientX - this.offsetLeft - modalHead.getBoundingClientRect().left, event.touches[0].clientY - this.offsetTop - modalBody.getBoundingClientRect().top);
   // addClick(event.touches[0].pageX - this.offsetLeft - modalHead.getBoundingClientRect().left, event.touches[0].pageY - this.offsetTop - modalBody.getBoundingClientRect().top);
    redraw(context);
    //var coord = event.touches[0].pageX
    var coord = event.touches[0].clientX
    $('#status_ind').html("<h1>touchstart"+coord+" "+sketch+"</h1>");
},{ passive: false });
cvs.addEventListener('touchmove', function(e){
    e.preventDefault();
    if(sketch){
     // addClick(event.touches[0].pageX - this.offsetLeft, event.touches[0].pageY - this.offsetTop, true);
     addClick(event.touches[0].clientX - this.offsetLeft - modalHead.getBoundingClientRect().left, event.touches[0].clientY - this.offsetTop - modalBody.getBoundingClientRect().top); 
     redraw(context);
    }
    //var coord = event.touches[0].pageX
    var coord = event.touches[0].clientX
    $('#status_ind').html("<h1>touchmove"+coord+" "+sketch+"</h1>");
},{ passive: false });
cvs.addEventListener('touchend', function(e){
    $('#status_ind').html("<h1>touchend</h1>");
    e.preventDefault();
    sketch=false;
    repeatIt();
},{ passive: false });
cvs.addEventListener('touchcancel', function(e){
  $('#status_ind').html("<h1>touchcancel</h1>");
    e.preventDefault();
    sketch=false;
},{ passive: false });



function addClick(x, y, dragging)
{
  //Logs the mouse activity where applicable
  clickX.push(x);
  clickY.push(y);
  clickTimeStamp.push(new Date().getTime());
  clickDrag.push(dragging);
  clickColor.push(curColor);
  
}

function redraw(object){
  //Draws the drawing on the canvas "object"
  //object.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  object.strokeStyle = curColor;
  //object.strokeStyle = "rgb(20,20,20)";
  object.lineJoin = "round";
  object.lineWidth = 5;

  for(var i=0; i < clickX.length; i++) {
    object.beginPath();
    if(clickDrag[i] && i){
      object.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       object.moveTo(clickX[i]-1, clickY[i]);
     }
     object.lineTo(clickX[i], clickY[i]);
     object.closePath();
     object.stroke();
     
  }
 
}
function redraw2(object){
  //Draws the drawing on the canvas "object"
  //object.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  object.strokeStyle = curColor;
  //object.strokeStyle = "rgb(20,20,20)";
  object.lineJoin = "round";
  object.lineWidth = 5;

  for(var i=0; i < clickXs.length; i++) {
    object.beginPath();
    if(clickDrags[i] && i){
      object.moveTo(clickXs[i-1], clickYs[i-1]);
     }else{
       object.moveTo(clickXs[i]-1, clickYs[i]);
     }
     object.lineTo(clickXs[i], clickYs[i]);
     object.closePath();
     object.stroke();
     
  }
 
}
function sleep(milliseconds) {
  //Delays the execution for a prescribed milliseconds.
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var j=1;
var i=1;
var clickX_original;
var clickY_original;
var clickX_original2;
var clickY_original2;
var loop_id;
var loop_id2;

function repeater(){
  //Manages repeats
  if(j<clickX_original.length){
    sleep(clickTimeStamp[j]-clickTimeStamp[j-1]);
    clickX = clickX_original.slice(0,j)
    clickY = clickY_original.slice(0,j)
    redraw(context);
  }
  else{
    clearInterval(loop_id);
    clickX = clickX_original;
    clickY = clickY_original;
  }
  j+=1;
  
}

function repeater2(){
  //Manages repeats
  if(i<clickX_original2.length){
    sleep(clickTimeStamps[i]-clickTimeStamps[i-1]);
    clickXs = clickX_original2.slice(0,j)
    clickYs = clickY_original2.slice(0,j)
    redraw2(context);
  }
  else{
    clearInterval(loop_id2);
    clickXs = clickX_original2;
    clickYs = clickY_original2;
  }
  i+=1
}
function SaveAsFile(text,filename) {
  //REF https://github.com/eligrey/FileSaver.js/wiki/FileSaver.js-Example
        try {
            var obj = new Blob([text],{type:"text/plain;charset=utf-8"});
            saveAs(obj, filename);
        } catch (e) {
            console.log("ERROR");
            console.log(e);
            window.open("data:"+"text/plain;charset=utf-8"+"," + encodeURIComponent(text), '_blank','');
        }
    }
function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    //REF https://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html
    var f = evt.target.files[0];

    if (f) {
      var r = new FileReader();
      r.onload = function(e) {

        //Retrieves the file contents
        var contents = e.target.result;
        var datastructure = JSON.parse(contents);

        //Recover data
        clickX = datastructure["clickX"];
        clickY = datastructure["clickY"];
        clickDrag = datastructure["clickDrag"];
        clickTimeStamp = datastructure["clickTimeStamp"];

        //Redraw
        repeatIt();

      }
      r.readAsText(f);
    } else {
      alert("Failed to load file");
    }
  }



function retrieveIt(){
  readSingleFile(null);
  //repeatIt();
}

function repeatIt(){
  //Draw the repeat of the drawing
  clickX_original = clickX;
  clickY_original = clickY;
  loop_id = setInterval(repeater,1);
  //Use setInterval method because JS will not refresh the canvas unless resource was released during the execution.

}
function repeatIt2(){
  //Draw the repeat of the drawing
  clickX_original2 = clickXs;
  clickY_original2 = clickYs;
  loop_id2 = setInterval(repeater2,1);
  //Use setInterval method because JS will not refresh the canvas unless resource was released during the execution.

}




function saveStroke(){

  Array.prototype.push.apply(clickXs,clickX);
  Array.prototype.push.apply(clickYs,clickY);
  Array.prototype.push.apply(clickDrags,clickDrag);
  Array.prototype.push.apply(clickTimeStamps,clickTimeStamp);

  /*clickXs.concat(clickX);
  clickYs.concat(clickY);
  clickDrags.concat(clickDrag);
  clickTimeStamps.concat(clickTimeStamp);*/
 


}
function strokeReplay(){

  saveStroke();
  redraw2(context);
 

  
  repeatIt2();

}
function drawHistory(){
 clickXs.pop();
 clickYs.pop();
clickDrags.pop();
clickTimeStamps.pop();
console.log('donelist : ', clickXs.length);
/*clickXs.length -1;
clickYs.length -1;
clickDrags.length -1;
clickTimeStamps.length -1;*/




}




function clearMainBoard()

 { 
  //context2.setTransform(1, 0, 0, 1, 0, 0);
 //saveStroke();
   context.clearRect(0, 0, mainBoard.width, mainBoard.height);
   //context.restore();
   context.beginPath();
   //tempBoard.width = tempBoard.width;
   clickX = [];
   clickY = [];
   clickDrag = [];
   clickTimeStamp = [];
   

  //context2.closePath();
 }

