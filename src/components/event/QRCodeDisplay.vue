<template>
	<section
		class="fixed inset-0 z-50 h-screen w-full grid place-items-center bg-custom-black-2/50 backdrop-blur-sm transition duration-300 ease-out"
	>
		<aside
			class="flex flex-col gap-y-5 bg-custom-black-2 border border-custom-green-1 shadow-2xl shadow-custom-green-3 rounded-2xl p-5 items-center max-w-md w-10/12"
		>
			<header class="flex justify-between w-full">
				<h2 class="text-custom-white font-bold text-xl">Código del evento</h2>
				<button
					@click="emit('close')"
					class="size-fit hover:text-custom-green-1 !p-0 text-custom-white"
				>
					x
				</button>
			</header>
			<div
				class="w-11/12 max-w-72 justify-center items-center flex aspect-square"
			>
				<img v-if="qrImage" :src="qrImage" alt="Código QR" class="size-full" />
				<div v-else class="loader m-auto"></div>
			</div>
			<button @click="shareEvent" class="bg-custom-green-2 w-full mt-3">
				Compartir
			</button>
		</aside>
	</section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import QRCode from "qrcode";
import { storeToRefs } from "pinia";

import { useEventStore } from "@/store/event.store";

const qrImage = ref<string>("");
const eventStore = useEventStore();
const { event } = storeToRefs(eventStore);

const emit = defineEmits(["close"]);

const shareLink = `${window.location.protocol}//${window.location.host}/event/${event.value.eventId}`;

const shareEvent = async () => {
	try {
		await navigator.share({
			title: "🎉 ¡Te invito a mi evento en Music Hive! 🎶",
			text: "¡Hola! Me encantaría que te unieras y disfrutemos de la música juntos. 🎧 ¡Nos vemos ahí para compartir buena música y pasar un gran rato! 🎤🔥",
			url: shareLink,
		});
	} catch (error) {
		console.error("Error compartiendo evento:", error);
		alert("Tu navegador no soporta la funcionalidad de compartir.");
	}
};

onMounted(async () => {
	try {
		// Opciones de configuración del QR
		const options = {
			width: 300, // Ancho del QR
			margin: 2, // Margen del QR
			color: {
				dark: "#000000", // Color del QR
				light: "#ffffff", // Color de fondo
			},
		};
		const qrDataURL = await QRCode.toDataURL(
			`${window.location.host}/event/${event.value.eventId}`,
			options
		);
		qrImage.value = qrDataURL;
	} catch (error) {
		console.error("Error generando el QR:", error);
	}
});
</script>
