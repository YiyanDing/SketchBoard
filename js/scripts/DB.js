function myDatabase(){
var url = "draw_app.php";
var image = document.getElementById("testimg");
console.log(image);
var imageSrc = $('#testimg').attr('src'); //<=image can be loaded here
//var image = $('#image-id').attr('src');

var context2 = document.getElementById('tempBoard').getContext("2d");

var base64ImageContent = imageSrc.replace(/^data:image\/(png|jpg);base64,/, "");

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
    var byteChars = window.decodeBase64(base64);
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
var formData = new FormData();
formData.append('picture', blob);
formData.append('name',name);
console.log("php works here");
$.ajax({
    url: url,
    type: "POST",
    cache: false,
    contentType: false,
    processData: false,
    data: formData})
        .done(function(e){
            alert('Upload complete');
        });

    }