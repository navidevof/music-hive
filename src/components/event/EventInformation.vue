<template>
	<aside class="flex justify-between items-center w-full">
		<h1 class="text-xl font-bold line-clamp-1">
			Evento: <span class="font-normal">{{ event.name }}</span>
		</h1>
		<strong class="text-xs text-custom-white flex items-center gap-x-2">
			<IconUsers class="size-5 text-custom-green-1" />
			{{ participants }}
		</strong>
	</aside>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useEventStore } from "@/store/event.store";
import IconUsers from "../icons/IconUsers.vue";

const eventStore = useEventStore();
const { participants, event } = storeToRefs(eventStore);
</script>
