$(function () {     
    $(".home_nav a").attr('ontouchstart', 'hover(this)');     
    $(".home_nav a").attr('ontouchend', 'mouseout(this)');

    initPopVideo();
})

function mouseout(obj) {
  obj.className=" "; 
}  
function hover(obj) {  
 obj.className="hover"; 
} 
    //攻略参数定义
    var G_biz = 18;
    var G_Source ='app';
    var search = ""
    var order = "sIdxTime"//初始化排序类型;
    var Page = 1;//初始化页数
    var PageSize = 10;//初始化每页显示多少条
    var Type = "all";//初始化搜索类型
    var TypeId = 0;//初始化搜索类型ID
    var search = "";//初始化模糊搜索内容
    var shtml = "";  //初始化加载更多内容
    var typename =""; 
    var pageTotal = "";
    var G_NewsDetail = 'newCont.shtml';
    if(+GetQueryString('iType')){
        Type = 'iType';
        TypeId = +GetQueryString('iType');
    }
    if(+GetQueryString('iKeyword')){
        Type = 'iKeyword';
        TypeId = +GetQueryString('iKeyword');
    }
    if(GetQueryString('sKeyword')){
        search = decodeURIComponent(GetQueryString('sKeyword'));
    }
     function resize() {
        $(".wrap").css("opacity",0);
        setTimeout(function(){
            if ($(window).height() > $(window).width()) {
                //竖屏
                isLad=false;
                $('html').css("font-size",document.documentElement.clientWidth / 750 * 100 + "px");
                $("#wrap").removeClass('landscape');
                $("#wrap").addClass('portrait');      
                $('.video_mask').height($(document).height());
            }
            else {
               //横屏
               isLad=true;
                $('html').css("font-size",document.documentElement.clientWidth / 1334 * 100 + "px");
                $("#wrap").removeClass('portrait');
                $("#wrap").addClass('landscape');              	 
            }
            $(".wrap").css("opacity",1);
            $(".pop-video").css("opacity",1);
        },50);
    }
    window.onload=function(){
        resize();
        //var scrollH = document.documentElement.scrollHeight;
        //$('.wrap').height(scrollH);
    } 
    //--------首页推荐视频代码-------------
    // QueryTargetInfo(function(data){
    //     var data = data.reclist_230;
    //     var RetHTML = "";
    //     for(var x=0;x<(data.length < 4 ? data.length : 4);x++){
    //         RetHTML += '<li>';
    //         RetHTML +=      '<a href="/m/m201606/'+data[x].sUrl+'" onclick="'+data[x].sLog+'" target="_blank" title="'+data[x].sTitle+'">';
    //         RetHTML +=          '<img src="'+data[x].sIMG+'" /><span class="ico_play"></span><span class="video_title">'+data[x].sTitle+'</span>';
    //         RetHTML +=      '</a>';
    //       	 RetHTML += '<div class="v_infor">';
    //         RetHTML += '<span class="v_num"><span class="ico_video_num"></span>'+data[x]['iTotalPlay']+'</span>';
    //         RetHTML += '<span class="v_time">'+data[x]['sCreated'].substr(5,5)+'</span></div></li>';
    //     }
    //     $('#index_video_list').html(RetHTML);
    //     $('#index_video_list1').html(RetHTML);
    //     $('#index_video_list2').html(RetHTML);
    //     $('#index_video_list3').html(RetHTML);
    // });
    //最新攻略
     //最新攻略
    var i = 0,
        strategyFirst = 1;  
      
    var LoadSubTypeList = function (){
       /* QueryNewsTargetInfo(function(data){
            var data = data.reclist_412;
            if(data.length < 20){
              $('.i-more').hide();
            }
            if(i < data.length){
                $('#index_str_list').append(PushData(data,i,i+5));
                $('#index_str_list1').append(PushData(data,i,i+5));
                $('#index_str_list2').append(PushData(data,i,i+5));
                $('#index_str_list3').append(PushData(data,i,i+5));
                $('#index_str_list4').append(PushData(data,i,i+5));
            }
            else{
                $('.	').hide();
            }*/

            if( strategyFirst == 1 ) {
                window.strategySlide = new IndexSlide('.strategy-slide', true);
            }

            strategyFirst++;
       // });        
    };
	
    var PushData = function (data,num,flag){
        var RetHTML = '';
        var length = data.length > flag ? flag : data.length;
        var clname = '';
        for(var x=num;x<length;x++){
            RetHTML += '<li>';
            RetHTML += '<a href="/m/m201606/'+LinkNewsInfo(data[x]['sUrl'],data[x]['iNewsId'])+'" class="strategy_pic"><img src="'+data[x]['sIMG']+'" alt="'+data[x]['sTitle']+'"/></a>';
            RetHTML += '<div class="strategy_cont"><a href="/m/m201606/'+LinkNewsInfo(data[x]['sUrl'],data[x]['iNewsId'])+'">';            
            RetHTML += '<span  class="strategy_title">'+data[x]['sTitle']+'</span>';
            RetHTML += '<span class="strategy_desc">'+data[x]['sDesc']+'</span>';
            RetHTML += '<span class="strategy_num">'+data[x]['iTotalPlay']+'<span class="ico_read_num"></span></span>';
            RetHTML += '<span class="strategy_time">'+data[x]['sCreated'].substr(5,5)+'</span>';
            RetHTML += '</a></div>';
            RetHTML += '</li>';
        }
        i = i+5;
        return RetHTML;
    };
// LoadSubTypeList();  
/*window.addEventListener("scroll", function(event) {
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if(document.documentElement.scrollHeight == document.documentElement.clientHeight + scrollTop ) {
      LoadSubTypeList();
    }
});*/

function IndexSlide( _container, _variable ) {
    this.container = _container;
    this.variable = _variable || false;
    this.slide;
    this.isFirst = true;
    this.init();
    this.timeout;
}

IndexSlide.prototype = {
    init: function() {
        var self = this;
       
        self.slide = new mo.Slide({
            target: Zepto(self.container + ' .slide-item'),
            direction: 'x',
            event: { 
                'init': function() {
                    Zepto(self.container + ' .slide-nav').on('click', 'li', function() {
                        var index = $(this).index();
                        self.slide.playTo(index);
                    });
                },
                'beforechange': function() {
					
                    var index = 0;
                    if( this.curPage ) {
                        index = this.curPage;
                    }
					
					if(self.container == '.video-slide'){
						if(index == 0){
							getColumNewest('item2');
						}else if(index == 1){
							getNewHeroVideo();
						}else if(index == 2){
							getColumNewest('item1');
						}else if(index == 3){
							getNewMatchVideo();
						}
					}
					/*if(self.container == '.strategy-slide'){
						if(index == 1){
							aaLoadSubTypeList(103,0,1,4); 
						}else if(index == 2){
							aaLoadSubTypeList(111,0,1,4);  
						}else if(index == 3){
							aaLoadSubTypeList(77,0,1,4); 
						}else if(index == 4){
							aaLoadSubTypeList(76,0,1,4); 
						}
					}*/
                    Zepto(self.container + ' .slide-nav li').eq(index).addClass('currentL').siblings().removeClass('currentL');
                },
                'change': function(){
                    clearTimeout(self.timeout);
                    if(self.variable) {
                        var currHeight = Zepto(self.container + ' .slide-content .slide-item').eq(self.slide.curPage).height();
                        
                        if(self.isFirst) {
                            self.isFirst = false;

                            // self.timeout = setTimeout(function(){
                            //     currHeight = Zepto(self.container + ' .slide-content .slide-item').eq(self.slide.curPage).height();
                            //     Zepto(self.container).height( currHeight + 34 );
                            // },500);
                        }else {
                            Zepto(self.container).height( currHeight + 34 );
                        }
                    }
                }
            }
        });

        // self.bind();
    }
}

loadScript("//ossweb-img.qq.com/images/js/zepto/zepto.min.js",function(){
    loadScript("//ossweb-img.qq.com/images/js/motion/slide.v2.0.min.js",function(){
        function initMedia(){
            window.tab1 = new mo.Slide({
                target: Zepto('#slide .slide_content li'),
                touchMove: true,
                autoPlay: true,
                stay: 3000,
                animateTime: 500,
                direction: 'x',
                controller: true
            });   

            window.tab2 = new mo.Slide({
                target: Zepto('#hero-slide .slide_content li'),
                autoPlay: true,
                stay: 3000,
                animateTime: 500,
                direction: 'x',
                controller: true,
                title: { dataWrap: Zepto('#hero-slide .title_content'), delay: 300},
                event: {                
                    'beforechange': function(){
                        Zepto('#hero-slide .title_wrap').animate({
                          opacity: 0.25, 
                          translateY: '50px'
                        }, 300, 'ease-out');
                        window.setTimeout(function(){
                            Zepto('#hero-slide .title_wrap').animate({
                              opacity: 1,
                              translateY: '0'
                            }, 300, 'ease-out')
                        }, 500)
                    }
                }
            });   

            window.entrySlide = new mo.Slide({
                target: Zepto('.home_nav .slide-item'),
                direction: 'x'
            });
            
            window.newsSlide = new IndexSlide('.news-slide');
            $('.news-slide-wrapper').on('click', 'a', function(e) {
                e.preventDefault();

                var url = $(this).attr('href'),
                    type = $(this).data('type');

                switch(type) {
                    case '热门':
                        PTTSendClick('notic','hot_details','热门详情');
                        window.location.href = url;
                        break;
                    case '新闻':
                        PTTSendClick('notic','news_details','新闻详情');
                        window.location.href = url;
                        break;
                    case '公告':
                        PTTSendClick('notic','notice_details','公告详情');
                        window.location.href = url;
                        break;
                    case '活动':
                        PTTSendClick('notic','event_details','活动详情');
                        window.location.href = url;
                        break;
                    case '赛事':
                        PTTSendClick('notic','match_details','赛事详情');
                        window.location.href = url;
                        break;
                    default:
                        return;
                }
            });
           /* QueryTargetInfo(function(data){
                var data = data.reclist_230;
                var RetHTML = "";
                for(var x=0;x<(data.length < 4 ? data.length : 4);x++){
                    RetHTML += '<li>';
                    RetHTML +=      '<a href="/m/m201606/'+data[x].sUrl+'" onclick="'+data[x].sLog+'" target="_blank" title="'+data[x].sTitle+'">';
                    RetHTML +=          '<img src="'+data[x].sIMG+'" /><span class="ico_play"></span><span class="video_title">'+data[x].sTitle+'</span>';
                    RetHTML +=      '</a>';
                    RetHTML += '<div class="v_infor">';
                    RetHTML += '<span class="v_num"><span class="ico_video_num"></span>'+data[x]['iTotalPlay']+'</span>';
                    RetHTML += '<span class="v_time">'+data[x]['sCreated'].substr(5,5)+'</span></div></li>';
                }
                $('#index_video_list').html(RetHTML);
                //$('#index_video_list1').html(RetHTML);
                //$('#index_video_list2').html(RetHTML);
                //$('#index_video_list3').html(RetHTML);
                
                
            });*/
			window.videoSlide = new IndexSlide('.video-slide');
            LoadSubTypeList();
        }
        /*---- 导航轮播 ------*/
        var navJsonfun = function(){
            var i = 0,ShowAdList = new Array();
            $.each(oDaTaNew15223, function(k, v){
              	 ShowAdList.push(v[1]);
                $('#u_adshow_img').append('<li title="'+ decodeURI(v[0]) +'"><a onclick="PTTSendClick(\'ad\',\'btn_' + (i+1) + '\',\'广告' + (i+1) + '\');EAS.ADClick(\'' + v[1] + '\');" target="_blank" href="'+v[1]+'"><img src="http://ossweb-img.qq.com/upload/adw/'+v[2]+'" alt="'+decodeURI(v[0])+'"/></a></li>');        
              i++;
            }); 
            // if (ShowAdList.length == 3) {
            //     var ShowAdStr = ShowAdList.join("|");
            //     if (typeof(EAS.ADShow) == 'function') {
            //         EAS.ADShow(ShowAdStr);
            //     };                            
            // };
            /*----$.each(oDaTaNew15223, function(k, v){
                $('#u_adshow_info').append('<li><p>'+decodeURI(v[0])+'</p><p class="txt">'+decodeURI(v[9]) +'</p></li>');        
            }); ------*/
            // var sreenW = document.documentElement.clientWidth,
            // slide_len = $('#slide .slide_content li').length;
            // $('#slide ul').width(sreenW*slide_len);
            // $('#slide li').width(sreenW);
            initMedia();        
        }

        loadScript("//game.qq.com/time/qqadv/Info_new_15223.js?v="+String(new Date()).split(":")[1],function(){
            navJsonfun();     
          	window.timePoints['2'] = Date.now() - tempTimePoint['1']; //dom ready
           var t = window.timePoints,
            e = "";
            for (var n in t) e += "&" + n + "=" + t[n];
            var i = new Image;
            i.src = "//isdspeed.qq.com/cgi-bin/r.cgi?flag1=7718&flag2=254&flag3=1" + e + "&rd=" + Math.random();
        });   

		 loadScript("//game.qq.com/time/qqadv/Info_new_15756.js?v="+String(new Date()).split(":")[1],function(){  
          	window.timePoints['2'] = Date.now() - tempTimePoint['1']; //dom ready
           var t = window.timePoints,
            e = "";
            for (var n in t) e += "&" + n + "=" + t[n];
            var i = new Image;
            i.src = "//isdspeed.qq.com/cgi-bin/r.cgi?flag1=7718&flag2=254&flag3=1" + e + "&rd=" + Math.random();
        });   
		
        var heroList = [[],[],[],[],[],[]];

        function initHero() {
            $.ajax({
                type: "GET",
                url: HEROLISTURL,        
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    initHeroList( data );
                },
                error: function(err) {
                }
            });  

            var initHeroList = function( data ) {
                $.each(data, function(i, val) {
                    var index = parseInt(val.hero_type) - 1;
                    heroList[index].push(val);
                }); 

                // var zhanshi = '',fashi = '',tanke = '',cike = '',sheshou = '',fuzhu = '';
                var dom = '',
                    domArr = ['','','','','',''],
                    typeArr = ['zhanshi_details','fashi_details','Tank_details','cike_details','sheshou_details','fuzhu_details'],
                    pttName = ['战士详情','法师详情','坦克详情','刺客详情','射手详情','辅助详情'];

                $.each(heroList, function(i, val) {
                    var heroType = i;
                    $.each(val, function(j, obj) {
                        var imgurl = '//game.gtimg.cn/images/yxzj/img201606/heroimg/'+obj.ename+'/';
                        domArr[heroType] += '<li><a href="//pvp.qq.com/m/m201706/herodetail/'+obj.ename+'.html" onclick="PTTSendClick(\'hero\',\'' + typeArr[heroType] + '\',\'' +  pttName[heroType]+ '\');"><img src="'+imgurl+obj.ename+'.jpg" width="91px" alt="'+obj.cname+'"><h3>'+obj.cname+'</h3></a></li>';
                    });
                });
                //$('#hero-hot').html( domArr[4] );
                $('#hero-zhanshi').html( domArr[0] );
                $('#hero-fashi').html( domArr[1] );
                $('#hero-tanke').html( domArr[2] );
                $('#hero-cike').html( domArr[3] );
                $('#hero-sheshou').html( domArr[4] );
                $('#hero-fuzhu').html( domArr[5] );

                heroHot();
            };
            

        }
        initHero();
    });
}); 

/*---- 底部导航 ------*/
$('.home_bottom li').removeClass("currentL").eq(0).addClass("currentL");   
    
   function TGDialogS(e){
        need("biz.dialog-min",function(Dialog){
            Dialog.show({
                id:e,
                bgcolor:'#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
                opacity:50      //弹出“遮罩”的透明度，格式为｛10-100｝，可选
            });
        });
    }
    function closeDialog(){
        need("biz.dialog-min",function(Dialog){
            Dialog.hide();
        });
    } 
	 function isWX(){
        var ua = navigator.userAgent;
        if(ua.match(/MicroMessenger/i) == 'MicroMessenger'){
            return true;
        }else{
            return false;
        }
    }
    function isQQ() {
        var ua= navigator.userAgent;
        if (ua.match(/QQ\//i) == "QQ/") {
            return true;
        } else {
            return false;
        }
    }
    function isIos() {
        var ua = navigator.userAgent;//ios终端
        return  !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }
	 function WeixinJSBridgeReadyCallBack(callBack){
        if(isWX()&&isIos())//必须同时满足微信+IOS系统;
        {
            if(typeof WeixinJSBridge == "object"){
                WeixinJSBridge.invoke('WeixinJSBridgeReady', {}, function(e) {
                    callBack();
                });
            }
            else
            {
                document.addEventListener('WeixinJSBridgeReady', function(e){
                    callBack();
                }, false);
            }
        }
        else
        {
            callBack();
        }
    }//用于微信里面bridge准备完成的时候调用,此时允许自动播放视频/音频;
    function createChannel(cid){
        var video = new tvp.VideoInfo();
        video.setChannelId(cid);

        var player = new tvp.Player();
        player.create({
              width: "100%",
              height: "3.9rem",
              type: 1,
              video: video,
              modId: "mod_player",
              isHtml5UseAirPlay: true,
              isHtml5UseFakeFullScreen: true,
              autoplay: true
        });
        WeixinJSBridgeReadyCallBack(function(){        
            $(".tvp_overlay_play").click();
        });
    }
    var popData = {};

    function popVideo(){
        $("#video_pop").css({"background-repeat":"no-repeat","margin-top":"-2.6rem","margin-left":"-3.68rem"});
        createChannel(cid);
        $('.video_mask').show();
        $('#video_pop').show();
    }
	 $('.pop-video-close').click(function () {
        $('.video_mask').hide();
        $("#mod_player").html("");
        $('#video_pop').hide();   
    });
    
	function initPopVideo() {
        var t = new Date(),
            date = (t.getMonth()+1) + '-' + t.getDate();

        if( localStorage.getItem('popDate') == null ) {
            localStorage.setItem('popDate', date);
        }else {
            if( localStorage.getItem('popDate') != date ) {
                localStorage.setItem('popDate', date);
                localStorage.removeItem('videoPop');
                localStorage.removeItem('imgPop');
            }
        }

        $.ajax({
            type: "GET",
            url: '//pvp.qq.com/webplat/info/news_version3/15592/29401/29402/31565/m11738/index.js',        
            dataType: "script",
            success: function(data) {
                var data = newsIndexData[0];
                cid = data.sUserCreator,
                num = data.length;
                popData.img = data.sInfoImageAbbrAddr;
                popData.popCount = parseInt(data.sSubAuthor);
                if( popData.popCount > 0 ) {
                    if( localStorage.getItem('videoPop') == null ) {
                        popVideo();
                        localStorage.setItem('videoPop', 1);
                    }else {
                        var count = parseInt(localStorage.getItem('videoPop'));
                        if( count < popData.popCount ) {
                            popVideo();
                            count++;
                            localStorage.setItem('videoPop', count);
                        }
                    }
                }else {
                    initPopImg();
                }
            },
            error: function(err) {
            }
        });  
    }

    function initPopImg() {
        $.ajax({
            type: "GET",
            url: '//pvp.qq.com/webplat/info/news_version3/15592/29401/29402/31564/m11738/index.js',        
            dataType: "script",
            success: function(data) {
                var data = newsIndexData[0];
                var imgPopCount = parseInt(data.sSubAuthor);
                if( imgPopCount > 0 ) {
                    if( localStorage.getItem('imgPop') == null ) {
                        showPopImg(data);
                        localStorage.setItem('imgPop', 1);
                    }else {
                        var count = parseInt(localStorage.getItem('imgPop'));
                        if( count < imgPopCount ) {
                            showPopImg(data);
                            count++;
                            localStorage.setItem('imgPop', count);
                        }
                    }
                }   
            },
            error: function(err) {
            }
        });  
    }

    function showPopImg(data) {
        $('.home-pop-link').attr('href', data.sDetailUrl);
        $('.home-pop-img').attr('src',data.sInfoImageAbbrAddr);
        $('#home-pop').show();
    }