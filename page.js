/**
 * Created by zxm on 2017/3/31.
 */

$.fn.extend({
    "initPage":function(listCount,currentPage,fun){
        console.log(listCount,currentPage,fun);
        //这里是获取用户的值设置展示的页数和条数下面第一个参数是5，第二个参数是1
        var maxshowpageitem = $(this).attr("maxshowpageitem");
        console.log(maxshowpageitem);
        if(maxshowpageitem!=null&&maxshowpageitem>0&&maxshowpageitem!=""){
            page.maxshowpageitem = maxshowpageitem;
            console.log(page.maxshowpageitem)
        }
        var pagelistcount = $(this).attr("pagelistcount");
        console.log(pagelistcount)
        if(pagelistcount!=null&&pagelistcount>0&&pagelistcount!=""){
            page.pagelistcount = pagelistcount;
            console.log(page.pagelistcount)
        }

        var pageId = $(this).attr("id");
        console.log(pageId);
        page.pageId=pageId;
        console.log(listCount)
        if(listCount<0){
            listCount = 0;
        }
        if(currentPage<=0){
            currentPage=1;
        }
        page.setPageListCount(pageId,listCount,currentPage,fun);

    }
});

var  page = {
    "maxshowpageitem":5,//最多显示的页码个数
    "pagelistcount":10,//每一页显示的内容条数
    /**
     * 初始化分页界面
     * @param listCount 列表总量
     */
    "initWithUl":function(pageId,listCount,currentPage){
        console.log(pageId,listCount,currentPage);
        var pageCount = 1;
        if(listCount>0){
            var pageCount = listCount%page.pagelistcount>0?parseInt(listCount/page.pagelistcount)+1:parseInt(listCount/page.pagelistcount);
            console.log(pageCount)
        }
        var appendStr = page.getPageListModel(pageCount,currentPage);
        console.log(appendStr);
        $("#"+pageId).html(appendStr);
    },
    /**
     * 设置列表总量和当前页码
     * @param listCount 列表总量
     * @param currentPage 当前页码
     */
    "setPageListCount":function(pageId,listCount,currentPage,fun){
        console.log(pageId,listCount,currentPage,fun);
        listCount = parseInt(listCount);
        currentPage = parseInt(currentPage);
        console.log(listCount);
        console.log(currentPage);
        page.initWithUl(pageId,listCount,currentPage);
        page.initPageEvent(pageId,listCount,fun);

    },
    "initPageEvent":function(pageId,listCount,fun){
        console.log(pageId,listCount,fun);
        $("#"+pageId +">li[class='pageItem']").on("click",function(){
            if(typeof fun == "function"){
                fun($(this).attr("page-data"));
            }
            page.setPageListCount(pageId,listCount,$(this).attr("page-data"),fun);
        });
    },
    "getPageListModel":function(pageCount,currentPage){
        console.log(pageCount,currentPage);
        var prePage = currentPage-1;
        var nextPage = currentPage+1;
        var prePageClass ="pageItem";
        var nextPageClass = "pageItem";
        if(prePage<=0){
            prePageClass="pageItemDisable";
        }
        if(nextPage>pageCount){
            nextPageClass="pageItemDisable";
        }
        var appendStr ="";
        appendStr+="<li class='"+prePageClass+"' page-data='1' page-rel='firstpage'>首页</li>";
        appendStr+="<li class='"+prePageClass+"' page-data='"+prePage+"' page-rel='prepage'>&lt;上一页</li>";
        var miniPageNumber = 1;
        if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)<=pageCount){
            miniPageNumber = currentPage-parseInt(page.maxshowpageitem/2);
            console.log(miniPageNumber);
        }else if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)>pageCount){
            miniPageNumber = pageCount-page.maxshowpageitem+1;
            console.log(miniPageNumber);
            if(miniPageNumber<=0){
                miniPageNumber=1;
            }
        }
        var showPageNum = parseInt(page.maxshowpageitem);
        console.log(showPageNum)
        if(pageCount<showPageNum){
            showPageNum = pageCount
            console.log(showPageNum);
        }
        for(var i=0;i<showPageNum;i++){
            var pageNumber = miniPageNumber++;
            var itemPageClass = "pageItem";
            if(pageNumber==currentPage){
                itemPageClass = "pageItemActive";
            }

            appendStr+="<li class='"+itemPageClass+"' page-data='"+pageNumber+"' page-rel='itempage'>"+pageNumber+"</li>";
        }
        appendStr+="<li class='"+nextPageClass+"' page-data='"+nextPage+"' page-rel='nextpage'>下一页&gt;</li>";
        appendStr+="<li class='"+nextPageClass+"' page-data='"+pageCount+"' page-rel='lastpage'>尾页</li>";
       return appendStr;

    }
};
