<script setup>
import { Loader } from '@googlemaps/js-api-loader';
import { reactive, onMounted, onBeforeMount, ref } from 'vue';
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
    title: '新航',
    heading: 240,
    marker: null,
  },
  {
    lat: 25.0316026,
    lng: 121.5169051,
    title: 'Card Master',
    heading: 60,
    marker: null,
  },
]);

const isShow = ref(false);
const initMap = async () => {
  navigator.geolocation.getCurrentPosition(position => {
    currentLatLng.lat = position.coords.latitude;
    currentLatLng.lng = position.coords.longitude;
  });

  const loader = new Loader({
    apiKey: 'AIzaSyBs1F_wf3P9yNe38Sucld1THY8vEuq7FZk',
    version: 'weekly',
    libraries: ['places'],
    language: 'zh-TW',
  });
  states.google = await loader.load();

  states.map = new states.google.maps.Map(document.getElementById('map'), {
    center: { lat: currentLatLng.lat, lng: currentLatLng.lng },
    zoom: 11,
    mapTypeControl: false,
    fullscreenControl: false,
    minZoom: 10,
    maxZoom: 15,
  });
  states.panorama = new states.google.maps.StreetViewPanorama(document.getElementById('pano'), {
    position: { lat: currentLatLng.lat, lng: currentLatLng.lng },
    pov: {
      heading: 34,
      pitch: 10,
    },
  });
  states.service = new states.google.maps.places.PlacesService(states.map);
  states.directionsService = new states.google.maps.DirectionsService();
  states.infoWindow = new states.google.maps.InfoWindow();

  latlng.value.forEach((ll, i) => {
    latlng.value[i].marker = new states.google.maps.Marker({
      position: { lat: ll.lat, lng: ll.lng },
      map: states.map,
      title: ll.title,
    });
  });

  latlng.value.forEach(ll => {
    const { marker, ...other } = ll;
    marker.addListener('click', event => {
      const markerLL = new states.google.maps.LatLng(other.lat, other.lng);
      states.service.nearbySearch(
        { location: markerLL, keyword: marker.title, radius: 20 },
        (res, status) => {
          if (status === 'OK' && res.length === 1) {
            const station = res[0];
            console.log(station);
            states.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
              position: {
                lat: other.lat,
                lng: other.lng,
              },
              pov: {
                heading: other.heading,
                pitch: 10,
              },
            });

            if (!states.directionsRender)
              states.directionsRender = new states.google.maps.DirectionsRenderer({
                map: states.map,
              });

            states.directionsRender.set('directions', null);

            states.directionsService.route(
              {
                origin: new states.google.maps.LatLng(currentLatLng.lat, currentLatLng.lng),
                destination: {
                  placeId: station.place_id,
                },
                travelMode: states.google.maps.TravelMode['TRANSIT'],
              },
              (rout, status) => {
                console.log(rout, status);
                if (status === 'OK') {
                  states.directionsRender.setDirections(rout);
                  states.infoWindow.setContent(
                    `
										<h3>Name :${station.name}</h3>
										<div>Address :${station.vicinity}</div>
										<div>Open Now :${station.opening_hours.isOpen() ? 'OPEN' : 'CLOSE'}</div>
										<div>Directions :${rout.routes[0].legs[0].duration.text}</div>
										`,
                  );
                  states.infoWindow.open({
                    anchor: marker,
                    map: states.map,
                  });
                }
              },
            );
          }
        },
      );
    });
  });

  states.map.setStreetView(states.panorama);
  // event
  states.map.addListener('zoom_changed', event => {
    isShow.value = false;
  });
  states.map.addListener('click', event => {
    states.panorama.setPosition(
      new google.maps.LatLng({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }),
    );
  });

  states.map.addListener('drag', () => {});

  states.panorama.addListener('position_changed', () => {
    states.map.setCenter({
      lat: states.panorama.getPosition().lat(),
      lng: states.panorama.getPosition().lng(),
    });
  });
  states.panorama.addListener('drag', event => {
    console.log(event);
  });
};

onBeforeMount(async () => {
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
