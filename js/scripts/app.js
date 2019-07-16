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
SketchCanvas.addEventListener('dragend', handleDragEnd, false);

    var dragSrcEl = null;

  
    function handleDragStart(e) {
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


    
    function handleDrop(e) {
       // if (dragSrcEl) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
            console.log("drop here")
            var data=e.dataTransfer.getData('text');

            var tempShow = document.getElementById('canvasDiv');
//insertAfter(document.getElementById(data), tempShow);
            e.target.appendChild(document.getElementById(data));


            //readSingleFile();
            var contents = e.target.result;
            var datastructure = JSON.parse(contents);
            clickX = datastructure["clickX"];
            clickY = datastructure["clickY"];
            clickDrag = datastructure["clickDrag"];
            clickTimeStamp = datastructure["clickTimeStamp"];
            repeatIt();

            /*if (dragSrcEl != this) {
                dragSrcEl.innerHTML = e.target.innerHTML;
                this.innerHTML = e.dataTransfer.getData('text');
                console.log("Drop Here");
            }*/
       // }
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
      

 
});
