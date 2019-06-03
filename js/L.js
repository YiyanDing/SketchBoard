(function(w){

    var L = w.L ? w.L : {};

    L.Dialog = function(selector){

        if (L.Dialog.cache[selector]){
return L.Dialog.cache[selector];
        }
var dialogDiv = document.querySelector(selector);
var title = dialogDiv.getAttribute('title');
var dialogCover = document.createElement('div');
dialogCover.className="dialogCover";
dialogCover.style.display= "none";
document.body.appendChild(dialogCover);
if (!dialogDiv){

    return null;
}
var strHtml = "";
strHtml += ' <div class="sketchDialog" >';
strHtml += '   <div class="dialog-h"> ';
strHtml += '<h3>' +title +'</h3>';
strHtml += ' <i class="btn-close" >X</i>'
strHtml += '</div>'
strHtml +='<div class="dialog-b">'
strHtml += dialogDiv.innerHTML;
strHtml +='</div>'
strHtml +='</div>'
dialogDiv.innerHTML = strHtml;

var dialog = {
    title: title,
    dialogDiv : dialogDiv,
    dialogCover : dialogCover,
    show: function() {
        this.dialogDiv.style.display ="block";
    this.dialogCover.style.display = "block";
 
    var self = this;
    var btnClose = dialogDiv.querySelector('.btn-close');
    btnClose.onclick = function (){
    self.close();}
},  
    close: function () {

    this.dialogCover.style.display = "none";
    this.dialogDiv.style.display ="none";
    var self = this;
    var btnClose = dialogDiv.querySelector('.btn-close');
    btnClose.onclick = null;

}
};
L.Dialog.cache[selector]=dialog;
return dialog;
    }

    L.Dialog.cache ={};
w.L = L;
})(window || {});