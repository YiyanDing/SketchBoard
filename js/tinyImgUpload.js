/**
 * tinyImgUpload
 * @param ele [string] [生成组件的元素的选择器]
 * @param options [Object] [对组件设置的基本参数]
 * options具体参数如下
 * path 图片上传的地址路径 必需
 * onSuccess(res) 文件上传成功后的回调 参数为返回的文本 必需
 * onFailure(res) 文件上传失败后的回调 参数为返回的文本 必需
 * @return [function] [执行图片上传的函数]
 * 调用方法
 * tinyImgUpload('div', options)
 */
var tmpShowList2 = document.getElementById('tem-list');
function loadingTemplates(){
 
   var temId=0;
    var result = [];
    $.ajax({
        url: "templateloading.php",
        type: "POST",
        cache: false,
        //contentType: false,
        //processData: true,
        
       
    })
            .done(function(e){
               // alert('Templates Uploading complete');


               // console.log("function e");
               // console.log("我是E",e);

               // 这里差一个判断 是否已经存在了模版
                result = e.split(" ");
                for(var i=0;i<result.length;i++){
                    result[i] = result[i].split(",");
                   // console.log("i",i,result[i]);
                  if(i!=0 && i%6 == 0){
                    strDateUrl = result[i-1];  
                    temId = result[i-6][0];
                    //console.log("picsrc ???",result[i-1]); 
                   // console.log("id ???",result[i-6][0]); 
                    var myTemDiv = document.createElement('div');
                    myTemDiv.className = 'tempDiv2'; 
                  // 向图片容器里添加元素
                     myTemDiv.setAttribute("draggable",true);
                     
                     myTemDiv.setAttribute("style","height: 150px; width: 200px;border: 2px solid #666666; border-radius: 10px; box-shadow: inset 0 0 3px #000; margin-bottom: 20px; margin-left: 80px");
                     myTemDiv.innerHTML = '<img class="oImgBox2" draggable="true" id="'+temId+'" src="'+strDateUrl+'" />'
                     insertAfter2(myTemDiv, tmpShowList2);

                   
                  }
             }

             myTemDiv.addEventListener('dragstart', handleDragStart, false);
             var cols = document.querySelectorAll('.oImgBox2');
             //console.log(cols);
             [].forEach.call(cols, function (col) {
             col.addEventListener('dragstart', handleDragStart, false);
             col.addEventListener('dragover', handleDragOver, false);
             col.addEventListener('dragenter', handleDragEnter, false)
             col.addEventListener('dragleave', handleDragLeave, false);

});
           function handleDragStart(e) {
         console.log("我开始啦",e.target.id);
            e.dataTransfer.setData('dragElement', e.target.id);
} 
function handleDragOver(e) {
    if (e.target) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';

    }
}
function handleDragEnter(e) {
    console.log("drag enter",e.target);
    if (e.target) {
        e.target.classList.add('over');
    }
}
function handleDragLeave(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
    if (e.target) {
        console.log("drag leave",e.target);
        e.target.classList.remove('over');
    }
}
     
            });

            document.getElementById('descriptionText').style.display="none";


        
  
  
 
  
  
  
  
 
    
   



}

function insertAfter2(newEle, targetEle){
    var parentEle = targetEle.parentNode;
    if(parentEle.lastChild == targetEle){
        parentEle.appendChild(newEle);
    }
    else{
        parentEle.insertBefore(newEle, targetEle.nextSibling);
    }
  }


/*function tinyImgUpload(ele, options) {
    // 判断容器元素合理性并且添加基础元素

    //document.documentElement.style.fontSize = document.documentElement.clientWidth*0.1+'px';
    var eleList = document.querySelectorAll(ele);
    if(eleList.length == 0){
        console.log('绑定的元素不存在');
        return;
    }else if(eleList.length>1){
        console.log('请绑定唯一元素');
        return;
    }else {
        eleList[0].innerHTML ='<div id="img-container" >'+
                '<div class="img-up-add  img-item"> <span class="img-add-icon">+</span> </div>'+
                '<input type="file" name="files" id="img-file-input" multiple>'+
                '</div>';
        var ele = eleList[0].querySelector('#img-container');
        ele.files = [];   // 当前上传的文件数组
    }

    // 为添加按钮绑定点击事件，设置选择图片的功能
    var addBtn = document.querySelector('.img-up-add');
    addBtn.addEventListener('click',function () {
        document.querySelector('#img-file-input').value = null;
        document.querySelector('#img-file-input').click();
        return false;
    },false)

    // 预览图片
    //处理input选择的图片
    function handleFileSelect(evt) {
        var files = evt.target.files;

        for(var i=0, f; f=files[i];i++){
            // 过滤掉非图片类型文件
            if(!f.type.match('image.*')){
                continue;
            }
            // 过滤掉重复上传的图片
            var tip = false;
            for(var j=0; j<(ele.files).length; j++){
                if((ele.files)[j].name == f.name){
                    tip = true;
                    break;
                }
            }
            if(!tip){
                // 图片文件绑定到容器元素上
                ele.files.push(f);

                var reader = new FileReader();
                reader.onload = (function (theFile) {
                    return function (e) {
                        var oDiv = document.createElement('div');
                        oDiv.className = 'img-thumb img-item';
                        // 向图片容器里添加元素
                        oDiv.innerHTML = '<img class="thumb-icon" draggable="true" src="'+e.target.result+'" />'+
                                        '<a href="#" class="img-remove">x</a>'

                        ele.insertBefore(oDiv, addBtn);
                    };
                })(f);

                reader.readAsDataURL(f);
            }
        }
    }
    document.querySelector('#img-file-input').addEventListener('change', handleFileSelect, false);

    // 删除图片
    function removeImg(evt) {
        if(evt.target.className.match(/img-remove/)){
            console.log('3',ele.files);
            // 获取删除的节点的索引
            function getIndex(ele){

                if(ele && ele.nodeType && ele.nodeType == 1) {
                    var oParent = ele.parentNode;
                    var oChilds = oParent.children;
                    for(var i = 0; i < oChilds.length; i++){
                        if(oChilds[i] == ele)
                            return i;
                    }
                }else {
                    return -1;
                }
            }
            // 根据索引删除指定的文件对象
            var index = getIndex(evt.target.parentNode);
            ele.removeChild(evt.target.parentNode);
            if(index < 0){
                return;
            }else {
                ele.files.splice(index, 1);
            }
            console.log('4',ele.files);
        }
    }
    ele.addEventListener('click', removeImg, false);

    // 上传图片
    function uploadImg() {
        console.log(ele.files);

        var xhr = new XMLHttpRequest();
        var formData = new FormData();

        for(var i=0, f; f=ele.files[i]; i++){
            formData.append('files', f);
        }

        console.log('1',ele.files);
        console.log('2',formData);

        xhr.onreadystatechange = function (e) {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    options.onSuccess(xhr.responseText);
                }else {
                    options.onFailure(xhr.responseText);
                }
            }
        }

        xhr.open('POST', options.path, true);
        xhr.send(formData);

    }
   */

