$(function() {
    cityBtnHover();
    listHover();
    magnifyPic();
    subwayPicChange();
    searchTabs();
    recommendPicChange();
    shopChange();
    updateScroll();
    backToTop();
    calendarListen()
    $(".scrollUpdate .arrowDown").click(function() {
        resetUpdate("down");
    });
    $(".scrollUpdate .arrowUp").click(function() {
        resetUpdate("up");
    });
    $(".life a").click(function(event) {
        var scrollTop = $(window).scrollTop();
        $("body").animate({
            'scrollTop': scrollTop
        }, 500);
    });
});
// 顶部导航栏城市按钮点击监听
function cityBtnHover() {
    $(".header-top>button:first-of-type").css("color", "red");
    $(".header-top>button").click(function() {
        $(this).css("color", "red");
        $(this).siblings('button').css("color", "#7f7a7a")
    })
}
// 论坛和折扣店列表悬浮切换样式
function listHover() {
    $(".forum-content>div").hover(function() {
        var theHover = $(this);
        theHover.siblings().each(function() {
            $(this).removeClass().addClass('topic');
        });
        theHover.removeClass('topic').addClass('topic-focus');
    });
    $(".discountShop-content>li").hover(function() {
        var theHover = $(this);
        theHover.siblings().each(function() {
            $(this).removeClass().addClass('shopList');
        });
        theHover.removeClass().addClass('shopList-focus');
    });
}
// 地铁按钮切换地铁图片监听
function subwayPicChange() {
    $(".subway-btns>button").click(function() {
        var id = $(this).attr('id');
        $(this).css({
            "color": "red"
        }).siblings().css({
            "color": "black"
        });
        var count = id.charAt(id.length - 2) + id.charAt(id.length - 1);
        var path = "img/subway" + count + ".png";
        $(".subway-map>img").attr("src", path);
    })
}
// 地铁图片点击放大
function magnifyPic() {
    $(".subway-map>img").click(function() {
        // body内容溢出隐藏,禁用滚动条
        $("body").css('overflow', 'hidden');
        // 获取图片路径
        var path = $(this).attr('src');
        // 获取点击图片宽度和高度
        var img = new Image();
        img.src = path;
        var width = $(window).width() / 2; //img.width;
        var height = $(window).height() / 2; //img.height;
        // 新增元素至body标签最后
        var magnify = "<div id='magnify'><img src='" + path + "'/><div id='close'></div></div>";
        $("body").append(magnify);
        // 设置新增元素样式
        $("#magnify>img").css({
            "width": width,
            "margin-left": -(width / 2) + "px",
            "margin-top": -(height / 2) + "px"
        });
        // 鼠标滚轮图片缩放监听
        var center = "true";
        $("#magnify").mousewheel(function(event, center) {
            var img = $(this).children('img');
            var widthArr = img.css("width").split('p');
            if (1 == event.deltaY) {
                var currentwidth = parseInt(widthArr[0]) + event.deltaFactor;
                if (currentwidth > 4000) return;
                img.css("width", currentwidth + "px");
                var heightArr = img.css("height").split('p');
                var currentHeight = heightArr[0];
                // 重设图片定位,使图片居中
                img.css({
                    "margin-left": -(currentwidth / 2) + "px",
                    "margin-top": -(currentHeight / 2) + "px"
                })
            } else if (-1 == event.deltaY) {
                var currentwidth = parseInt(widthArr[0]) - event.deltaFactor;
                if (currentwidth < 450) return;
                img.css("width", currentwidth + "px");
                var heightArr = img.css("height").split('p');
                var currentHeight = heightArr[0];
                // 重设图片定位,使图片居中
                img.css({
                    "margin-left": -(currentwidth / 2) + "px",
                    "margin-top": -(currentHeight / 2) + "px"
                })
            }
        });
        // 鼠标拖动图片 移动图片位置
        $("#magnify img").mousedown(function(ed) {
            var oldPageX = ed.pageX;
            var oldPageY = ed.pageY;
            var img = $(this);
            $(this).mousemove(function(em) {
                $(this).css("cursor", "move");
                shiftX = em.pageX - oldPageX;
                shiftY = em.pageY - oldPageY;
                // 获取原始左、上外边距
                var oldMargin_left = parseInt((img.css('margin-left').split('p'))[0]);
                var oldMargin_top = parseInt((img.css('margin-top').split('p'))[0]);
                // 计算新的做、上外边距
                var newMargin_left = oldMargin_left + shiftX;
                var newMargin_top = oldMargin_top + shiftY;
                img.css({
                    "margin-left": newMargin_left + "px",
                    "margin-top": newMargin_top + "px"
                })
                oldPageX = em.pageX;
                oldPageY = em.pageY;
                em.preventDefault();
                // 松开鼠标 解绑移动图片监听
                $("#magnify img").mouseup(function() {
                    $(this).unbind('mousemove');
                    $(this).css("cursor", "url('img/Arrow.cur'),auto");
                });
            });
        });
        // 右上角关闭按钮点击监听
        $("#magnify>#close").click(function() {
            $("#magnify").remove();
            $("body").css('overflow', 'auto');

        });
        // //再次点击图片关闭放大效果
        // $("#magnify>img").click(function() {
        //     $("#magnify").remove();
        //     $("body").css('overflow', 'auto');
        //
        // });
    })
}
// 搜索标签选择
function searchTabs() {
    $(".search-type>div").click(function() {
        var type = $(this).text();
        // 根据鼠标悬浮在哪个标签上，设置相应的文本
        switch (type) {
            case '搜店':
                placeholder = "例如:荷塘鱼坊烤鱼 或 樱花日本料理";
                info = "金钱豹、大江南、湘水之珠、德玉楼、荷塘鱼坊烤鱼、SOHO尚都、湘味楼...";
                break;
            case '地址':
                placeholder = "例如:北京一路 或 朝阳房地产";
                info = "潮汕、老北京、兰州、新疆...";
                break;
            case '优惠劵':
                placeholder = "例如:京东优惠劵 或 淘宝优惠劵";
                info = "京东优惠劵、唯品会优惠劵、天猫优惠劵、聚美优品优惠劵...";
                break;
            case '全文':
                placeholder = "例如:每日活动 或 精彩推荐";
                info = "Vivo X7、OPPO、魅族、小米、老店换新颜...";
                break;
            case '视频':
                placeholder = "例如:酒店全景 或 红人烧客";
                info = "酒店航拍、网络红人视频、活动视频...";
                break;
            default:
                placeholder = "例如:荷塘鱼坊烤鱼 或 樱花日本料理";
                info = "金钱豹、大江南、湘水之珠、德玉楼、荷塘鱼坊烤鱼、SOHO尚都、湘味楼...";
        }
        $(this).css({
            "background-color": "rgb(255, 28, 2)"
        });
        $(".search-box>input").attr({
            'search-type': type,
            'placeholder': placeholder
        });
        $(".search-info").text(info);
        $(this).siblings().css({
            "background-color": "rgb(252, 252, 252)"
        })
    })
}
// 精彩推荐面板图片切换
function recommendPicChange() {
    $(".recommend-pic div[name='recommend-picSet'] img").click(function() {
        var path = $(this).attr('src');
        var info = $(this).attr('alt');
        $(".recommend-pic div[name='pic'] img").attr('src', path);
        $(".recommend-pic div[name='pic'] span").text(info);
    })
}
// 店铺面板切换
function shopChange() {
    $(".hotShop div[class$='tab']").click(function(event) {
        $(this).css({
            "border-bottom": "none"
        }).children('span:first-of-type').css("color", "red");
        $(this).children('.arrowDown').css('border-color', 'red transparent transparent transparent');
        $(this).siblings("div[class$='tab']").css('border-bottom', '1px solid rgba(190, 190, 190, 0.5)')
            .children('span:first-of-type').css("color", "gray")
            .nextAll('.arrowDown').css('border-color', 'lightgray transparent transparent transparent');
        if ($(this).attr('class') == "left-tab") {
            $(".hotShop-content[name='HOT-SHOP']").css('display', 'block');
            $(".hotShop-content[name='NEW-SHOP']").css('display', 'none');
        } else {
            $(".hotShop-content[name='HOT-SHOP']").css('display', 'none');
            $(".hotShop-content[name='NEW-SHOP']").css('display', 'block');
        }
    });
}
// 更新信息自动滚动动画
function updateScroll() {
    $(".scroll-pane").animate({
        "top": "-18px"
    }, 1500, function() {
        resetUpdate("down")
    });
}
// 根据direction将滚动面板里的第一个或最后一个插入相应的位置，然后重置top属性并继续动画
function resetUpdate(direction) {
    if ("up" == direction) {
        $(".scroll-pane div:last-of-type").prependTo('.scroll-pane');
    } else if ("down" == direction) {
        $(".scroll-pane div:first-of-type").appendTo('.scroll-pane');
    }
    $(".scroll-pane").delay(1000);
    $(".scroll-pane").css("top", "0");
    updateScroll();
}
// 返回顶部按钮监听
function backToTop() {
    //滑动回顶部
    $(".back-to-top").click(function() {
        $("html,body").animate({
            'scrollTop': 0
        }, 500);
    });
    //判断是否滑动超过临界值，超过则淡出显示按钮，否则淡入隐藏按钮
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $(".back-to-top").fadeIn(500);
        } else if ($(window).scrollTop() < 50) {
            $(".back-to-top").fadeOut(500);
        }
    });
}
// 每日活动日历点击切换
function calendarListen() {
    $(".activity-calendar>table td").each(function() {
        if ($(this).text() == 25 || $(this).text() == 4) {
            var goodsIntro = $(".goodsIntro");
            goodsIntro_day = goodsIntro.children('span[name=day]');
            goodsIntro_theme = goodsIntro.children('span[name=theme]');
            goodsIntro_intro = goodsIntro.children('span[name=intro]');
            if ($(this).text() == 25) {
                $(this).click(function() {
                    // 移除同类样式
                    $(this).parentsUntil('table').find('td').removeAttr('style');
                    $(this).css({
                            "background": "url('img/watch.jpg')",
                            "background-size": "100% 100%",
                            "outline": "2px solid red"
                        })
                        // 设置今日主题相应内容
                    $(".theme-pic img").attr('src', "img/watch.jpg");
                    goodsIntro_day.text(25);
                    goodsIntro_theme.text("嘉年华男士机械表");
                    goodsIntro_intro.text("胡兵同款镂空飞轮,多功能防水男表,金边白面皮带,25钻自动机械机芯,走时准、经久耐用。");
                })
            } else if ($(this).text() == 4) {
                $(this).click(function() {
                    // 移除同类样式
                    $(this).parentsUntil('table').find('td').removeAttr('style');
                    $(this).css({
                            "background": "url('img/phone.jpg')",
                            "background-size": "100% 100%",
                            "outline": "2px solid red"
                        })
                        // 设置今日主题相应内容
                    $(".theme-pic img").attr('src', "img/phone.jpg");
                    goodsIntro_day.text(4);
                    goodsIntro_theme.text("本日主题 Vivo X7");
                    goodsIntro_intro.text("vivo是一个专注于智能手机领域的品牌。vivo和追求乐趣,充满活力,年轻时尚的群体一起打造拥有卓越外观、专业级音质、愉悦体验的智能产品。");
                })
            }
        }
    });
}
