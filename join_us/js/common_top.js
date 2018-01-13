//获取顶部每个分类鼠标悬浮出现的文章
function getTopArticle(){
	$.ajax({
		type : "POST",
		url : "articleAction!getArticleForIndexTop.action",
		async : true,
		dataType : 'json',
		success : function(data){
			if(data.success){
				setTopArticle(data.classLife,"#life");
				setTopArticle(data.classTravel,"#travel");
				setTopArticle(data.classBusiness,"#business");
				setTopArticle(data.classArch,"#architecture");
				setTopArticle(data.classMaster,"#master");
			}
		}
	});
}
//顶部文章数据
function setTopArticle(list,id){
	if(null != list && list.length > 0){
		var html = '';
		$.each(list,function(k,v){
			html += '<li><a href="article_details.html?articleId='+v.articleId+'" class="img_shadow"><img src="'+v.articleImg+'"></a>';
			html += '<h2><a href="article_details.html?articleId='+v.articleId+'">'+v.articleName+'</a></h2></li>';
		});
		$(id).html(html);
	}
}