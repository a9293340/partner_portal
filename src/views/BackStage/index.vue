<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { reactive, onBeforeMount, ref, onMounted } from "vue";
import topbar_bg from "@/assets/img/png/info-content-bg.png";

const states = reactive({
	google: null,
	map: null,
	panorama: null,
	service: null,
	directionsService: null,
	directionsRender: null,
	infoWindow: null,
	streetService: null,
});
const currentLatLng = reactive({
	lat: null,
	lng: null,
	marker: null,
});

const cardShopsInfo = ref([
	{
		lat: 25.0298374,
		lng: 121.5460298,
		title: "新航",
		heading: 240,
		marker: null,
		info: [],
	},
	{
		lat: 25.0316026,
		lng: 121.5169051,
		title: "Card Master",
		heading: 60,
		marker: null,
		info: [],
	},
	{
		lat: 25.0046266,
		lng: 121.4592909,
		title: "板橋桌遊侍",
		heading: 330,
		marker: null,
		info: [],
	},
	{
		lat: 25.0782329,
		lng: 121.4837852,
		title: "美樂地",
		heading: 244,
		marker: null,
		info: [],
	},
	{
		lat: 25.0608707,
		lng: 121.5281499,
		title: "桌上旅程",
		heading: 349,
		marker: null,
		info: [],
	},
]);

const show_place_detail = reactive({
	placeInfo: null,
	expand: false,
	showInfo: null,
});

// 封裝API
const nearbySearch_async = async (obj) => {
	try {
		return await new Promise((resolve, reject) => {
			states.service.nearbySearch(obj, (nearPlace, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					resolve(nearPlace[0]);
				} else {
					reject(new Error("Failed to retrieve near place details"));
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
			states.service.getDetails({ placeId }, (placeDetails, status) => {
				if (status === "OK") {
					resolve(placeDetails);
				} else {
					reject(new Error("Failed to retrieve place details"));
				}
			});
		});
	} catch (error) {
		console.error("An error occurred:", error);
		return false;
	}
};

const setPanorama = async (lat, lng, heading, useCheck = false) => {
	let trueStreetView;
	if (useCheck) {
		// check street view status
		const checkStreetView = async (sLat, sLng) => {
			try {
				return await new Promise((resolve, reject) => {
					states.streetService.getPanorama(
						{
							location: { lat: sLat, lng: sLng },
							radius: 50,
						},
						(a, b) => {
							resolve({
								status: b,
								latLng: { lat: sLat, lng: sLng },
							});
						}
					);
				});
			} catch (error) {
				console.error("An error occurred:", error);
				return false;
			}
		};

		// Recursion to get true street view lat & lng
		const getTrueStreetView = async (sLat, sLng) => {
			const result = await checkStreetView(sLat, sLng);
			if (!result) return false;

			return result.status !== "ZERO_RESULTS"
				? result.latLng
				: await getTrueStreetView(sLat, sLng + 0.0001);
		};

		trueStreetView = await getTrueStreetView(lat, lng);
		if (!trueStreetView) return;
	} else
		trueStreetView = {
			lat,
			lng,
		};
	states.panorama = new google.maps.StreetViewPanorama(
		document.getElementById("pano"),
		{
			position: {
				lat: trueStreetView.lat,
				lng: trueStreetView.lng,
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
			states.directionsService.route(obj, (routesDetail, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					resolve(routesDetail);
				} else {
					reject(new Error("Failed to retrieve routes details"));
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
	show_place_detail.placeInfo = null;
	show_place_detail.placeInfo = false;
	show_place_detail.showInfo = null;
	states.map.setStreetView(null);
};

const makeMarker = (lat, lng, title, url, size = 50) =>
	new states.google.maps.Marker({
		position: { lat, lng },
		map: states.map,
		title,
		icon: {
			url, // url
			scaledSize: new google.maps.Size(size, size),
			anchor: new google.maps.Point(size / 2, size / 2),
		},
	});

// Init
const initMap = async () => {
	// Build Markers
	cardShopsInfo.value.forEach((ll, i) => {
		cardShopsInfo.value[i].marker = makeMarker(
			ll.lat,
			ll.lng,
			ll.title,
			"/src/assets/img/png/yu-gi.png",
			40
		);
	});

	// Build Markers click listener
	cardShopsInfo.value.forEach((ll) => {
		const { marker, info: markerInfo, ...other } = ll;
		marker.addListener("click", async () => {
			show_place_detail.showInfo = markerInfo;
			const markerLL = new states.google.maps.LatLng(other.lat, other.lng);
			const station = await nearbySearch_async({
				location: markerLL,
				keyword: marker.title,
				radius: 20,
			});
			if (station) {
				await setPanorama(other.lat, other.lng, other.heading);
				show_place_detail.placeInfo = await getPlaceInfo(station.place_id);
				show_place_detail.expand = true;

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
					show_place_detail.placeInfo.current_opening_hours.weekday_text.forEach(
						(week) => {
							weekly += `<h5>${week}</h5>`;
						}
					);
					states.infoWindow.setContent(
						`
										<h2 style="font-weight:900;">店名 :${station.name}</h2>
										<h4>地址 :${show_place_detail.placeInfo.adr_address}</h4>
										<h4>電話 :${show_place_detail.placeInfo.formatted_phone_number}</h4>
										<h4>目前是否營業 :${
											show_place_detail.placeInfo.current_opening_hours.open_now
												? "OPEN"
												: "CLOSE"
										}</h4>
										<h4>預估抵達時間 :${rout.routes[0].legs[0].duration.text}</h4>
										<h4>營業時間 :</h4>
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
	states.map.addListener("click", async (event) => {
		// await setPanorama(event.latLng.lat(), event.latLng.lng(), 34);
	});

	states.map.addListener("drag", () => {});

	states.panorama.addListener("position_changed", (event) => {});

	states.infoWindow.addListener("closeclick", () => {
		removeDirections();
	});
};

const initGoogle = async () => {
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
		streetViewControl: false,
		minZoom: 10,
		maxZoom: 15,
	});
	states.service = new states.google.maps.places.PlacesService(states.map);
	states.streetService = new google.maps.StreetViewService();
	states.directionsService = new states.google.maps.DirectionsService();
	states.infoWindow = new states.google.maps.InfoWindow();
	await setPanorama(currentLatLng.lat, currentLatLng.lng, 34, true);

	currentLatLng.marker = makeMarker(
		currentLatLng.lat,
		currentLatLng.lng,
		"Now Your Place",
		"/src/assets/img/png/yu-gi-man.png"
	);
};

const expandHandler = () => {
	show_place_detail.expand = !show_place_detail.expand;
};

onBeforeMount(async () => {
	await initGoogle();
	await initMap();
});
</script>

<template>
	<div class="map">
		<div id="map"></div>
		<div :class="['pano', { 'pano-none': !show_place_detail.placeInfo }]">
			<div id="pano"></div>
		</div>
		<div
			:class="[
				'info-bar',
				{
					'info-bar-show':
						show_place_detail.placeInfo && show_place_detail.expand,
					'info-bar-show-small':
						show_place_detail.placeInfo && !show_place_detail.expand,
				},
			]"
			:style="`background-image: url(${topbar_bg})`"
		>
			<header>
				<el-icon @click="expandHandler">
					<i-lucide-expand v-if="!show_place_detail.expand" />
					<i-bx-collapse v-else />
				</el-icon>
			</header>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.map {
	@apply w-full h-full overflow-hidden scrollbar-none;
	#map {
		@apply w-full h-full relative;
	}
	.pano {
		@apply w-80 h-80 block absolute left-0 top-0 z-20 resize bg-white overflow-auto;
		#pano {
			@apply w-full h-full;
		}
	}
	.pano-none {
		@apply hidden;
	}
	.info-bar {
		@apply w-0 h-0 absolute top-10 right-2 z-20 bg-white rounded-3xl duration-500 overflow-hidden bg-no-repeat bg-cover;
		header {
			@apply w-full flex flex-row justify-end p-3 overflow-hidden;
			.el-icon {
				@apply mt-1 mr-1 cursor-pointer;
			}
		}
	}
	.info-bar-show-small {
		@apply h-10 w-10 right-2;
		header {
			.el-icon {
				@apply mt-0 mr-0;
			}
		}
	}
	.info-bar-show {
		@apply h-96 w-144;
	}
}
</style>
