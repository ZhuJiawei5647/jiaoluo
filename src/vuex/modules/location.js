import BMap from 'BMap'

const state = {
	lng: 108.849253,
	lat: 34.121332
}

const mutations = {
	SET_CENTER (state) {
		var geolocation = new BMap.Geolocation();
		(function getCenter () {
			geolocation.getCurrentPosition(function(r) {
				if (this.getStatus() == BMAP_STATUS_SUCCESS) {
					Object.assign(state, r.point)
				}
				else {
					getCenter()
				}
			});
		})()
	}
}

export default { state, mutations }