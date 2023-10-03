<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { reactive, onMounted, onBeforeMount, ref } from "vue";
const states = reactive({
	google: null,
	map: null,
	panorama: null,
});
const setXY = reactive({
	x: 0,
	y: 0,
});
const isShow = ref(false);
const initMap = async () => {
	const loader = new Loader({
		apiKey: "AIzaSyBkLH4Vi7pEy6uyu5HI2F5w7ZaM5eFPC3E",
		version: "weekly",
		libraries: ["places"],
		language: "zh-TW",
	});
	states.google = await loader.load();
	states.map = new states.google.maps.Map(document.getElementById("map"), {
		center: { lat: 25.0425, lng: 121.5468 },
		zoom: 11,
		mapTypeControl: false,
		fullscreenControl: false,
		minZoom: 10,
		maxZoom: 15,
	});
	states.map.addListener("zoom_changed", (event) => {
		isShow.value = false;
	});
	states.map.addListener("click", (event) => {
		states.panorama.setPosition(
			new google.maps.LatLng({
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
			})
		);
		states.map.setStreetView(states.panorama);

		setTimeout(() => {
			isShow.value = true;
			setXY.x = event.domEvent.offsetX + 20;
			setXY.y = event.domEvent.offsetY - 20;
		}, 500);
	});
	states.panorama = new google.maps.StreetViewPanorama(
		document.getElementById("pano"),
		{
			position: { lat: 25.0425, lng: 121.5468 },
			pov: {
				heading: 34,
				pitch: 10,
			},
		}
	);
	states.panorama.addListener("position_changed", () => {
		console.log(states.panorama.getPosition().lat());
		console.log(states.panorama.getPosition().lng());
		states.map.setCenter({
			lat: states.panorama.getPosition().lat(),
			lng: states.panorama.getPosition().lng(),
		});
	});
	states.map.setStreetView(states.panorama);
};

onBeforeMount(async () => {
	await initMap();
});
</script>

<template>
	<div class="map">
		<div id="map"></div>
		<div id="pano"></div>
		<div
			:class="['pop', { show: isShow }]"
			:style="{
				left: `${setXY.x}px`,
				top: `${setXY.y}px`,
			}"
		></div>
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
	.pop {
		display: none;
		position: fixed;
		width: 200px;
		height: 200px;
		background-color: #fff;
	}
	.show {
		display: block;
	}
}
</style>
