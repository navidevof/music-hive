<template>
	<Header />
	<router-view></router-view>
	<Footer />
	<Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { inject } from "@vercel/analytics";
import { useUIStore } from "@/store/ui.store";
import Loader from "@/components/common/Loader.vue";
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";

const uiStore = useUIStore();
const { isLoading } = storeToRefs(uiStore);

inject();
</script>
