<template>
	<section class="w-10/12 mx-auto max-w-screen-md flex flex-col gap-y-5">
		<div
			class="flex gap-x-2 items-center w-full bg-custom-black-2 rounded-2xl overflow-hidden py-2"
			v-for="video in playLists"
			:key="video.videoId"
		>
			<div class="w-full aspect-video max-w-36 md:max-w-56 px-2">
				<img
					:src="video.image"
					class="size-full"
					loading="lazy"
					:alt="`Imagen del video ${video.title}`"
				/>
			</div>
			<div class="w-full flex flex-col gap-y-0">
				<h4 class="text-sm font-bold w-full line-clamp-1">
					{{ video.title }}
				</h4>
				<span class="text-xs text-custom-white">
					<strong class="font-medium">Agrego por:</strong> {{ video.userName }}
				</span>
				<div
					class="flex gap-x-2 items-center"
					v-if="auth.currentUser && event.uid === auth.currentUser.uid"
				>
					<button
						type="button"
						class="bg-custom-green-2 max-w-xs py-2 px-3 md:py-3 md:px-4 line-clamp-1 mt-3"
						@click="() => onChangeCurrentVideo(video.videoId)"
					>
						<IconPlayerPlay class="size-5" />
					</button>
					<button
						type="button"
						class="bg-red-500 max-w-xs py-2 px-3 md:py-3 md:px-4 line-clamp-1 mt-3"
						@click="currentIdVideo = video.videoId"
					>
						<IconTrash class="size-5" />
					</button>
				</div>
				<button
					v-else
					type="button"
					class="bg-custom-green-2 max-w-xs py-2 px-3 w-fit md:py-3 md:px-4 line-clamp-1 mt-3"
					@click="currentIdVideo = video.videoId"
				>
					<IconHeart class="size-5" />
				</button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { auth } from "@/firebase";
import socket from "@/lib/socket-client";

import { IVideo } from "@/interfaces/video";
import { getPlaylists } from "@/services/event";
import { useEventStore } from "@/store/event.store";

import IconHeart from "@/components/icons/IconHeart.vue";
import IconPlayerPlay from "@/components/icons/IconPlayerPlay.vue";
import IconTrash from "@/components/icons/IconTrash.vue";

const eventStore = useEventStore();
const { playLists, event, currentIdVideo } = storeToRefs(eventStore);

onMounted(async () => {
	if (!event.value?.eventId) return;
	await onGetPlaylists({ eventId: event.value.eventId });

	socket.on("updatePlaylists", (playlist: IVideo[]) => {
		playLists.value = playlist;
	});
});

const onGetPlaylists = async ({ eventId }: { eventId: string }) => {
	try {
		const res = await getPlaylists({ eventId });
		if (res.error) {
			// TODO: show error
			return;
		}

		playLists.value = res?.data ?? [];
	} catch (error) {
		console.log({ error });
	}
};

const onChangeCurrentVideo = (videoId: string) => {
	currentIdVideo.value = videoId;
	socket.emit("updateCurrentVideo", {
		eventId: event.value.eventId,
		videoId,
	});
};
</script>
