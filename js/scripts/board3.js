
//document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
//Reference: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
context = document.getElementById('mainBoard').getContext("2d");
//var canvasDiv = document.getElementById('canvasDiv');
var mainBoard = document.getElementById('mainBoard');
var colorPurple = "#cb3594";
var colorBlack = "#000000";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var curColor = colorBlack;
var clickColor = new Array();
var modalHead = document.getElementById('editor-stage');
var modalBody = document.getElementById('editor-slide');


$('#mainBoard').mousedown(function(e){

  sketch = true;
  addClick(event.layerX, event.layerY);
  //addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw(context);

});

$('#mainBoard').mousemove(function(e){

if(sketch){ //If mouse was clicked, draw line
  addClick(event.layerX, event.layerY, true);
  //addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
  redraw(context);
}

});

$('#mainBoard').mouseup(function(e){
  
  sketch = false;

});

$('#mainBoard').mouseleave(function(e){

  sketch = false;
});
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array(); //Records mouse drag event (T/F)
var clickTimeStamp = new Array();
var temX = new Array();
var temY = new Array();
var tDrag = new Array(); //Records mouse drag event (T/F)
var tTimeStamp = new Array();
var sketch;


var clickXs = new Array();
var clickYs = new Array();
var clickDrags = new Array(); 
var clickTimeStamps = new Array();




//Touchscreen support
var element;
var cvs = document.getElementById('mainBoard')

cvs.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });
cvs.addEventListener('touchstart', function(e){
    e.preventDefault();
    sketch = true;
    var touch = e.touches[0];
   addClick(touch.clientX - this.offsetLeft, touch.clientY - this.offsetTop);
   // addClick(event.touches[0].pageX - this.offsetLeft - modalHead.getBoundingClientRect().left, event.touches[0].pageY - this.offsetTop - modalBody.getBoundingClientRect().top);
    redraw(context);
    
},{ passive: false });
cvs.addEventListener('touchmove', function(e){
    e.preventDefault();
    if(sketch){
     // addClick(event.touches[0].pageX - this.offsetLeft, event.touches[0].pageY - this.offsetTop, true);
     //addClick(event.touches[0].clientX - this.offsetLeft, event.touches[0].clientY - this.offsetTop); 
     var touch = e.touches[0];
    addClick(touch.clientX- this.offsetLeft, touch.clientY  - this.offsetTop);
     redraw(context);
    }

   
},{ passive: false });
cvs.addEventListener('touchend', function(e){
   
    e.preventDefault();
    sketch=false;
    //repeatIt();
},{ passive: false });
cvs.addEventListener('touchcancel', function(e){

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
function redraw2(object, m){
  //Draws the drawing on the canvas "object"
  //object.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  object.strokeStyle = curColor;
  //object.strokeStyle = "rgb(20,20,20)";
  object.lineJoin = "round";
  object.lineWidth = 5;

console.log("here clickXs[m]");
  console.log(clickXs[m]);
  for(var i=0; i < clickXs[m].length; i++) {
    object.beginPath();
    


    if(clickDrags[m][i] && i){
      object.moveTo(clickXs[m][i-1], clickYs[m][i-1]);
     }else{
       object.moveTo(clickXs[m][i]-1, clickYs[m][i]);
     }
     object.lineTo(clickXs[m][i], clickYs[m][i]);
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
var i;
var p;
var clickX_original;
var clickY_original;
var clickX_original2;
var clickY_original2;
var clickX_original3;
var clickY_original3;
var loop_id;
var loop_id2;
var loop_id3;

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
    clickXs = clickX_original2.slice(0,i)
    clickYs = clickY_original2.slice(0,i)
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
function repeatIt2(q){
  //Draw the repeat of the drawing
  clickX_original2 = clickXs[q];
  clickY_original2 = clickYs[q];
  i=1;
  loop_id2 = setInterval(repeater2,1);
  //Use setInterval method because JS will not refresh the canvas unless resource was released during the execution.

}

function redraw3(object,clickX3,clickY3,clickDrag3){
  //Draws the drawing on the canvas "object"
  //object.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  object.strokeStyle = curColor;
  //object.strokeStyle = "rgb(20,20,20)";
  object.lineJoin = "round";
  object.lineWidth = 5;


  for(var i=0; i < clickX3.length; i++) {
    object.beginPath();
    


    if(clickDrag3[i] && i){
      object.moveTo(clickX3[i-1], clickY3[i-1]);
     }else{
       object.moveTo(clickX3[i]-1, clickY3[i]);
     }
     object.lineTo(clickX3[i], clickY3[i]);
     object.closePath();
     object.stroke();
     
  }
 
}


function repeatIt3(clickX3,clickY3,clickD,clickTS){
  //Draw the repeat of the drawing
  clickX_original3 = clickX3;
  clickY_original3 = clickY3;
  clickDrag3 = clickD;
  clickTimeStamp3 = clickTS;
  p=1;
  //console.log(p);
  loop_id3 = setInterval(repeater3,1);


  //Use setInterval method because JS will not refresh the canvas unless resource was released during the execution.

}
function repeater3(){
  //Manages repeats
  if(p<clickX_original3.length){
    sleep(clickTimeStamp3[p]-clickTimeStamp3[p-1]);
    clickX3 = clickX_original3.slice(0,p)
    clickY3 = clickY_original3.slice(0,p)
    redraw3(context,clickX3,clickY3,clickDrag3);
  }
  else{
    clearInterval(loop_id3);
    clickX3 = clickX_original3;
    clickY3 = clickY_original3;
  }
  p+=1;
  //console.log(p);
  
}
function saveTemplateStroke(clickX3, clickY3, clickDrag3, clickTimeStamp3){

  

   if(clickXs[q]){
     clickXs[q] = clickXs[q].concat(clickX3);
     clickYs[q] = clickYs[q].concat(clickY3);
     clickDrags[q] = clickDrags[q].concat(clickDrag3);
     clickTimeStamps[q] = clickTimeStamps[q].concat(clickTimeStamp3);
 
   }
  else{
     clickXs.push(clickX3);
     clickYs.push(clickY3);
     clickDrags.push(clickDrag3);
     clickTimeStamps.push(clickTimeStamp3);
     temX=clickX3;
     temY=clickY3;
     tDrag=clickDrag3;
     tTimeStamp=clickTimeStamp3;
  }
   
  }

   function drawTem(object,m){
    //Draws the drawing on the canvas "object"
    //object.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    object.strokeStyle = curColor;
    //object.strokeStyle = "rgb(20,20,20)";
    object.lineJoin = "round";
    object.lineWidth = 5;
  
    for(var i=0; i < temX.length; i++) {
      object.beginPath();
      if(clickDrag[i] && i){
        object.moveTo(temX[i-1], temY[i-1]);
       }else{
         object.moveTo(temX[i]-1, temY[i]);
       }
       object.lineTo(temX[i], temY[i]);
       object.closePath();
       object.stroke();
       
    }
   
  }


function saveStroke(q){

 /* Array.prototype.push.apply(clickXs,clickX);
  Array.prototype.push.apply(clickYs,clickY);
  Array.prototype.push.apply(clickDrags,clickDrag);
  Array.prototype.push.apply(clickTimeStamps,clickTimeStamp);*/

console.log(clickXs)
  if(clickXs[q]){
    clickXs[q] = clickXs[q].concat(clickX);
    clickYs[q] = clickYs[q].concat(clickY);
    clickDrags[q] = clickDrags[q].concat(clickDrag);
    clickTimeStamps[q] = clickTimeStamps[q].concat(clickTimeStamp);
  }
  else{
    clickXs.push(clickX);
    clickYs.push(clickY);
    clickDrags.push(clickDrag);
    clickTimeStamps.push(clickTimeStamp);
  }
  
// call index of each array

//console.log("clickXs");
  //console.log(clickXs);
  /*clickXs.concat(clickX);
  clickYs.concat(clickY);
  clickDrags.concat(clickDrag);
  clickTimeStamps.concat(clickTimeStamp);*/
 


}
function editStroke(q){

  /* Array.prototype.push.apply(clickXs,clickX);
   Array.prototype.push.apply(clickYs,clickY);
   Array.prototype.push.apply(clickDrags,clickDrag);
   Array.prototype.push.apply(clickTimeStamps,clickTimeStamp);*/
 
 //console.log(clickXs)


   if(clickXs[q]){
     clickXs[q] = clickXs[q].concat(clickX);
     clickYs[q] = clickYs[q].concat(clickY);
     clickDrags[q] = clickDrags[q].concat(clickDrag);
     clickTimeStamps[q] = clickTimeStamps[q].concat(clickTimeStamp);
  
   }
   else{
     clickXs.push(clickX);
     clickYs.push(clickY);
     clickDrags.push(clickDrag);
     clickTimeStamps.push(clickTimeStamp);
  
   }


 var url = "http://localhost/preview.html";
 //document.getElementById('newPage').setAttribute("href",url);
  //var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
  console.log("old url",url);
  //var url = new URL(url_string);
  let params = new URLSearchParams(location.search.slice(1));
  //url = url + "?q=" +document.myform.elements[0].value; 
  url = url + "?x=" +clickX +"&y=" +clickY + "&d=" +clickDrag +"&t=" +clickTimeStamp; 
console.log("new url",url);
document.getElementById('newPage').setAttribute("href",url);
 //var x= url.searchParams.get("x");
 //var x= params.get("x");
 // console.log("almost finished!!!",x);
  
 
 }

function strokeReplay(index){

saveStroke(index); 
drawTem(context,index);

  redraw2(context, index);
 


 
  
//repeatIt2(index);

}





function clearMainBoard()

 { 
  //context2.setTransform(1, 0, 0, 1, 0, 0);
 //saveStroke();
   //context.clearRect(0, 0, mainBoard.width, mainBoard.height);
   //context.restore();
   //context.beginPath();
   //tempBoard.width = tempBoard.width;
   clickX = [];
   clickY = [];
   clickDrag = [];
   clickTimeStamp = [];
   

  //context2.closePath();
 }

 

