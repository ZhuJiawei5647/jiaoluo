export default {
	methods: {
		isPC () {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone",
			            "SymbianOS", "Windows Phone",
			            "iPad", "iPod"];
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
			    if (userAgentInfo.indexOf(Agents[v]) > 0) {
			        flag = false;
			        break;
			    }
			}
			return flag;
		},
		isIOS () {
			var u = navigator.userAgent;
			if (u.indexOf('iPhone') > -1) return true;
			else return false;
		},
		isAndroid () {
			var u = navigator.userAgent;
			if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) return true;
			else return false;
		},
		isWin () {
			var u = navigator.userAgent;
			if (u.indexOf('Windows Phone') > -1) return true;
			else return false;
		},
		isWeixin () {
			var ua = navigator.userAgent.toLowerCase(); 
			if(ua.indexOf('micromessenger') != -1) { 
			    return true; 
			} else { 
			    return false; 
			} 
		}
	}
}