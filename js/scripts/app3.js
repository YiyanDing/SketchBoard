function init() 
        {
            var dest = document.getElementById("droptarget");
            dest.addEventListener("dragover", function(ev) 
            {
                ev.stopPropagation();
                ev.preventDefault();
            }, false);
        
            dest.addEventListener("dragend", function(ev) 
            {
                ev.stopPropagation();
                ev.preventDefault();
            }, false);
        
            dest.addEventListener("drop", function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                console.log(ev.dataTransfer)
                var file = ev.target.files[0];
                var reader = new FileReader();
        
                if (file.type.substr(0, 5) == "image") {
                    reader.onload = function (event) {
                        dest.style.background = 'url(' + event.target.result + ') no-repeat center';
                        dest.innerHTML = "";
                        var _img_src = ev.target.result;
                        showPrevImg(dest,_img_src);
                    };
                    //reader.readAsDataURL(file);
                    reader.readAsDataURL(ev.dataTransfer.files[0])
                }
                else if (file.type.substr(0, 4) == "text") {
        
                    reader.readAsText(file);
                    reader.onload = function (f) {
                        dest.innerHTML = "<pre>" + this.result + "</pre>";
                        dest.style.background = "white";
                    }
                }
                else {
                    dest.innerHTML = "暂不支持此类文件的预览";
                    dest.style.background = "white";
                }
            }, false);

            //图片预览处理函数
function showPrevImg(dest,_img_src){
    //添加预览图片到容器框
    var _imgs = dest.getElementsByTagName('img');
    //容器中没有则创建，有则修改 src 属性
    if(!_imgs.lenght){
        _imgs[0] = document.createElement('img');
        _imgs[0].setAttribute('src',_img_src);
        dest.appendChild(_imgs[0]);
    }else{
        _imgs[0].setAttribute('src',_img_src);
    }
        }
    }
        
        //设置页面属性，不执行默认处理（拒绝被拖放）
        document.ondragover = function(e){e.preventDefault();};
        document.ondrop = function(e){e.preventDefault();}

        window.onload=init;