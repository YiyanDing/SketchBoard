
//document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
//Reference: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
 context2 = document.getElementById('tempBoard').getContext("2d");
//var canvasDiv = document.getElementById('tempDiv');
var tempBoard = document.getElementById('tempBoard');
var modalHead = document.getElementById('modalHead');
var modalBody = document.getElementById('sketching');

var saveTemBtn = document.getElementById('saveTo');
var removeBtn = document.getElementById('id-clear2');


var colorPurple = "#cb3594";
var curSize = 10;
var blackPen = document.getElementById('blackpen');
var redPen = document.getElementById('redpen');
var yellowPen = document.getElementById('yellowpen');
var curColor = colorPurple;
var clickColor = new Array();
var clickSize = new Array();



var clickX2 = new Array();
var clickY2 = new Array();
var clickDrag2 = new Array(); //Records mouse drag event (T/F)
var clickTimeStamp2 = new Array();
var sketch;



var inputElem = document.getElementById('sketchWidth');
var outputElem = document.getElementById('line-width');

addRangeEvt();

blackPen.addEventListener('click', function(e){
  //context2.beginPath();
  
curColor = "#0b1116";
context2.beginPath();



})
redPen.addEventListener('click', function(e){
  
curColor = "#d84561";
context2.beginPath();

})
yellowPen.addEventListener('click', function(e){
 
curColor = "#ffc931";
 context2.beginPath();

})





saveTemBtn.addEventListener('click', function(e){
savePic(context2.canvas)
exportCanvasAsPNG('templatePic')
saveIt();
console.log("hereherehere")
 })

 removeBtn.addEventListener('click', function(e){
 
clearCanvas();
context2.beginPath();
 })
 

 function getBase64Image(img) {
  //REF https://stackoverflow.com/questions/22172604/convert-image-url-to-base64
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}



 
 function savePic(content) {


 

   var strDateUrl = content.toDataURL("image/png"); 
     // pic.src = strDateUrl;
     //tmpUpload('#addTemplate', content);
     //clickXs.appendChild(clickX);

     //clickX = clickXs[0];
     //repeatIt();
 
 
     var temDiv = document.createElement('div');
     temDiv.className = 'tempDiv';
     // 向图片容器里添加元素
     temDiv.setAttribute("style","height: 10px; width: 20px;border: 2px solid #666666; border-radius: 10px; box-shadow: inset 0 0 3px #000;");
     temDiv.innerHTML = '<img class="oImgBox" draggable="true" src="'+strDateUrl+'" />'+
                     '<a href="#" name="temRemove" class="tem-remove" >x</a>'
    




     //Originally DB.js

     var base64ImageContent = strDateUrl.replace(/^data:image\/(png|jpg);base64,/, "");
     var decodeBase64 = function(s) {
         var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
         var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
         for(i=0;i<64;i++){e[A.charAt(i)]=i;}
         for(x=0;x<L;x++){
             c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
             while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
         }
         return r;
      };
      function base64ToBlob(base64, mime)
     {
         mime = mime || '';
         var sliceSize = 1024;
         var byteChars = window.atob(base64);
         var byteArrays = [];

         for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
             var slice = byteChars.slice(offset, offset + sliceSize);

             var byteNumbers = new Array(slice.length);
             for (var i = 0; i < slice.length; i++) {
                 byteNumbers[i] = slice.charCodeAt(i);
             }

             var byteArray = new Uint8Array(byteNumbers);

             byteArrays.push(byteArray);
         }

         return new Blob(byteArrays, {type: mime});
     }
     var blob = base64ToBlob(base64ImageContent, 'image/jpg');
     var name = "Random name";
     var formData = {"clickX":clickX2,"clickY":clickY2,"clickDrag":clickDrag2,"clickTimeStamp":clickTimeStamp2,"picture":base64ImageContent, "name":name};
     console.log("php works here");
     console.log(formData);
     
     $.ajax({
      url: "draw_app.php",
      type: "POST",
      cache: false,
      //contentType: false,
      //processData: true,
      data: formData,
     
    })
          .done(function(e){
              alert('Upload complete');
              console.log(e);
          });




/*var oImgBox = document.createElement("img");
oImgBox.setAttribute("class", "imgBox");

oImgBox.setAttribute("src",strDateUrl);
oImgBox.setAttribute("draggable",true);
oImgBox.setAttribute("style","border: 2px solid #666666; border-radius: 10px; box-shadow: inset 0 0 3px #000;");




oImgBox.setAttribute("width","200px");
oImgBox.setAttribute("height","200px");
oImgBox.setAttribute("position","absolute");
oImgBox.setAttribute("margin-left","20px");
// oImgBox.setAttribute("right","50%");
oImgBox.innerHTML =  '<a href="#" class="tem-remove" id="temremove"   >x</a>'*/

var tmpShowList = document.getElementById('my-tem-list');
insertAfter(temDiv, tmpShowList);


document.getElementById('descriptionText').style.display="none";


var temremove = document.getElementsByClassName("tem-remove")[0];
temremove.addEventListener('click', function(e){
  temDiv.remove();
 temremove.style.display="none";
},false);



                                       
}
function exportCanvasAsPNG(fileName) {

 

  var MIME_TYPE = "image/png";

  var imgURL = context2.canvas.toDataURL(MIME_TYPE);

  var dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}


function insertAfter(newEle, targetEle){
  var parentEle = targetEle.parentNode;
  if(parentEle.lastChild == targetEle){
      parentEle.appendChild(newEle);
  }
  else{
      parentEle.insertBefore(newEle, targetEle.nextSibling);
  }
}


$('#tempBoard').mousedown(function(e){
  //Mouse clicked
 
  sketch = true;
  addClick1(event.layerX, event.layerY);
  //addClick1(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  draw(context2);

});

$('#tempBoard').mousemove(function(e){
  //Mouse is moving
 
if(sketch){ //If mouse was clicked, draw line
  addClick1(event.layerX, event.layerY, true);
 // addClick1(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
  draw(context2);
}

});

$('#tempBoard').mouseup(function(e){
  //If mouse is no longer clicked, do not draw line
 
  sketch = false;
});

$('#tempBoard').mouseleave(function(e){
  //If mouse is pointing outside the canvas, do not draw line
 
  sketch = false;
});


//Touchscreen support
var element;
var cvs2 = document.getElementById('tempBoard')
cvs2.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });
cvs2.addEventListener('touchstart', function(e){
    e.preventDefault();
    sketch = true;
    addClick1(event.touches[0].clientX - this.offsetLeft - modalHead.getBoundingClientRect().left, event.touches[0].clientY - this.offsetTop - modalBody.getBoundingClientRect().top);
  //  addClick1(event.touches[0].pageX - this.offsetLeft, event.touches[0].pageY - this.offsetTop);
    draw(context2);
    var coord = event.touches[0].clientX
   
},{ passive: false });
cvs2.addEventListener('touchmove', function(e){
    e.preventDefault();
    if(sketch){
      addClick1(event.touches[0].clientX - this.offsetLeft - modalHead.getBoundingClientRect().left, event.touches[0].clientY - this.offsetTop - modalBody.getBoundingClientRect().top);
     // addClick1(event.touches[0].pageX - this.offsetLeft, event.touches[0].pageY - this.offsetTop, true);
      draw(context2);
    }
    var coord = event.touches[0].clientX
  
},{ passive: false });
cvs2.addEventListener('touchend', function(e){
  
    e.preventDefault();
    sketch=false;
},{ passive: false });
cvs2.addEventListener('touchcancel', function(e){
 
    e.preventDefault();
    sketch=false;
},{ passive: false });


function addRangeEvt() {
  // var self = this
   inputElem.addEventListener('mouseup', function (e) {
     var value = event.target.value
     curSize = value
     outputElem.innerText = value
   })
 }




function clearCanvas()

 { 
  //context2.setTransform(1, 0, 0, 1, 0, 0);
   
   context2.clearRect(0, 0, tempBoard.width, tempBoard.height);
   context2.restore();
   context2.beginPath();
   tempBoard.width = tempBoard.width;
   clickX2 = [];
   clickY2 = [];
   clickDrag2 = [];
   clickTimeStamp2 = [];

  //context2.closePath();
 }

function addClick1(x, y, dragging)
{
  //Logs the mouse activity where applicable
  clickX2.push(x);
  clickY2.push(y);
  clickTimeStamp2.push(new Date().getTime());
  clickDrag2.push(dragging);
  clickColor.push(curColor);
  clickSize.push(curSize);
}

function draw(object){
  //Draws the drawing on the canvas "object"
 
  //clearCanvas();

  object.clearRect(0, 0, tempBoard.width, tempBoard.height); // Clears the canvas
  
  //object.clearRect(0, 0, context2.canvas.width, context2.canvas.height);
 
  object.strokeStyle = curColor;
  object.lineJoin = "round";
  object.lineWidth = curSize;

  for(var i=0; i < clickX2.length; i++) {
    object.beginPath();
    if(clickDrag2[i] && i){
      object.moveTo(clickX2[i-1], clickY2[i-1]);
     }else{
       object.moveTo(clickX2[i]-1, clickY2[i]);
     }
     object.lineTo(clickX2[i], clickY2[i]);
     object.closePath();
     object.stroke();
  }
}





function SaveAsFile(text,filename) {
  //REF https://github.com/eligrey/FileSaver.js/wiki/FileSaver.js-Example
        try {
            var obj = new Blob([text],{type:"text/plain;charset=utf-8"});
           // var downloadUrl = window.URL.createObjectURL(obj);
            saveAs(obj, filename);
        } catch (e) {
            console.log("ERROR");
            console.log(e);
            window.open("data:"+"text/plain;charset=utf-8"+"," + encodeURIComponent(text), '_blank','');
        }
    }



function saveIt(){
  var output_json = {"clickX":clickX2,"clickY":clickY2,"clickDrag":clickDrag2,"clickTimeStamp":clickTimeStamp2};
  //var downloadUrl = window.URL.createObjectURL(JSON.stringify(output_json));
  
  SaveAsFile(JSON.stringify(output_json),"template.json");
 /*var file = SaveAsFile(JSON.stringify(output_json),"template.json");
  
  var tmpShowList = document.getElementById('my-tem-list');
 insertAfter(file, tmpShowList);*/

}






