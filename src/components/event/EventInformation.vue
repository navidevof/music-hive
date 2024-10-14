<template>
	<aside class="flex justify-between items-center w-full">
		<h1 class="text-xl font-bold line-clamp-1">
			Evento: <span class="font-normal">{{ event.name }}</span>
		</h1>
		<div class="flex items-center gap-x-4">
			<button
				@click="showModalQrCode = true"
				class="text-xs md:text-sm text-custom-white p-0"
			>
				<IconQrCode class="size-5 text-custom-green-1 inline" />
				Compartir
			</button>
			<strong class="text-xs md:text-sm text-custom-white">
				<IconUsers class="size-5 text-custom-green-1 inline" />
				{{ participants }}
			</strong>
		</div>
	</aside>

	<QRCodeDisplay
		v-if="event.eventId && showModalQrCode"
		@close="showModalQrCode = false"
	/>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useEventStore } from "@/store/event.store";
import IconUsers from "@/components/icons/IconUsers.vue";
import IconQrCode from "@/components/icons/IconQrCode.vue";
import QRCodeDisplay from "./QRCodeDisplay.vue";

const eventStore = useEventStore();
const { participants, event } = storeToRefs(eventStore);
const showModalQrCode = ref<boolean>(false);
</script>
