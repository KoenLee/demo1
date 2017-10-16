$(function() {
	nowIdInfo = null;
    function resetTabs() {
        $("#"+nowIdInfo+"_info > div").hide(); //隐藏当前ID下的内容块
        $("#"+nowIdInfo+" a").attr("class", ""); //清楚当前ID下tab选中状态  
    }
    var myUrl = window.location.href; //获取 URL
    var myUrlTab = myUrl.substring(myUrl.indexOf("#")); // For mywebsite.com/tabs.html#tab2, myUrlTab = #tab2     
    var myUrlTabName = myUrlTab.substring(0, 4); // For the above example, myUrlTabName = #tab
    (function() {
        $(".initial_info > div").hide(); // 初始隐藏所有内容块
        $(".initial_info div:first-child").fadeIn(); // 显示第一个内容块
        $(".initial_tabs a").on("click",function(e) {
            e.preventDefault();
            if ($(this).attr("class") == "current") { //tab没有切换时
                return
            } else {
				nowIdInfo = $(this).parents(".initial_tabs").attr("id");//获取当前tab块id
                resetTabs();
                $(this).attr("class", "current"); // Activate this
                $($(this).attr('name')).fadeIn(); // Show content for current tab
            }
        });
		
		//通过地址跳到某个tab
        for (i = 1; i <= $(".initial_tabs li").length; i++) {
            if (myUrlTab == myUrlTabName + i) {
				nowTab = $("a[name='" + myUrlTab + "']").parents(".initial_tabs").attr("id");
				$("#"+nowTab+"_info > div").hide(); //隐藏当前ID下的内容块
        		$("#"+nowTab+" a").attr("class", ""); 
                $("a[name='" + myUrlTab + "']").attr("class", "current"); // 为当前tab负值选中状态
                $(myUrlTab).fadeIn(); // Show url tab content        
            }
        }
    })()
})