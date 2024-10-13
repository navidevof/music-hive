import { defineStore } from "pinia";
import { ref } from "vue";
import { POSITION, useToast } from "vue-toastification";

type AlertType = "warning" | "success" | "info" | "error";

export const useUIStore = defineStore("ui", () => {
	const toast = useToast();
	const isLoading = ref<boolean>(false);

	function setState(state: boolean) {
		isLoading.value = state;
	}

	const showAlert = (type: AlertType, message: string) => {
		toast[type](message, {
			position: POSITION.BOTTOM_CENTER,
			timeout: 3000,
		});
	};

	return { isLoading, setState, showAlert };
});
