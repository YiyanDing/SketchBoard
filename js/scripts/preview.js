
var clickX3=new Array();
var clickY3=new Array();
var clickDrag3=new Array();
var clickTimeStamp3=new Array();
function readJson() {
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

      
     
     
  }



