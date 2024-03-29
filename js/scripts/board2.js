// board对象和其方法
class Board2 {

  constructor() {
    //Dom 对象
    var eidtorSlide = document.getElementsByClassName("slide")
    this.canvas = document.getElementById("canvas")
   // this.canvas = createHiDPICanvas(window.innerWidth - 676.5, window.innerHeight - 172)//595
    this.canvas.setAttribute("id","MainBoard")
    this.canvas.setAttribute("margin","0")
    this.canvas.setAttribute("padding","0")
    this.canvas.setAttribute("overflow","visible")
    this.canvas.setAttribute("flex-wrap","wrap")
    this.canvas.setAttribute("id","MainBoard")
    this.canvas.setAttribute("position","relative")
    /*this.canvas.setAttribute("-webkit-box-flex",1)
    this.canvas.setAttribute("-moz-box-flex",1)
    this.canvas.setAttribute("-ms-box-fle",1)
    this.canvas.setAttribute("box-flex",1)
      margin: 0;
  padding: 0;
  overflow: visible;
  display: flex;
  flex-wrap: wrap;
  window.innerWidth, window.innerHeight - 60   
  position: relative;
margin-left: auto;
margin-right: auto;
-webkit-box-flex: 1;
-moz-box-flex: 1;
-ms-box-flex: 1;
box-flex: 1;*/
    //this.canvas = createHiDPICanvas(window.innerWidth, window.innerHeight - 60)
    document.getElementById("editor-slide").appendChild(this.canvas)
    this.clearBtn = sel('#id-clear2')
    this.inviteBtn = sel('#id-invite-btn')
    // 另存为
    this.savePDFBtn = sel('#id-save-pdf')
    this.saveImgBtn = sel('#id-save-img')
    //save as template
    this.saveTemBtn = sel('#saveTo')
    this.addTemBtn = sel('#saving')
    // 放大缩小
    this.scaleBtn = sel('#id-scale')
    this.reduceBtn = sel('#id-reduce')
    this.copyLinkBtn = sel('#id-copy-link')
    this.copyLinkInput = sel('#id-copy-input')
    this.colorManager2 = ColorManager.instance()
    this.ctx = this.canvas.getContext('2d')
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.tool = null
//换图
this.addTem = sel('#showPic')
//运行中常改变的状态
    this.tools = [
      new Pen2(this.canvas, this.colorManager2, this.updateCurCanvas.bind(this)),
      new Eraser2(this.canvas, this.updateCurCanvas.bind(this)),
      new Textarea2(this.canvas, this.colorManager2, this.updateCurCanvas.bind(this)),
    ]
    //
  
    this.drawHistory = new DrawHistory(this)
    var self = this
    //this.init()
    this.setupInputs()
  }



  // 不提供data url是自己更新canvas，行为：
  // 1.send 2.push 进history 3.更新localstorage
  // 否则是接受服务器的dataurl，行为：
  // 1.更新canvas 2.push 进history 3.更新localstorage
  updateCurCanvas(dataurl) {
    if(!dataurl) {
      dataurl = this.canvas.toDataURL()
      this.wsClient.sendObj({type: 'canvas', data: dataurl})
    } else {
      this.drawHistory.drawCanvas(dataurl)
    }
    this.drawHistory.add(dataurl)
    localStorage.setItem(this.wsClient.shareId, dataurl)
  }

  handleCanvasData(data) {
    this.updateCurCanvas(data.data)
  }

  setupInputs() {
    // 清空画布
    addListener(this.clearBtn, 'click', event => {
      this.ctx.clearRect(0, 0, this.width, this.height)
    })
    // 邀请其他人
   /* addListener(this.inviteBtn, 'click', event => {
      this.wsClient.makeInviteRequest()
      this.chatroom.show()
    })
    // 复制邀请地址
    addListener(this.copyLinkBtn, 'click', event => {
      try {
        copyText(this.copyLinkInput)
        this.copyLinkBtn.innerText = "已复制"
      } catch(e) {
        console.log('Oops, unable ')
      }
    })*/
    // 另存为图片和PDF
    addListener(this.saveImgBtn, 'click', event => {
      //original:  downloadFile('download.png', this.canvas.toDataURL())
      //might help: https://www.cnblogs.com/eoooxy/p/6051343.html
      downloadFile('download.png', this.canvas.toDataURL("image/png"))


    })

   

    function savePic(content) {
      var pic  = document.getElementById('showPic');
var pic2 = document.getElementById('showPic');
//document.getElementById("addTemplate").appendChild(pic2);
       // 得到了需要保存的 相关图的信息 格式为:data:image/png;base64,xxxx" 有效的为xxxx部分
       var strDateUrl = content.toDataURL("image/png"); 
         // pic.src = strDateUrl;
         //tmpUpload('#addTemplate', content);
      


var oImgBox = document.createElement("img");
    oImgBox.setAttribute("id", "imgBox");
   oImgBox.setAttribute("src",strDateUrl);
   oImgBox.setAttribute("width","300px");
   oImgBox.setAttribute("height","300px");
   var tmpShowList = document.getElementById('my-tem-list');
   insertAfter(oImgBox, tmpShowList);
   document.getElementById('descriptionText').style.display="none";
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

/*
function buildTmpList (tmpListp){
tmpListp.forEach(function (mid) {
  var li = $('<li class="span2"><a href="#" class="thumbnail"><img></a>' +
      '<p class="clearfix"><button class="btn pull-left" data-action="choose">Choose</button>' +
      '<button class="btn btn-danger pull-right" data-action="remove"><i class="icon-trash"></i></button></p></li>');

  if (mid == oldMid) {
      currentLi = li.addClass('active');
  }
  li.find('img').attr('src', strDateUrl);
  li.find('a').click(function (e) {
      e.preventDefault();
      setCurrentLi(li, mid);
  });
 /* li.find('[data-action="choose"]').click(function () {
      setCurrentLi(li, mid);
      save();
     /* dialog.modal('hide');
  });
  li.find('[data-action="remove"]').click(function (e) {
      e.preventDefault();
      if (li.hasClass('active')) {
          newMid = '$';
      }
      li.remove();
      dataManager.removeMedia(mid);
      checkMediaListEmpty();
  });

  tmpList.append(li);
});
//return 
}
    

   }
/*
function tmpUpload (tmpList){
  var tmpList = $('#my-tem-list');
  var tmpListHolder = $('#my-tem-list-holder');
  var currentLi;
  var oldMid;
  var newMid;

  function setCurrentLi(li, mid) {
    if (currentLi) {
        currentLi.removeClass('active');
    }
    currentLi = li.addClass('active');

    newMid = mid;
}
  function checkMediaListEmpty() {
    if (tmpList.find('li').length == 0) {
        tmpList.hide();
        tmpListHolder.show();
    }
    else {
        tmpList.show();
        tmpListHolder.hide();
    }
}
function buildMeidaList(mediaList) {
  tmpList.empty();

  mediaList.forEach(function (mid) {
      var li = $('<li class="span2"><a href="#" class="thumbnail"><img></a>' +
          '<p class="clearfix"><button class="btn pull-left" data-action="choose">Choose</button>' +
          '<button class="btn btn-danger pull-right" data-action="remove"><i class="icon-trash"></i></button></p></li>');

      if (mid == oldMid) {
          currentLi = li.addClass('active');
      }
      li.find('img').attr('src', dataManager.readMedia(mid));
      li.find('a').click(function (e) {
          e.preventDefault();
          setCurrentLi(li, mid);
      });
     
      li.find('[data-action="remove"]').click(function (e) {
          e.preventDefault();
          if (li.hasClass('active')) {
              newMid = '$';
          }
          li.remove();
          dataManager.removeMedia(mid);
          checkMediaListEmpty();
      });
      imgList.append(li);
  });

  checkMediaListEmpty();
}


}
    addListener(this.saveTemBtn, 'click', event => {
      //original:  downloadFile('download.png', this.canvas.toDataURL())
      //might help: https://www.cnblogs.com/eoooxy/p/6051343.html
      downloadFile('download.png', this.canvas.toDataURL("image/png"))


    })*/
  
    // 放大缩小
    addListener(this.scaleBtn ,'click', event => {
      log('scale')
      this.scaleBoard(1.2)
    })
    addListener(this.reduceBtn, 'click', event => {
      this.scaleBoard(0.8)
    })
    //点击导航栏，切换工具
    this.tools.forEach( tool => {
      addListener(tool.elem, 'click', event => {
        // this.changeTool(tool)
        this.tools.forEach( t => {
          t === tool ? t.isSelected = true : t.isSelected = false
        })
      })
    })
    // 控制导航栏下拉菜单的显示
    var dropbtns = selAll('.dropdown2 .dropbtn')
    dropbtns.forEach( b => {
      addListener(b, 'click', e => {
        dropbtns.forEach(c => {
          c !== b && c.classList.remove('is-selected')
        })
        b.classList.toggle('is-selected')
      })
    })
   /*  // 关闭邀请modal
    addListener(sel('#id-close-modal'), 'click', e => this.inviteBtn.classList.remove('is-selected'))
   // 点击聊天窗口意外区域关闭聊天窗口
    addListener(document, 'click', e => {
      var chatMain = sel('.chat')
      var a = sel('#id-chat-toggle')
      if( e.target === chatMain ||  chatMain.contains(e.target)) {
        return
      }
      a.checked = false
    })*/
  }
  // 缩小/放大画布
  scaleBoard(ratio) {
    // var ratio = 1.2
    // ratio 为大于1时， 放大
    var img = new Image
    var canvasWidth = Number(this.canvas.style.width.replace('px',''))
    var canvasHeight = Number(this.canvas.style.height.replace('px',''))
    var sx = canvasWidth * (ratio - 1) / 2
    var sy = canvasHeight * (ratio - 1) / 2
    var sw = canvasWidth * ratio
    var sh = canvasHeight * ratio

    img.onload = () => {
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.ctx.drawImage(img, -sx, -sy, sw, sh)
    }
    img.src = this.canvas.toDataURL('image/png', 1.0)
  }
 /*init() {
    var self = this
    this.wsClient.callback = function(data) {
      if(data instanceof Blob) {
        self.chatroom.handleAudio(data)
        return
      }
      try {
        data = JSON.parse(data)
        switch(data.type) {
          case 'canvas':
            self.handleCanvasData(data)
            break
          case 'chatinfo':
          case 'chatmsg':
            self.handleChatData(data)
            break
          case 'message':
            log('message: ', data)
            break
          case 'audio':
            self.chatroom.handleAudio(data)
            break
          default:
            console.log('Sorry, we are out of ' + data.type + '.')
        }
      } catch(e) {
        log('invalid json data: ', e)
      }
    }
    var canvasDataURL = localStorage.getItem(this.wsClient.clientId)
    if(canvasDataURL) {
      this.drawHistory.add(canvasDataURL)
      this.drawHistory.drawCanvas(canvasDataURL)
    }
 }*/
  handleChatData(chatmsg) {
    chatmsg.isSelfMsg = false
    this.chatroom.addHistory(chatmsg)
  }
}