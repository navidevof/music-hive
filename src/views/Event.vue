<template>
	<main class="flex flex-col gap-y-7 py-5 grow">
		<Search />
		<Video />
		<Playlists v-if="event.eventId" />

		<ModalSetUserName v-if="userName === '' && !auth.currentUser" />
	</main>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import "@justinribeiro/lite-youtube";
import socket from "@/lib/socket-client";
import { joinEvent } from "@/services/event";
import { useEventStore } from "@/store/event.store";
import { storeToRefs } from "pinia";

import Search from "@/components/event/Serach.vue";
import Video from "@/components/event/Video.vue";
import Playlists from "@/components/event/Playlists.vue";
import ModalSetUserName from "@/components/event/ModalSetUserName.vue";
import { auth } from "@/firebase";

const route = useRoute();
const router = useRouter();

const eventStore = useEventStore();
const { event, userName } = storeToRefs(eventStore);

onMounted(async () => {
	const $eventId = route.params.eventId as string;
	if (!$eventId) router.back();

	event.value.eventId = $eventId;

	socket.connect();

	await onJoinEvent({ eventId: event.value.eventId });

	socket.on("closeEvent", ($eventId: string) => {
		if ($eventId === event.value.eventId) {
			eventStore.resetStore();
			router.back();
		}
	});
});

onUnmounted(() => {
	socket.emit("leaveEvent", event.value.eventId);
	socket.disconnect();
	eventStore.resetStore();
});

const onJoinEvent = async ({ eventId }: { eventId: string }) => {
	try {
		const res = await joinEvent({ eventId });
		if (res.error) {
			// TODO: show error
			router.push("/");
			return;
		}

		if (!res.data) return;
		event.value = res.data;

		socket.emit("joinEvent", event.value.eventId);
	} catch (error) {
		console.log({ error });
		router.push("/");
	}
};
</script>
