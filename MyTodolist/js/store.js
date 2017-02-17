;(function(){
	'use strict';

	var $from_add_task =$('.add_task'),
		new_task={};

	$from_add_task.on('submit',function(e){
		e.preventDefault();
		new_task.content=$(this).find('input[name=content]').val();
		console.log(new_task)
	})

})();