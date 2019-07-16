



function allowDrop(ev){
    ev.preventDefault();
}

function drag(ev){
    var dt = ev.dataTransfer;
    dt.effectAllowed = 'move';
    dt.setData('Text', ev.target.id);
    //ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev){
    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    var dt = ev.dataTransfer;
    //dt.effectAllowed = 'move';
   // dt.getData('Text');
    var data=dt.getData("Text");
    ev.target.appendChild(document.getElementById(data));
}
