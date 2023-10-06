<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { watch, reactive, onBeforeMount, ref, onMounted } from "vue";
import topbar_bg from "@/assets/img/png/info-content-bg.png";
import TinycmeEditor from "@/components/Tinymce/index.vue";

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
		info: {
			content: "",
			actions: [
				{
					action_type: "game",
					action_time: "2023-10-02 14:00:00",
					action_title: "10月積分賽",
					action_prize: [
						"第一名 : 積分包 4包",
						"第二名 : 積分包 2包",
						"第三名 : 積分包 1包",
						"參賽獎 : 50卡包一包",
					],
					action_detail: "現場再抽三位各得一包積分包",
					action_cost: 300,
				},
				{
					action_type: "game",
					action_time: "2023-11-01 14:00:00",
					action_title: "小小杯大賽",
					action_prize: [
						"第一名 : 1203一盒",
						"第二名 : 1203 8包",
						"第三名 : 1203 4包",
						"參賽獎 : 1203 1包",
					],
					action_detail: "僅能使用攻擊力小於1000的卡，並且不能放燒血效果卡",
					action_cost: 300,
				},
				{
					action_type: "product",
					action_time: "2023-10-28 00:00:00",
					action_title: "1203發售",
					action_prize: [],
					action_detail: "買兩盒送一張特卡，三盒送兩張",
					action_cost: 1450,
				},
				{
					action_type: "product",
					action_time: "2023-11-13 00:00:00",
					action_title: "SD47發售",
					action_prize: [],
					action_detail: "預購少50",
					action_cost: 400,
				},
				{
					action_type: "game",
					action_time: "2023-11-03 14:00:00",
					action_title: "大大杯大賽",
					action_prize: [
						"第一名 : 1203一盒",
						"第二名 : 1203 8包",
						"第三名 : 1203 4包",
						"參賽獎 : 1203 1包",
					],
					action_detail: "不能使用效果怪獸",
					action_cost: 300,
				},
			],
		},
	},
	{
		lat: 25.0316026,
		lng: 121.5169051,
		title: "Card Master",
		heading: 60,
		marker: null,
		info: {
			content: "",
			actions: [
				{
					action_type: "game",
					action_time: "2023-11-01 14:00:00",
					action_title: "小小杯大賽",
					action_prize: [
						"第一名 : 1203一盒",
						"第二名 : 1203 8包",
						"第三名 : 1203 4包",
						"參賽獎 : 1203 1包",
					],
					action_detail: "僅能使用攻擊力小於1000的卡，並且不能放燒血效果卡",
					action_cost: 300,
				},
				{
					action_type: "product",
					action_time: "2023-10-28 00:00:00",
					action_title: "1203發售",
					action_prize: [],
					action_detail: "買兩盒送一張特卡，三盒送兩張",
					action_cost: 1450,
				},
				{
					action_type: "product",
					action_time: "2023-11-13 00:00:00",
					action_title: "SD47發售",
					action_prize: [],
					action_detail: "預購少50",
					action_cost: 400,
				},
				{
					action_type: "game",
					action_time: "2023-11-03 14:00:00",
					action_title: "大大杯大賽",
					action_prize: [
						"第一名 : 1203一盒",
						"第二名 : 1203 8包",
						"第三名 : 1203 4包",
						"參賽獎 : 1203 1包",
					],
					action_detail: "不能使用效果怪獸",
					action_cost: 300,
				},
			],
		},
	},
	{
		lat: 25.0046266,
		lng: 121.4592909,
		title: "板橋桌遊侍",
		heading: 330,
		marker: null,
		info: {
			content: "",
			actions: [
				{
					action_type: "game",
					action_time: "2023-11-01 14:00:00",
					action_title: "小小杯大賽",
					action_prize: [
						"第一名 : 1203一盒",
						"第二名 : 1203 8包",
						"第三名 : 1203 4包",
						"參賽獎 : 1203 1包",
					],
					action_detail: "僅能使用攻擊力小於1000的卡，並且不能放燒血效果卡",
					action_cost: 300,
				},
				{
					action_type: "product",
					action_time: "2023-10-28 00:00:00",
					action_title: "1203發售",
					action_prize: [],
					action_detail: "買兩盒送一張特卡，三盒送兩張",
					action_cost: 1450,
				},
				{
					action_type: "product",
					action_time: "2023-11-13 00:00:00",
					action_title: "SD47發售",
					action_prize: [],
					action_detail: "預購少50",
					action_cost: 400,
				},
				{
					action_type: "game",
					action_time: "2023-11-03 14:00:00",
					action_title: "大大杯大賽",
					action_prize: [
						"第一名 : 1203一盒",
						"第二名 : 1203 8包",
						"第三名 : 1203 4包",
						"參賽獎 : 1203 1包",
					],
					action_detail: "不能使用效果怪獸",
					action_cost: 300,
				},
			],
		},
	},
	{
		lat: 25.0782329,
		lng: 121.4837852,
		title: "美樂地",
		heading: 244,
		marker: null,
		info: {
			content: "",
			actions: [
				{
					action_type: "game",
					action_time: "2023-11-01 14:00:00",
					action_title: "小小杯大賽",
					action_prize: [
						"第一名 : 1203一盒",
						"第二名 : 1203 8包",
						"第三名 : 1203 4包",
						"參賽獎 : 1203 1包",
					],
					action_detail: "僅能使用攻擊力小於1000的卡，並且不能放燒血效果卡",
					action_cost: 300,
				},
				{
					action_type: "product",
					action_time: "2023-10-28 00:00:00",
					action_title: "1203發售",
					action_prize: [],
					action_detail: "買兩盒送一張特卡，三盒送兩張",
					action_cost: 1450,
				},
				{
					action_type: "product",
					action_time: "2023-11-13 00:00:00",
					action_title: "SD47發售",
					action_prize: [],
					action_detail: "預購少50",
					action_cost: 400,
				},
				{
					action_type: "game",
					action_time: "2023-11-03 14:00:00",
					action_title: "大大杯大賽",
					action_prize: [
						"第一名 : 1203一盒",
						"第二名 : 1203 8包",
						"第三名 : 1203 4包",
						"參賽獎 : 1203 1包",
					],
					action_detail: "不能使用效果怪獸",
					action_cost: 300,
				},
			],
		},
	},
	{
		lat: 25.0608707,
		lng: 121.5281499,
		title: "桌上旅程",
		heading: 349,
		marker: null,
		info: {
			content: "",
			actions: [
				{
					action_type: "game",
					action_time: "2023-11-01 14:00:00",
					action_title: "小小杯大賽",
					action_prize: [
						"第一名 : 1203一盒",
						"第二名 : 1203 8包",
						"第三名 : 1203 4包",
						"參賽獎 : 1203 1包",
					],
					action_detail: "僅能使用攻擊力小於1000的卡，並且不能放燒血效果卡",
					action_cost: 300,
				},
				{
					action_type: "product",
					action_time: "2023-10-28 00:00:00",
					action_title: "1203發售",
					action_prize: [],
					action_detail: "買兩盒送一張特卡，三盒送兩張",
					action_cost: 1450,
				},
				{
					action_type: "product",
					action_time: "2023-11-13 00:00:00",
					action_title: "SD47發售",
					action_prize: [],
					action_detail: "預購少50",
					action_cost: 400,
				},
				{
					action_type: "game",
					action_time: "2023-11-03 14:00:00",
					action_title: "大大杯大賽",
					action_prize: [
						"第一名 : 1203一盒",
						"第二名 : 1203 8包",
						"第三名 : 1203 4包",
						"參賽獎 : 1203 1包",
					],
					action_detail: "不能使用效果怪獸",
					action_cost: 300,
				},
			],
		},
	},
]);

const show_place_detail = reactive({
	placeInfo: null,
	expand: false,
	reduce: false,
	nowCardsPick: null,
});

const editorData = ref("<p>Content of the editor.</p>");

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
	show_place_detail.nowCardsPick = null;
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
		const { marker, ...other } = ll;
		marker.addListener("click", async () => {
			show_place_detail.nowCardsPick = cardShopsInfo.value.find(
				(el) => el.title === other.title
			);
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
				// console.log(show_place_detail.placeInfo);
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

const expandHandler = () =>
	(show_place_detail.expand = !show_place_detail.expand);

const resizeHandler = () =>
	(show_place_detail.reduce = !show_place_detail.reduce);

const saveContent = () => {
	const idx = cardShopsInfo.value.findIndex(
		(el) => el.title === show_place_detail.nowCardsPick.title
	);
	cardShopsInfo.value[idx].info.content = editorData.value;
};

onBeforeMount(async () => {
	await initGoogle();
	await initMap();
});

onMounted(() => {});
</script>

<template>
	<div class="map">
		<div id="map"></div>
		<div :class="['pano', { 'pano-none': !show_place_detail.placeInfo }]">
			<div id="pano"></div>
		</div>
		<div
			v-show="show_place_detail.nowCardsPick"
			:class="[
				'info-bar',
				{
					'info-bar-show':
						show_place_detail.expand && !show_place_detail.reduce,
					'info-bar-show-screen-small':
						show_place_detail.reduce && show_place_detail.expand,
					'info-bar-show-small': !show_place_detail.expand,
				},
			]"
			:style="`background-image: url(${topbar_bg})`"
		>
			<header>
				<el-icon @click="resizeHandler" v-if="show_place_detail.expand">
					<i-akar-icons-reduce v-if="!show_place_detail.reduce" />
					<i-akar-icons-enlarge v-else />
				</el-icon>
				<el-icon @click="expandHandler">
					<i-lucide-expand v-if="!show_place_detail.expand" />
					<i-bx-collapse v-else />
				</el-icon>
			</header>
			<main>
				<h2 class="title" v-if="show_place_detail.placeInfo">
					{{ show_place_detail.placeInfo.name }}
				</h2>
				<!-- <tinycme-editor v-model="editorData"></tinycme-editor>
				<el-button @click="saveContent" type="success">Save Content</el-button> -->
				<div
					class="main-list x-main-list"
					v-if="show_place_detail.nowCardsPick"
				>
					<div
						v-for="action in show_place_detail.nowCardsPick.info.actions
							.filter((el) => new Date(el.action_time) - new Date() >= 0)
							.sort(
								(a, b) => new Date(a.action_time) - new Date(b.action_time)
							)"
						:class="[
							'action',
							{ 'action-green': action.action_type === 'product' },
						]"
					>
						<p>活動時間 : {{ action.action_time }}</p>
						<p>活動內容 : {{ action.action_title }}</p>
						<div v-if="action.action_prize.length">
							<p>活動獎勵 :</p>
							<p v-for="price in action.action_prize">{{ price }}</p>
						</div>
						<p>活動詳情: {{ action.action_detail }}</p>
						<p>
							{{ action.action_type === "product" ? "價格" : "報名費" }}:
							{{ action.action_cost }}
						</p>
					</div>
				</div>
			</main>
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
		@apply xl:w-80 xl:h-80 w-40 h-40 block absolute left-0 top-0 z-20 resize bg-white overflow-auto;
		#pano {
			@apply w-full h-full;
		}
	}
	.pano-none {
		@apply hidden;
	}
	.info-bar {
		@apply w-0 h-0 absolute xl:top-10 xl:right-2 bottom-0 z-20 bg-white xl:rounded-3xl rounded-t-3xl duration-500 overflow-hidden bg-no-repeat bg-cover;
		header {
			@apply w-full h-10 flex flex-row justify-end p-3 overflow-hidden;
			.el-icon {
				@apply mt-1 mr-1 ml-1 cursor-pointer;
			}
		}
		main {
			@apply p-3 pt-0 w-full h-[calc(100%-2.5rem)];
			.title {
				@apply h-3 text-base text-blue-700 font-bold mb-6;
			}
			.main-list {
				@apply flex flex-row w-auto h-[calc(100%-0.75rem)] flex-wrap overflow-auto scrollbar-none;
				.action {
					@apply bg-slate-100 rounded-md mr-4 mb-4 p-3;
					p {
						@apply text-orange-600 mb-1;
					}
				}
				.action-green {
					p {
						@apply text-green-600;
					}
				}
			}
			.x-main-list {
				@apply xl:flex-col xl:w-full xl:flex-nowrap;
				.action {
					@apply xl:mr-0;
				}
			}
		}
	}
	.info-bar-show-small {
		@apply h-10 w-10 right-2 top-10;
		header {
			.el-icon {
				@apply mt-0 mr-0;
			}
		}
	}

	.info-bar-show-screen-small {
		@apply xl:h-112 xl:w-112 xl:right-2 h-10 w-full;
		header {
			.el-icon {
				@apply xl:mt-0 xl:mr-0;
			}
		}
	}

	.info-bar-show {
		@apply xl:h-144 xl:w-144 w-full h-144;
	}
}
</style>
