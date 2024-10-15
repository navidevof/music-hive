<template>
	<section class="w-full mx-auto max-w-screen-md">
		<aside
			class="aspect-video w-full rounded-2xl overflow-hidden border-custom-green-1 border"
		>
			<lite-youtube
				v-if="auth.currentUser && event.uid == auth.currentUser.uid"
				:videoid="currentIdVideo"
				params="rel=0&showinfo=0"
			></lite-youtube>
			<div v-else class="size-full relative">
				<img
					:src="video.image"
					class="size-full absolute z-0 top-0 left-0 object-cover"
					loading="lazy"
				/>
				<div
					class="size-full flex flex-col bg-custom-black/70 relative z-10 p-5"
				>
					<h3 class="text-white md:text-xl font-bold line-clamp-1">
						{{ video.title }}
					</h3>
					<div
						class="text-center uppercase text-sm md:text-lg font-bold max-w-sm mx-auto grow flex text-pre justify-center items-center"
					>
						SOLO EL ADMINISTRADOR PUEDE REPRODUCIR LAS CANCIONES<br />
					</div>
				</div>
			</div>
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

const video = computed(() => {
	if (playLists.value.length === 0) return {};
	if (currentIdVideo.value === "") {
		return {
			image: playLists.value[0].image,
			title: playLists.value[0].title,
		};
	}
	const videoIdx = playLists.value.findIndex(
		(video) => video.videoId === currentIdVideo.value
	);

	if (videoIdx === -1) return {};

	return {
		image: playLists.value[videoIdx].image,
		title: playLists.value[videoIdx].title,
	};
});
</script>
