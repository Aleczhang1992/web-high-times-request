

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

		var _xhrCount = 0,_errCount=0;
		var startTimeSeconds = new Date().getTime();
		var endTimeSeconds;
		document.getElementById("showBox_forXhrMore").innerHTML="已开始发送请求，请等待...";
				for(var i = 0; i <1000; i++) {
					xhrRequest(_errCount,"http://ofloj49yv.bkt.clouddn.com/1025-" + (i + 1) + ".json", function(_errCount) {
						_xhrCount++;
						if(_xhrCount >= 1000) {
							endTimeSeconds = new Date().getTime();
							var useTime = Math.ceil(endTimeSeconds - startTimeSeconds) / 1000;
							document.getElementById("showBox_forXhrMore").innerHTML='1000次XHR请求共用时' + useTime + 's,<br/>其中'+_errCount+'个失败';
						}

					})
				}
		

	}

	function xhrRequest(_errCount,url, callback) {
		var xhr = createXHR();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 ) { //200 表示相应成功 304 表示缓存中存在请求的资源  
					// 对响应的信息写在回调函数里面 
						
					callback(_errCount);
				} else {
					_errCount++;
					callback(_errCount);
				}
				
			}
		}

		xhr.open('get', url, true);
		xhr.send();
	}
	
	document.getElementById("startBtn_forXhrMore").onclick=function(){
		startRequest("xhr_forMore");
	}
	


