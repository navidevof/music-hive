import { IEvent } from "@/interfaces/event";
import { IVideo } from "@/interfaces/video";
import { initialData } from "@/utils/initial-data";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useEventStore = defineStore(
	"event",
	() => {
		const userName = ref<string>("");
		const event = ref<IEvent>({ ...initialData.event });
		const currentIdVideo = ref<string>("");
		const playLists = ref<IVideo[]>([]);
		const participants = ref<number>(0);

		const resetStore = () => {
			userName.value = "";
			event.value = { ...initialData.event };
			currentIdVideo.value = "";
			playLists.value = [];
			participants.value = 0;

			console.log("resetStore");
		};

		return {
			event,
			currentIdVideo,
			playLists,
			resetStore,
			userName,
			participants,
		};
	},
	{
		persist: true,
	}
);
