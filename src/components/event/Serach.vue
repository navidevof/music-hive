<template>
	<form
		ref="searchDropdown"
		@submit.prevent="onSubmit"
		class="w-full max-w-md md:max-w-lg mx-auto flex justify-center gap-x-3 items-center z-20 relative"
	>
		<input
			type="text"
			placeholder="Buscar video"
			v-model="search"
			class="w-full max-w-60"
			@focus="showSearch = true"
		/>
		<button
			type="submit"
			:disabled="isLocalLoading"
			class="button bg-custom-green-2 text-sm disabled:bg-custom-green-3 disabled:cursor-not-allowed"
		>
			Buscar
		</button>

		<!-- Buscador -->
		<aside
			v-show="showSearch"
			class="absolute top-full mt-4 bg-custom-black-2 max-h-[500px] border border-custom-green-3 overflow-x-hidden overflow-y-auto w-10/12 flex flex-col rounded-xl gap-2 p-3 left-1/2 -translate-x-1/2"
		>
			<div
				class="flex gap-x-2 items-center w-full"
				v-for="video in videoResult"
				:key="video.videoId"
				v-show="!isLocalLoading"
			>
				<img
					:src="video.image"
					class="w-full aspect-video max-w-32 md:max-w-48"
					loading="lazy"
					:alt="`Imagen del video ${video.title}`"
				/>
				<div class="w-full flex flex-col gap-y-2">
					<h4 class="text-sm font-bold w-full line-clamp-1">
						{{ video.title }}
					</h4>
					<button
						type="button"
						@click="() => onAddToPlaylist(video)"
						class="bg-custom-green-2 text-sm line-clamp-1"
					>
						Agregar a la lista
					</button>
				</div>
			</div>
			<span
				v-show="isLocalLoading"
				class="text-custom-white text-sm line-clamp-1"
			>
				Cargando resultado para "{{ search }}"...
			</span>
			<span
				v-show="!isLocalLoading && videoResult.length === 0"
				class="text-custom-white text-sm line-clamp-1"
			>
				Realiza una búsqueda para ver los resultados.
			</span>
		</aside>
	</form>
</template>

<script lang="ts" setup>
import { ISearchVideo } from "@/interfaces/video";
import { addVideoToPlaylist } from "@/services/video";
import { searchVideo } from "@/services/video";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useEventStore } from "../../store/event.store";
import { storeToRefs } from "pinia";
import { auth } from "@/firebase";
import { useUIStore } from "@/store/ui.store";
import { MESSAGES } from "@/utils/messages";

const uiStore = useUIStore();
const eventStore = useEventStore();

const { event, userName } = storeToRefs(eventStore);
const { isLoading } = storeToRefs(uiStore);

const isLocalLoading = ref<boolean>(false);
const search = ref<string>("");
const showSearch = ref<boolean>(false);
const videoResult = ref<ISearchVideo[]>([]);

const searchDropdown = ref<HTMLElement | null>(null);

const onSubmit = async () => {
	try {
		showSearch.value = true;
		isLocalLoading.value = true;
		const res = await searchVideo(search.value);
		videoResult.value = res.data;
	} catch (error) {
		console.log({ error });
	} finally {
		isLocalLoading.value = false;
	}
};

const handleClickOutside = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	if (searchDropdown.value && !searchDropdown.value.contains(target)) {
		showSearch.value = false;
	}
};

const onAddToPlaylist = async (video: ISearchVideo) => {
	if (!event.value?.eventId) return;
	try {
		showSearch.value = false;
		isLoading.value = true;
		const res = await addVideoToPlaylist({
			userName:
				auth.currentUser && event.value.uid == auth.currentUser.uid
					? "Administrador"
					: userName.value,
			eventId: event.value.eventId,
			video,
		});
		if (res.error) {
			uiStore.showAlert("error", res.message);
			return;
		}
	} catch (error) {
		console.log({ error });
		uiStore.showAlert("error", MESSAGES.DEFAULT_ERROR);
	} finally {
		isLoading.value = false;
	}
};

onMounted(() => {
	document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener("click", handleClickOutside);
});
</script>
