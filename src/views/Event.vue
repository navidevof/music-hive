<template>
	<main class="flex flex-col gap-y-7 py-5 grow w-10/12 max-w-screen-lg mx-auto">
		<EventInformation />
		<Search />
		<Video />
		<Playlists v-if="event.eventId" />
		<ModalSetUserName
			v-if="!auth.currentUser || event.uid != auth.currentUser.uid"
		/>
	</main>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import "@justinribeiro/lite-youtube";
import socket from "@/lib/socket-client";
import { joinEvent } from "@/services/event";
import { useEventStore } from "@/store/event.store";
import { storeToRefs } from "pinia";

import Search from "@/components/event/Serach.vue";
import Video from "@/components/event/Video.vue";
import Playlists from "@/components/event/Playlists.vue";
import ModalSetUserName from "@/components/modals/event/ModalSetUserName.vue";
import { auth } from "@/firebase";
import { useUIStore } from "@/store/ui.store";
import EventInformation from "@/components/event/EventInformation.vue";

const route = useRoute();
const router = useRouter();

const uiStore = useUIStore();
const eventStore = useEventStore();

const { isLoading } = storeToRefs(uiStore);
const { event, userName, participants, currentIdVideo } =
	storeToRefs(eventStore);

onBeforeMount(() => {
	const $eventId = route.params.eventId as string;
	if (!$eventId) router.back();

	event.value.eventId = $eventId;

	socket.connect();
});

onMounted(async () => {
	await onJoinEvent({ eventId: event.value.eventId });

	socket.on("joinEvent", ($socketId: string) => {
		socket.emit("updateCurrentVideo", {
			eventId: event.value.eventId,
			socketId: $socketId,
			videoId: currentIdVideo.value,
		});
	});

	socket.on("closeEvent", ($eventId: string) => {
		if ($eventId === event.value.eventId) {
			if (auth.currentUser?.uid === event.value.uid) {
				uiStore.showAlert("success", "Evento culminado.");
			} else {
				uiStore.showAlert("info", "El anfitrión a finalizado el evento");
			}

			eventStore.resetStore();
			router.push("/");
		}
	});

	socket.on("participants", ($participants: number) => {
		participants.value = $participants;
	});
});

onBeforeUnmount(() => {
	socket.emit("leaveEvent", event.value.eventId);
	socket.disconnect();
	eventStore.resetStore();
});

const onJoinEvent = async ({ eventId }: { eventId: string }) => {
	try {
		isLoading.value = true;
		const res = await joinEvent({ eventId });
		if (res.error) {
			uiStore.showAlert("error", res.message);
			router.push("/");
			return;
		}

		if (!res.data) return;
		event.value = res.data;

		socket.emit("joinEvent", event.value.eventId);
	} catch (error) {
		console.log({ error });
		router.push("/");
	} finally {
		isLoading.value = false;
	}
};
</script>
