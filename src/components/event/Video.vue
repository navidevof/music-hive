<template>
	<section class="w-10/12 mx-auto max-w-screen-md">
		<aside
			class="aspect-video w-full rounded-2xl overflow-hidden border-custom-green-1 border"
		>
			<lite-youtube
				v-if="auth.currentUser && event.uid == auth.currentUser.uid"
				:videoid="currentIdVideo"
				params="rel=0&showinfo=0"
			></lite-youtube>
			<img v-else :src="imageVideo" class="size-full" loading="lazy" />
		</aside>
	</section>
</template>

<script setup lang="ts">
import { auth } from "@/firebase";
import socket from "@/lib/socket-client";
import { useEventStore } from "@/store/event.store";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";

const eventStore = useEventStore();
const { currentIdVideo, event, playLists } = storeToRefs(eventStore);

onMounted(async () => {
	socket.on("updateCurrentVideo", (videoId: string) => {
		currentIdVideo.value = videoId;
	});

	if (playLists.value.length === 0) return;
	currentIdVideo.value = playLists.value[0].videoId;
});

const imageVideo = computed(() => {
	if (playLists.value.length === 0) return "";
	if (currentIdVideo.value === "") {
		return playLists.value[0].image;
	}
	const videoIdx = playLists.value.findIndex(
		(video) => video.videoId === currentIdVideo.value
	);

	if (videoIdx === -1) return "";

	return playLists.value[videoIdx].image;
});
</script>
