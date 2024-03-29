// board对象和其方法
class Board {

  constructor() {
    //Dom 对象
    this.canvas = createHiDPICanvas(800,500)
    //this.canvas = createHiDPICanvas(window.innerWidth, window.innerHeight - 60)
    document.getElementById("sketching").appendChild(this.canvas)
    this.clearBtn = sel('#id-clear')
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
    this.colorManager = ColorManager.instance()
    this.ctx = this.canvas.getContext('2d')
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.tool = null
//换图
this.addTem = sel('#showPic')
//运行中常改变的状态
    this.tools = [
      new Pen(this.canvas, this.colorManager, this.updateCurCanvas.bind(this)),
      new Eraser(this.canvas, this.updateCurCanvas.bind(this)),
      new Textarea(this.canvas, this.colorManager, this.updateCurCanvas.bind(this)),
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

    addListener(this.saveTemBtn , 'click', event => {
     //savePic(this.canvas)
saveIt();
console.log("hereherehere")
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
    oImgBox.setAttribute("class", "imgBox");

   oImgBox.setAttribute("src",strDateUrl);
   oImgBox.setAttribute("width","200px");
   oImgBox.setAttribute("height","200px");
   oImgBox.setAttribute("position","absolute");
   oImgBox.setAttribute("margin-left","20px");
  // oImgBox.setAttribute("right","50%");
 
   var tmpShowList = document.getElementById('my-tem-list');
   insertAfter(oImgBox, tmpShowList);
   /*var idPlus =0;
   for (var i=0; i<100; i++)
   {
     idPlus ++;

   }

   oImgBox.setAttribute("id", idPlus);*/
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



  function SaveAsFile(text,filename) {
    //REF https://github.com/eligrey/FileSaver.js/wiki/FileSaver.js-Example
          try {
              var obj = new Blob([text],{type:"text/plain;charset=utf-8"});
              saveAs(obj, filename);
          } catch (e) {
              console.log("ERROR");
              console.log(e);
              window.open("data:"+"text/plain;charset=utf-8"+"," + encodeURIComponent(text), '_blank','');
          }
      }
      function saveIt(){
        var output_json = {"clickX":clickX,"clickY":clickY,"clickDrag":clickDrag,"clickTimeStamp":clickTimeStamp};
        SaveAsFile(JSON.stringify(output_json),"template.json");
      }


  
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
    var dropbtns = selAll('.dropdown .dropbtn')
    dropbtns.forEach( b => {
      addListener(b, 'click', e => {
        dropbtns.forEach(c => {
          c !== b && c.classList.remove('is-selected')
        })
        b.classList.toggle('is-selected')
      })
    })
  
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
 
  handleChatData(chatmsg) {
    chatmsg.isSelfMsg = false
    this.chatroom.addHistory(chatmsg)
  }
}