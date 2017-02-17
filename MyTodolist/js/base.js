;(function(){
	'use strict';
	
	var $form_add_task=$('.add-task'),
		$window=$(window),
		$body=$('body'),
		$task_delete_trigger,
		$task_detail_trigger,
		$task_detail_content,
		$task_detail_content_input,
		$task_detail_mask,
		$task_detail,
		task_list=[],
		$update_form,
		$checkbox_comlete,
		$msg=$('.msg'),
		$msg_content=$msg.find('.msg-content'),
		$msg_confirm=$msg.find('button'),
		$alerter=$('.alerter'),
		current_index;

	init();

	$form_add_task.on('submit',on_add_task_form_submit);
	$task_detail_mask.on('click',hide_task_detail);

	function pop(arg){
		if(!arg){
			console.error('pop title is required');
		}
		var conf={},
			$box,
			$mask,
			$content,
			$confirm,
			$cancel,
			confirmed,
			dfd,
			timer;

		dfd=$.Deferred();

		if (typeof arg == 'string') {
			conf.title=arg;
		}else{
			conf=$.extend(conf,arg);
		}


		$box=$('<div class="confirm-box">'+
			'<div class="pop-title">'+conf.title+'</div>'+
			'<div class="pop-content">'+
			'<div class="confirm-buttons">'+'<button class="primary confirm">确定</button>'+
				'<button class="cancel">取消</button>'+
			'</div>'+			
			'</div>'+
			'</div>')

		$content=$box.find('.pop-content');
		$confirm=$content.find('button.confirm');
		$cancel=$content.find('button.cancel');

		//console.log($confirm.html())
		
		$window.on('resize',function(){
				adjust_box_position()
			});

		function adjust_box_position(){
			var window_width=$window.width(),
				window_height=$window.height(),
				box_width=$box.width(),
				box_height=$box.height(),
				move_x,
				move_y;

			move_x=(window_width - box_width)/2;
			move_y=(window_height - box_height)/2-20;
			
			$box.css({left:move_x,top:move_y});
		};

		$mask=$('<div></div>')
		.css({
			position:'fixed',
			top:0,
			right:0,
			bottom:0,
			left:0,
			background:'rgba(0,0,0,0.5)'
		});

		// console.log($confirm.type())

		$confirm.on('click',function(){
			confirmed=true;
		});

		$cancel.on('click',cancel);

		$mask.on('click',cancel);

		function cancel(){
			confirmed=false;
		}

		function dismiss_pop(){
			$box.fadeOut('400', function() {
				$mask.remove();
				$box.remove();
			});
			
		};

		timer=setInterval(function(){
			if (confirmed!=undefined) {
				dfd.resolve(confirmed);
				clearInterval(timer);
				dismiss_pop();
			}
		},50)		
		
		$body.append($mask);
		$box.appendTo($body);
		$window.resize();
		return dfd.promise()
	}

	function listen_msg_event(){
		$msg_confirm.on('click',function(){
			hide_msg();
		})
	}

	function on_add_task_form_submit(e){
		var new_task={};
		//禁用默认行为
		e.preventDefault();
		//获取新task的值
		var $input=$(this).find('input[name=content]');
		new_task.content=$input.val();
		//如果新Task的值为空，则直接返回，否则继续执行
		if (!new_task.content) return;
		//存入新Task
		if (add_task(new_task)) {
			render_task_list();
			$input.val(null);
		}
	}

	//监听打开Task详情事件
	function listen_task_detail(){
		var index;
		$('.task-item').on('dblclick',function(){
			index=$(this).data('index');
			show_task_detail(index);
		})
		$task_detail_trigger.on('click',function(){
			var $this=$(this);
			var $item=$this.parent().parent();
			index=$item.data('index');
			show_task_detail(index);
		})
	}

	//监听完成Task事件
	function listen_checkbox_complete(){
		$checkbox_comlete.on('click',function(){
			var $this=$(this);
			//var is_complete=$this.is(':checked');
			//console.log(is_complete);
			var index=$this.parent().parent().data('index');
			var item=get(index);
			if (item.complete) {
				update_task(index,{'complete':false});
			}else{
				update_task(index,{'complete':true});
			}
			
		})
	}

	function get(index){
		return store.get('task_list')[index]
	}

	//查看Task详情
	function show_task_detail(index){
		//生成详情模板
		render_task_detail(index);
		current_index=index;
		//显示详情模板(默认隐藏)
		$task_detail.fadeIn();
		//显示详情模板遮罩(默认隐藏)
		$task_detail_mask.fadeIn();
	}

	//更新Task
	function update_task(index,data){
		if (!index || !task_list[index]) return;
		task_list[index]=$.extend({},task_list[index],data);
		refresh_task_list();
		console.log('task_list[index]',task_list[index])
	}

	//隐藏Task详情
	function hide_task_detail(){

		$task_detail.fadeOut();
		$task_detail_mask.fadeOut();
	}

	//渲染指定Task的详细信息
	function render_task_detail(index){
		if (index===undefined || !task_list[index]) return;
		var item=task_list[index];
		//console.log('item',item);

		var temp=
				'<form>'+
				'<div class="content">'+
				item.content+
				'</div>'+
				'<div class="input-item"><input style="display:none;" type="text" name="content" value="'+(item.content || '')+'"></div>'+
				'<div>'+
				'<div class="description input-item">'+
				'<textarea name="description">'+(item.description || '')+'</textarea>'+
				'</div>'+
				'</div>'+
				'<div class="remind input-item">'+	
				'<lable>提醒时间</lable>'+
				'<input class="datetime" name="remind" type="text" value="'+(item.remind_date || '')+'" >'+
				'</div>'+
				'<div class="input-item"><button type="submit">更新</button></div>'+
				'</form>';

		//用新模板替换旧模板
		$task_detail.html(null);
		$task_detail.html(temp);
		$('.datetime').datetimepicker();
		//选中其中的form元素，因为之后会使用其监听submit事件
		$update_form=$task_detail.find('form');
		//选中显示Task内容的元素
		$task_detail_content=$update_form.find('.content');
		//选中Task input的元素
		$task_detail_content_input=$update_form.find('input[name=content]');

		//双击内容元素显示input，隐藏自己
		$task_detail_content.on('dblclick',function(){
			$(this).hide();
			$task_detail_content_input.fadeIn();
		})

		$update_form.on('submit',function(e){
			e.preventDefault();
			var data={};
			//获取表单中各个input的值
			data.content=$(this).find('[name=content]').val();
			data.description=$(this).find('[name=description]').val();
			data.remind_date=$(this).find('[name=remind]').val();
			update_task(index,data);
			hide_task_detail();
		})
	}

	//查找并监听所有删除按钮的点击事件
	function listen_task_delete(){

		$task_delete_trigger.on('click',function(){
			var $this=$(this);
			//找到删除按钮所在的task元素
			var $item=$this.parent().parent();
			var index=$item.data('index');
			//确认删除
			pop('确定要删除吗？').
				then(function(result){
					result?delete_task(index):null;
				});			
		})
	}

	function add_task(new_task){

		//将新Task推入task_list
		task_list.push(new_task);
		//更新localStorage
		store.set('task_list',task_list);
		//store.clear();
		return true;
	}

	//刷新localStorage数据并渲染模板
	function refresh_task_list(){
		store.set('task_list',task_list);
		render_task_list();
	}

	//删除一条task
	function delete_task(index){
		//如果没有index，或者index不存在则直接返回
		if (index===undefined || !task_list[index]) return;
		delete task_list[index];
		refresh_task_list();
	}

	function init(){
		//store.clear();
		task_list=store.get('task_list') || [];
		if (task_list.length) {
			render_task_list();
			//console.log('store.get(task_list)',store.get('task_list'));
		}
		task_remind_check();	
		listen_msg_event();	
	}

	function task_remind_check(){
		var current_timestamp;
		var interval=setInterval(function(){
			for(var i=0;i<task_list.length;i++){
				var item=get(i),task_timestamp;
				if (!item || !item.remind_date || item.informed) continue;
				current_timestamp=(new Date()).getTime();
				
				task_timestamp=(new Date(item.remind_date)).getTime();

				if (current_timestamp - task_timestamp >=1) {
					
					update_task(i,{informed:true});
					show_msg(item.content);					
				}
			}
		},300)
		
	}

	function show_msg(msg){
		if (!msg) return;
		$msg_content.html(msg);
		$alerter.get(0).play();
		$msg.fadeIn();
	}

	function hide_msg(){
		$msg.fadeOut();
	}

	//渲染所有task模板
	function render_task_list(){
		var $task_list=$('.task-list');
		$task_list.html('');
		var complete_items=[];
		for (var i = 0; i < task_list.length; i++) {
			var item=task_list[i];
			if(item && item.complete){
				complete_items[i]=item;
			}else{
				var $task=render_task_item(item,i);
				$task_list.prepend($task);
			}	
		}

		//console.log(complete_items)

		for(var j=0;j<complete_items.length;j++){			
			$task=render_task_item(complete_items[j],j);
			if (!$task) continue;
			$task.addClass('completed');
			$task_list.append($task);
		}

		$task_delete_trigger=$('.action.delete');
		$task_detail_trigger=$('.action.detail');
		$checkbox_comlete=$('.task-list .complete[type=checkbox]');
		$task_detail=$('.task-detail');
		$task_detail_mask=$('.task-detail-mask');
		listen_task_delete();
		listen_task_detail();
		listen_checkbox_complete();
	}	

	//渲染单条task模板
	function render_task_item(data,index){
		if(!data || !index)	return;
		var list_item_temp=
		'<li class="task-item" data-index="'+index+'">'+
			'<span><input class="complete" '+(data.complete? 'checked' : '')+' type="checkbox"></span>'+
			'<span class="task-content">'+data.content+'</span>'+
			'<span class="float-right">'+
				'<span class="action delete"> 删除</span>'+
				'<span class="action detail"> 详细</span>'+
			'</span>'+
		'</li>';
		return $(list_item_temp);
	}
})();