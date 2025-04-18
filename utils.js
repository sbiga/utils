var script = document.createElement('script');
var myStyle = document.createElement('link');
script.src = "https://code.jquery.com/jquery-3.6.3.min.js";
myStyle.href = "https://big-it.com.ar/mymsg/styles.css";
myStyle.rel = "stylesheet";
document.getElementsByTagName('head')[0].appendChild(script);
document.getElementsByTagName('head')[0].appendChild(myStyle);
let Big = {
    styles: {
        titleBg: "transparent",
        titleColor: "#444",
        modalBg: "white",
        modalColor: "#444",
        confirmBg: "#5f8196",
        confirmColor: "white",
        cancelBg: "gray",
        cancelColor: "white",
        otherBg: "darkred",
        otherColor: "white"
    },
    
    closeModal: function(id){
        $("#" + id).addClass("msgExit");
            setTimeout(function(){
                $("#" + id).remove();
                $("#" + id + "_bg").remove();
            }, 180);
    },
    myMsg: function(params){
        var showConfirm = true;
        var showCancel = false;
        var showOther = false;
        var confirmText = "Ok";
        var cancelText = "Cancel";
        var otherText = "Other";
        
        var result = {
            isConfirmed: false,
            isOther: false,
            value: null,
        };
        return new Promise(function (resolve, reject) {
            if(params.showConfirm === false) showConfirm = params.showConfirm;
            if(params.showCancel) showCancel = params.showCancel;
            if(params.showOther) showOther = params.showOther;
            if(params.confirmText) confirmText = params.confirmText;
            if(params.cancelText) cancelText = params.cancelText;
            if(params.otherText) otherText = params.otherText;
            
            var msgTitleText = typeof params === "object" ? params.title : params;
            primaryColor = params.primaryColor ? params.primaryColor : Big.styles.primaryColor;
            modalBg = params.modalBg ? params.modalBg : Big.styles.modalBg;
            modalColor = params.modalColor ? params.modalColor : Big.styles.modalColor;
            confirmBg = params.confirmBg ? params.confirmBg : Big.styles.confirmBg;
            confirmColor = params.confirmColor ? params.confirmColor : Big.styles.confirmColor;
            titleBg = params.titleBg ? params.titleBg : Big.styles.titleBg;
            titleColor = params.titleColor ? params.titleColor : Big.styles.titleColor;
            cancelBg = params.cancelBg ? params.cancelBg : Big.styles.cancelBg;
            cancelColor = params.cancelColor ? params.cancelColor : Big.styles.cancelColor;
            otherBg = params.otherBg ? params.otherBg : Big.styles.otherBg;
            otherColor = params.otherColor ? params.otherColor : Big.styles.otherColor;
            var bg = $(document.createElement("div")).addClass("showMsgBG").appendTo("body").hide();
            var popUp = $(document.createElement("div")).addClass("showMsgPopUp").css({"background":modalBg,"color":modalColor}).appendTo("body");
            if(params.modalBgImage) popUp.css({"background-image": "url('" + params.modalBgImage + "')","background-size":"cover"});
            if(params.id) popUp.attr("id", params.id);
            if(params.id) bg.attr("id", params.id + "_bg");
            
            if(params.icon){ 
                var msgIcon = $(document.createElement("img")).addClass("msgIcon").attr("src","https://big-it.com.ar/mymsg/images/" + params.icon + ".svg").appendTo(popUp);
                msgIcon.on("error", function(){
                    $(this).remove();
                });
            }
            var msgTitle = $(document.createElement("div")).addClass("showMsgTitle").text(msgTitleText).css({"background":titleBg,"color":titleColor});
            if(params.title || typeof params !== "object") msgTitle.appendTo(popUp);
            var popUpText = $(document.createElement("div")).addClass("showMsgPopUpText").css({"color":modalColor});
            if (params.text) popUpText.text(params.text).appendTo(popUp);
            
            if(params.input){
                var inputValue;
                switch (params.input){
                    case "text":
                        inputValue = $(document.createElement("input")).addClass("textInput").appendTo(popUp);
                    break;
                    case "password":
                        inputValue = $(document.createElement("input")).attr("type", "password").addClass("textInput").appendTo(popUp);
                    break;
                    case "number":
                        inputValue = $(document.createElement("input")).attr("type", "number").css("width","auto").addClass("textInput").appendTo(popUp);
                    break;
                }
            }
            if(params.html){
                popUpText.html(params.html).appendTo(popUp);
                
            }
            var buttonsDiv = $(document.createElement("div")).addClass("msgButtonsDiv").appendTo(popUp);
            
            if(showConfirm){
                var confirmBtn = $(document.createElement("input")).attr("type","button").addClass("showMsgBtn").css({"background":confirmBg, "color":confirmColor}).prop("value", confirmText).appendTo(buttonsDiv);
                confirmBtn.click(function(){
                    result.isConfirmed = true;
                    if(params.input) result.value = inputValue.val();
                    popUp.addClass("msgExit");
                    setTimeout(function(){
                        popUp.remove();
                        bg.remove();
                    }, 180);
                    resolve(result);
                });
            }
            if(showCancel){
                var cancelBtn = $(document.createElement("input")).attr("type","button").addClass("showMsgBtn").css({"background":cancelBg, "color":cancelColor}).prop("value", cancelText).appendTo(buttonsDiv);
                cancelBtn.click(function(){
                    if(params.input) result.value = inputValue.val();
                    popUp.addClass("msgExit");
                    setTimeout(function(){
                        popUp.remove();
                        bg.remove();
                    }, 180);
                    resolve(result);
                });
            }
            if(showOther){
                var otherBtn = $(document.createElement("input")).attr("type","button").addClass("showMsgBtn").css({"background":otherBg, "color":otherColor}).prop("value", otherText).appendTo(buttonsDiv);
                otherBtn.click(function(){
                    if(params.input) result.value = inputValue.val();
                    result.isOther = true;
                    popUp.addClass("msgExit");
                    setTimeout(function(){
                        popUp.remove();
                        bg.remove();
                    }, 180);
                    resolve(result);
                });
            }
            if(params.timer){
                setTimeout(function(){
                    popUp.addClass("msgExit");
                    setTimeout(function(){
                        popUp.remove();
                        bg.remove();
                    }, 180);
                    resolve(result);
                },params.timer);
            }
            bg.click(function(){
                popUp.addClass("msgExit");
                setTimeout(function(){
                    popUp.remove();
                    bg.remove();
                }, 180);
                resolve(result);
            });
            bg.fadeIn(80);
        });
    },
    carousel: function(params){
        var container = params.containerId ? $("#" + params.containerId): $("body");
        var timer = params.timer ? params.timer: 5000;
        var speed = params.speed ? params.speed: 500;
        var mainContainer = $(document.createElement("div")).css("position","relative").appendTo(container);
        var picsContainer = $(document.createElement("div")).addClass("big-carousel-picsContainer").appendTo(mainContainer);
        var arrowLeft = $(document.createElement("div")).addClass("big-carousel-arrowLeft").text("<").appendTo(mainContainer).hide();
        var arrowRight = $(document.createElement("div")).addClass("big-carousel-arrowRight").text(">").appendTo(mainContainer).hide();
        mainContainer.mouseenter(function(){
            arrowLeft.fadeIn();
            arrowRight.fadeIn();
            clearInterval(interval);
        });
        mainContainer.mouseleave(function(){
            arrowLeft.fadeOut();
            arrowRight.fadeOut();
            interval = setInterval(function(){
                arrowRight.click();
            },timer);
        });
        var picsDiv = $(document.createElement("div")).appendTo(picsContainer);
        var picsN = 0;
        $.each(params.pics, function(id, pic){
            var picDiv = $(document.createElement("div")).addClass("big-carousel-picContainer").css({"width": picsContainer.width() + "px"}).appendTo(picsDiv)
            picDiv.css({"background-image": "url(" + pic.url + ")"})
            picsN++;
        });
        arrowRight.click(function(){
            picsContainer.stop().animate({
                scrollLeft: picsContainer.scrollLeft() + picsContainer.width()}
                , speed, 'swing', function(){
                    var clonedPic = $(".big-carousel-picContainer:first").clone();
                    clonedPic.appendTo(picsDiv);
                    $(".big-carousel-picContainer:first").remove();
                    picsContainer.scrollLeft(0);
            });
        });
        arrowLeft.click(function(){
            var clonedPic = $(".big-carousel-picContainer:last").clone();
            picsDiv.prepend(clonedPic);
            picsContainer.scrollLeft(picsContainer.width());
            $(".big-carousel-picContainer:last").remove();
            picsContainer.stop().animate({
                scrollLeft: picsContainer.scrollLeft() - picsContainer.width()}
                , 500, 'swing');
        });
        picsDiv.css({"height":"100%","width":picsContainer.width() * picsN + "px"});
        
        var interval = setInterval(function(){
            arrowRight.click();
        },timer);
    }
};