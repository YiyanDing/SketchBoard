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
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array(); //Records mouse drag event (T/F)
var clickTimeStamp = new Array();
var sketch;







var url= window.location.href;
console.log(url);



function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


clickX= getQueryVariable("x").split(",");
console.log("I'm XXXXX", clickX);
clickY= getQueryVariable("y").split(",");
console.log("I'm YYYYY", clickY);
clickDrag= getQueryVariable("d").split(",");
console.log("I'm dragging", clickDrag);
clickTimeStamp= getQueryVariable("t").split(",");
console.log("I'm timing", clickTimeStamp);

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
var clickX_original;
var clickY_original;
var loop_id;

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


  function repeatIt(){
    //Draw the repeat of the drawing
    clickX_original = clickX;
    clickY_original = clickY;
    loop_id = setInterval(repeater,1);
    //Use setInterval method because JS will not refresh the canvas unless resource was released during the execution.
  
  }


//var c = url.searchParams.get("c");
//console.log(c);

/*function readJson() {
    //Retrieve the first (and only!) File from the FileList object
    //REF https://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html
   

   
         var datastructure= JSON.parse(localStorage.getItem("test"));
         console.log('loading sketch');
console.log(datastructure);
        //Recover data
        clickX3 = datastructure["clickX"];
        console.log(clickX3);
        clickY3 = datastructure["clickY"];
        clickDrag3 = datastructure["clickDrag"];
        clickTimeStamp3 = datastructure["clickTimeStamp"];


        $.ajax( {
            url: "index.html", //这里是静态页的地址
            type: "GET", //静态页用get方法，否则服务器会抛出405错误
            success: function(data){
            var result = $(data).find("#mainboard");
            $("#mainBoard").html(result);
            }
            });
        //Redraw
       // repeatIt();

      
     
     
  }*/



