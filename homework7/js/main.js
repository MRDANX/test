var companyCount = 1; //记录经纪公司面板当前显示的图片的页数
var idolCount = 1; //记录偶像面板当前显示的图片的页数
var messageCount = 1; //记录留言信息面板当前显示的页数
$(function() {
    backToTop(); //返回顶部
    headpicChange("company"); //经纪公司面板底部按钮监听
    headpicChange("idol"); //偶像面板底部按钮监听
    MusciListChange(); //音乐列表改变监听
    ScrollX("video"); //视频面板左滑动
    ScrollX("album"); //相册面板左滑动
    scroll_Listen(); //滑动面板鼠标进入或离开监听
    ScrollY(); //好友面板上滑动监听
    message_Listen(); //留言面板按钮监听
});
// 滚动窗口鼠标悬浮、离开监听
function scroll_Listen() {
    //鼠标进入监听，继续滑动
    $(".video").mouseenter(function() {
        $(".video_set").stop(true);
    });
    $(".album").mouseenter(function() {
        $(".album_set").stop(true);
    });
    $(".friend").mouseenter(function() {
        $(".friend_set").stop(true);
    });
    //鼠标离开监听，继续滑动
    $(".video").mouseleave(function() {
        ScrollX("video");
    });
    $(".album").mouseleave(function() {
        ScrollX("album");
    });
    $(".friend").mouseleave(function() {
        ScrollY();
    });
}
// 横向滚动
function ScrollX(type) {
    if ("video" == type) {
        $(".video_set").animate({
            left: '-360px'
        }, 6000, function() {
            InsertToEnd("video");
        });
    } else if ("album" == type) {
        $(".album_set").animate({
            left: '-360px'
        }, 5000, function() {
            InsertToEnd("album");
        });
    }
}
// 竖线滚动
function ScrollY() {
    $(".friend_set").animate({
        "top": "-63px"
    }, 2000, function() {
        InsertToEnd("friend");
    });
}
// 将元素插到最后
function InsertToEnd(type) {
    if ("video" == type) {
        $(".video:first-of-type").appendTo('.video_set');
        $(".video:first-of-type").appendTo('.video_set');
        $(".video:first-of-type").appendTo('.video_set');
        $(".video_set").css({
            "left": "0px"
        });
        $(".video_set").delay(1000);
        ScrollX("video");
    } else if ("album" == type) {
        $(".album").first().appendTo('.album_set');
        $(".album").first().appendTo('.album_set');
        $(".album").first().appendTo('.album_set');
        $(".album_set").css({
            "left": "0px"
        });
        $(".album_set").delay(1000);
        ScrollX("album");
    } else if ("friend" == type) {
        $(".friend:first-child").appendTo('.friend_set');
        $(".friend_set").css({
            "top": "2px"
        });
        $(".friend_set").delay(1000);
        ScrollY();
    }
}
// 音乐列表监听
function MusciListChange() {
    //鼠标悬停在按钮上面则显示相应内容，隐藏其他内容
    $(".musicbox_buttons input:nth-child(1)").hover(function() {
        $("#music_list1").css("display", "block");
        $("#music_list2").css("display", "none");
        $("#music_list3").css("display", "none");
    })
    $(".musicbox_buttons input:nth-child(2)").hover(function() {
        $("#music_list1").css("display", "none");
        $("#music_list2").css("display", "block");
        $("#music_list3").css("display", "none");
    })
    $(".musicbox_buttons input:nth-child(3)").hover(function() {
        $("#music_list1").css("display", "none");
        $("#music_list2").css("display", "none");
        $("#music_list3").css("display", "block");
    })
}
//头像切换监听
function headpicChange(paneName) {
    $("." + paneName + "_bottom input[value='<<']").click(function() {
        if ("company" == paneName) {
            companyCount--;
            if (companyCount < 1) {
                companyCount = 3;
            }
            path = "img/pic3" + "_" + companyCount + ".jpg";
            $("." + paneName + "_bottom span").text("帅哥" + companyCount);
        } else if ("idol" == paneName) {
            idolCount--;
            if (idolCount < 1) {
                idolCount = 3;
            }
            path = "img/pic4" + "_" + idolCount + ".jpg";
            $("." + paneName + "_bottom span").text("帅哥" + idolCount);
        }
        $("#" + paneName + "_headpic img").attr("src", path);
    });
    $("." + paneName + "_bottom input[value='>>']").click(function() {
        if ("company" == paneName) {
            companyCount++;
            if (companyCount > 3) {
                companyCount = 1;
            }
            path = "img/pic3" + "_" + companyCount + ".jpg";
            $("." + paneName + "_bottom span").text("帅哥" + companyCount);
        } else if ("idol" == paneName) {
            idolCount++
            if (idolCount > 3) {
                idolCount = 1;
            }
            path = "img/pic4" + "_" + idolCount + ".jpg";
            $("." + paneName + "_bottom span").text("帅哥" + idolCount);
        }
        $("#" + paneName + "_headpic img").attr("src", path);
    });
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
// 留言信息面板按钮监听
function message_Listen() {
    $(".message_btns input").click(function() {
        length = $(".message").length;
        if ($(this).attr('value') == "上一页") {
            messageCount--;
            $(".message[name='message2']").fadeOut(300);
            $(".message[name='message1']").delay(300);
            $(".message[name='message1']").fadeIn(300);
            // 到达第一页 则使上一页按钮无效，下一页按钮有效
            if (messageCount == 1) {
                $(this).attr('disabled', 'true');
                $(this).css({
                    "background-position-x": "9px"
                });
                $(this).next().removeAttr("disabled");
                $(this).next().css({
                    "background-position-x": "-142px"
                });
            }
        } else if ($(this).attr('value') == "下一页") {
            messageCount++;
            $(".message[name='message1']").fadeOut(300);
            $(".message[name='message2']").delay(300);
            $(".message[name='message2']").fadeIn(300);
            // 到达最后一页 则使下一页按钮无效，上一页按钮有效
            if (messageCount == length) {
                $(this).attr('disabled', 'true');
                $(this).css({
                    "background-position-x": "-219px"
                });
                $(this).prev().removeAttr("disabled");
                $(this).prev().css({
                    "background-position-x": "-67px"
                });
            }
        }
    });
}
