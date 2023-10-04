<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { reactive, onMounted, onBeforeMount, ref } from "vue";
const states = reactive({
	google: null,
	map: null,
	panorama: null,
	service: null,
	directionsService: null,
	directionsRender: null,
	infoWindow: null,
});
const currentLatLng = reactive({
	lat: null,
	lng: null,
});

const latlng = ref([
	{
		lat: 25.0298374,
		lng: 121.5460298,
		title: "新航",
		heading: 240,
		marker: null,
	},
	{
		lat: 25.0316026,
		lng: 121.5169051,
		title: "Card Master",
		heading: 60,
		marker: null,
	},
]);

// 封裝API
const nearbySearch_async = async (obj) => {
	try {
		return await new Promise((resolve, reject) => {
			states.service.nearbySearch(obj, (results, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					resolve(results[0]);
				} else {
					reject(false);
				}
			});
		});
	} catch (error) {
		return false;
	}
};

const getPlaceInfo = async (placeId) => {
	try {
		return await new Promise((resolve, reject) => {
			states.service.getDetails({ placeId }, (place, status) => {
				if (status === "OK") {
					resolve(place);
				} else {
					reject(false);
				}
			});
		});
	} catch (error) {
		return false;
	}
};

const setPanorama = (lat, lng, heading) => {
	states.panorama = new google.maps.StreetViewPanorama(
		document.getElementById("pano"),
		{
			position: {
				lat,
				lng,
			},
			pov: {
				heading,
				pitch: 10,
			},
		}
	);
	states.map.setStreetView(states.panorama);
};

const setRoutes = async (obj) => {
	try {
		return await new Promise((resolve, reject) => {
			states.directionsService.route(obj, (results, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					resolve(results);
				} else {
					reject(false);
				}
			});
		});
	} catch (error) {
		return false;
	}
};

const removeDirections = () => {
	if (states.directionsRender)
		states.directionsRender.setDirections({ routes: [] });
	if (states.infoWindow) states.infoWindow.close();
};

// Init
const initMap = async () => {
	// Build Markers
	latlng.value.forEach((ll, i) => {
		latlng.value[i].marker = new states.google.maps.Marker({
			position: { lat: ll.lat, lng: ll.lng },
			map: states.map,
			title: ll.title,
		});
	});

	// Build Markers click listener
	latlng.value.forEach((ll) => {
		const { marker, ...other } = ll;
		marker.addListener("click", async () => {
			const markerLL = new states.google.maps.LatLng(other.lat, other.lng);
			const station = await nearbySearch_async({
				location: markerLL,
				keyword: marker.title,
				radius: 20,
			});
			if (station) {
				setPanorama(other.lat, other.lng, other.heading);
				const placeInfo = await getPlaceInfo(station.place_id);

				if (!states.directionsRender)
					states.directionsRender = new states.google.maps.DirectionsRenderer({
						map: states.map,
					});

				states.directionsRender.setDirections({ routes: [] });

				const rout = await setRoutes({
					origin: new states.google.maps.LatLng(
						currentLatLng.lat,
						currentLatLng.lng
					),
					destination: {
						placeId: station.place_id,
					},
					travelMode: states.google.maps.TravelMode["DRIVING"],
				});

				if (rout) {
					states.directionsRender.setDirections(rout);
					let weekly = "";
					placeInfo.current_opening_hours.weekday_text.forEach((week) => {
						weekly += `<div>${week}</div>`;
					});
					states.infoWindow.setContent(
						`
										<h3>店名 :${station.name}</h3>
										<div>地址 :${placeInfo.adr_address}</div>
										<div>電話 :${placeInfo.formatted_phone_number}</div>
										<div>目前是否營業 :${
											placeInfo.current_opening_hours.open_now
												? "OPEN"
												: "CLOSE"
										}</div>
										<div>與當前預估時間 :${rout.routes[0].legs[0].duration.text}</div>
										<div>營業時間 :</div>
										${weekly}
										`
					);
					states.infoWindow.open({
						anchor: marker,
						map: states.map,
					});
				}
			}
		});
	});

	//! event
	states.map.addListener("zoom_changed", (event) => {});
	states.map.addListener("click", (event) => {
		setPanorama(event.latLng.lat(), event.latLng.lng(), 34);
	});

	states.map.addListener("drag", () => {});

	states.panorama.addListener("position_changed", (event) => {
		states.map.setStreetView(states.panorama);
	});

	states.infoWindow.addListener("closeclick", () => {
		removeDirections();
	});
};

onBeforeMount(async () => {
	navigator.geolocation.getCurrentPosition((position) => {
		currentLatLng.lat = position.coords.latitude;
		currentLatLng.lng = position.coords.longitude;
	});

	const loader = new Loader({
		apiKey: import.meta.env.VITE_MAPKEY,
		version: "weekly",
		libraries: ["places"],
		language: "zh-TW",
	});
	states.google = await loader.load();

	states.map = new states.google.maps.Map(document.getElementById("map"), {
		center: { lat: currentLatLng.lat, lng: currentLatLng.lng },
		zoom: 12,
		mapTypeControl: false,
		fullscreenControl: false,
		minZoom: 10,
		maxZoom: 15,
	});
	setPanorama(currentLatLng.lat, currentLatLng.lng, 34);
	states.service = new states.google.maps.places.PlacesService(states.map);
	states.directionsService = new states.google.maps.DirectionsService();
	states.infoWindow = new states.google.maps.InfoWindow();
	await initMap();
});
</script>

<template>
	<div class="map">
		<div id="map"></div>
		<div id="pano"></div>
	</div>
</template>

<style lang="scss" scoped>
.map {
	width: 100%;
	height: 100%;
	position: relative;
	#map,
	#pano {
		float: left;
		height: 100%;
		width: 50%;
	}
}
</style>
