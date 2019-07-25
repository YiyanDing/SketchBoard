'use strict';

// define angular app (with dependency on Wijmo)
var app = angular.module('app', ['wj']);

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array(); //Records mouse drag event (T/F)
var clickTimeStamp = new Array();
// define app's single controller
app.controller('appCtrl', function ($scope) {

    //-----------------------------------------------------------------------------
    // demonstrate standard HTML5 drag/drop.
    // this is based on the html5rocks tutorial published here:
    // http://www.html5rocks.com/en/tutorials/dnd/basics/

    // hook up event handlers
  var cols = document.querySelectorAll('.oImgBox');
  console.log(cols);
    [].forEach.call(cols, function (col) {
        col.addEventListener('dragstart', handleDragStart, false);
        col.addEventListener('dragenter', handleDragEnter, false)
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragleave', handleDragLeave, false);
       // col.addEventListener('drop', handleDrop, false);
       // col.addEventListener('dragend', handleDragEnd, false);
    });
    /*var cols = document.querySelectorAll('#columns .column');
    [].forEach.call(cols, function (col) {
        col.addEventListener('dragstart', drag, false);
        col.addEventListener('dragenter', handleDragEnter, false)
        col.addEventListener('dragover', handleDragOver, false);
        col.addEventListener('dragleave', handleDragLeave, false);
        //col.addEventListener('drop', handleDrop, false);
      // col.addEventListener('dragend', handleDragEnd, false);
    });*/

  var SketchCanvas = document.getElementById('mainBoard');
   SketchCanvas.addEventListener('drop', handleDrop, false);
SketchCanvas.addEventListener('dragend', handleDropOver, false);

    var dragSrcEl = null;

  
    function handleDragStart(e) {
        console.log("jinlaile",e.target);
        if (e.target.className.indexOf('oImgBox') > -1) {
            dragSrcEl = e.target;
            dragSrcEl.style.opacity = '0.4';
            var dt = e.dataTransfer;
            dt.effectAllowed = 'copy';
            dt.setData('text', dragSrcEl.id);
            console.log("Drag Start");

        
        }
    }
    
    function handleDragOver(e) {
        if (dragSrcEl) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';

        }
    }
    function handleDragEnter(e) {
        console.log("jinlaile",e.target);
        if (dragSrcEl) {
            e.target.classList.add('over');
        }
    }
    function handleDragLeave(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
        if (dragSrcEl) {
            e.target.classList.remove('over');
        }
    }
    function handleDragEnd(e) {
        dragSrcEl = null;
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
        [].forEach.call(cols, function (col) {
            col.style.opacity = '';
            col.classList.remove('over');
        });


        
    }
    function handleDropOver(e)
    {console.log("free location here");
        e.preventDefault();
    }

    
    function handleDrop(e) {
       // if (dragSrcEl) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
           console.log("drop here",e.dataTransfer.getData("dragElement2"))
            var templateid = parseInt(e.dataTransfer.getData("dragElement"));
          // var templateid2 =parseInt(e.dataTransfer.getData("dragElement2"));
            var result = [];
            $.ajax({
                url: "sketch_retrieval.php",
                type: "POST",
                cache: false,
                //contentType: false,
                //processData: true,
                data: {"templateid":templateid},
               
            })
            .done(function(e){
               // alert('Drop complete');
                // console.log("function e");
                //console.log(e);
                result = e.split(" ");
                for(var i=0;i<result.length;i++){
                    result[i] = result[i].split(",");
                   // console.log("i",i,result[i]);
                }
                
                //console.log(result);
                clickX = result[0];
                clickY = result[1];
                clickDrag = result[2];
                clickTimeStamp = result[3];
                repeatIt3( clickX ,clickY,clickDrag, clickTimeStamp);
                //saveTemplateStroke(clickX, clickY, clickDrag, clickTimeStamp);
                

            });
           
            



           
    }
  
      

 
});
