$(function() {

	function createXHR() {
		if(typeof XMLHttpRequest != 'undefined') {
			return new XMLHttpRequest();
		} else if(typeof ActiveXObject != 'undefined') {
			if(typeof arguments.callee.activeXString != 'string') {
				var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'], // ie browser different vesions  
					i, len;
				for(i = 0, len = versions.length; i < len; i++) {
					try {
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					} catch(ex) {
						// jump  
					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);

		} else {
			throw new Error('No XHR object available.');
		}
	}

	function startRequest(type) {

		var _ajaxCount = 0,
			_xhrCount = 0;

		switch(type) {
			case "ajax_forMore":
				var startTimeSeconds = new Date().getTime();
				var endTimeSeconds;
				$("#showBox_forAjaxMore").html('已开始发送请求，请等待...');
				for(var i = 0; i < 1000; i++) {
					$.ajax({
						type: "get",
						url: "http://ofloj49yv.bkt.clouddn.com/1025-" + (i + 1) + ".json",
						beforeSend: function(R) {
							R.setRequestHeader('Connection', 'Keep-Alive');
						},
						async: true,
						cache: false,
						dataType: "json",
						complete: function() {
							_ajaxCount++;
							if(_ajaxCount >= 1000) {
								endTimeSeconds = new Date().getTime();
								var useTime = Math.ceil(endTimeSeconds - startTimeSeconds) / 1000;
								$("#showBox_forAjaxMore").html('1000次Ajax请求共用时' + useTime + 's');

							}
						}
					});

				}
				break;
			case "ajax_foreOne":
				var startTimeSeconds = new Date().getTime();
				var endTimeSeconds;
				$("#showBox_forAjaxOne").html('已开始发送请求，请等待...');
				$.ajax({
					type: "get",
					url: "http://ofloj49yv.bkt.clouddn.com/1000times.json",
					async: true,
					beforeSend: function(R) {
						R.setRequestHeader('Connection', 'Keep-Alive');
					},
					cache: false,
					dataType: "json",
					complete: function() {
						endTimeSeconds = new Date().getTime();
						var useTime = Math.ceil(endTimeSeconds - startTimeSeconds) / 1000;
						$("#showBox_forAjaxOne").html('1次Ajax请求共用时' + useTime + 's');
					}
				});
				break;
			case "xhr_forMore":
				var startTimeSeconds = new Date().getTime();
				var endTimeSeconds;
				$("#showBox_forXhrMore").html('已开始发送请求，请等待...');
				for(var i = 0; i < 1000; i++) {
					xhrRequest("http://ofloj49yv.bkt.clouddn.com/1025-" + (i + 1) + ".json", function() {
						_xhrCount++;
						if(_xhrCount >= 1000) {
							endTimeSeconds = new Date().getTime();
							var useTime = Math.ceil(endTimeSeconds - startTimeSeconds) / 1000;
							$("#showBox_forXhrMore").html('1000次XHR请求共用时' + useTime + 's');
						}

					})
				}

				break;
			case "xhr_forOne":
				var startTimeSeconds = new Date().getTime();
				var endTimeSeconds;
				$("#showBox_forXhrOne").html('已开始发送请求，请等待...');
				xhrRequest("http://ofloj49yv.bkt.clouddn.com/1000times.json", function() {
					
					endTimeSeconds = new Date().getTime();
					var useTime = Math.ceil(endTimeSeconds - startTimeSeconds) / 1000;
					$("#showBox_forXhrOne").html('1次XHR请求共用时' + useTime + 's');
				})
				break;
			default:
				break;
		}

	}

	function xhrRequest(url, callback) {
		var xhr = createXHR();
		var requestUrl;
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if((xhr.status >= 200 && xhr.status < 300) ) { //200 表示相应成功 304 表示缓存中存在请求的资源  
					// 对响应的信息写在回调函数里面 
			
					
					callback();
					
					
				} else {
					return 'request is unsucessful ' + xhr.status;
				}
			}
		}

		xhr.open('get', url, false);
		xhr.send();
	}

	$("#startBtn_forAjaxMore").click(function() {
		startRequest("ajax_forMore");
	});

	$("#startBtn_forAjaxOne").click(function() {
		startRequest("ajax_foreOne");
	});
	$("#startBtn_forXhrMore").click(function() {
		startRequest("xhr_forMore");
	});

	$("#startBtn_forXhrOne").click(function() {
		startRequest("xhr_forOne");
	});

});