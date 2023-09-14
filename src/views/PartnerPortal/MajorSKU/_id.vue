<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const _id = ref(route.params.id);
</script>

<template>
	<div>PartnerPortal Major SKU {{ _id }}</div>
</template>

<style lang="scss" scoped></style>
