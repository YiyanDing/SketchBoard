var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

};

var droptarget = document.getElementById("droptarget");
var img = document.images[0];

function handleEvent(event) {
    document.getElementById("output").innerHTML += event.type + "<br>";
    switch (event.type) {
    case "dragstart":
    case "draggesture":
        event.dataTransfer.dropEffect = "move";
        break;
    case "dropenter":
    case "dragover":
        EventUtil.preventDefault(event);
        event.dataTransfer.effectAllowed = "move";
        break;
    case "drop":
    case "dragdrop":
        droptarget.innerHTML = event.dataTransfer.getData("text") ;
    
    }

}

EventUtil.addHandler(droptarget, "dragenter", handleEvent);
EventUtil.addHandler(droptarget, "dragover", handleEvent);
EventUtil.addHandler(droptarget, "dragleave", handleEvent);
EventUtil.addHandler(droptarget, "drop", handleEvent);

EventUtil.addHandler(img, "dragstart", handleEvent);