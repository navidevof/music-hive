<template>
	<section
		class="fixed inset-0 z-50 h-screen w-full grid place-items-center bg-custom-black-2/50 backdrop-blur-sm transition duration-300 ease-out"
	>
		<aside
			class="flex flex-col gap-y-7 bg-custom-black-2 border border-custom-green-1 shadow-2xl shadow-custom-green-3 rounded-2xl p-5 max-w-md w-10/12"
		>
			<header class="flex justify-between">
				<div class="flex flex-col">
					<h2 class="text-custom-white font-bold text-xl">
						Crear nuevo evento
					</h2>
					<small>Ingresa el nombre del evento para poder iniciar.</small>
				</div>
				<button
					@click="emit('close')"
					class="size-fit hover:text-custom-green-1 !p-0 text-custom-white"
				>
					x
				</button>
			</header>
			<form @submit.prevent="onSubmitCreateEvent" class="flex flex-col gap-y-5">
				<input
					type="text"
					placeholder="Nombre del evento"
					class="w-full rounded-md border p-2"
					required
					v-model="eventName"
				/>
				<button class="bg-custom-green-2 w-full rounded-md">Crear</button>
			</form>
		</aside>
	</section>
</template>

<script lang="ts" setup>
import { createEvent } from "@/services/event";
import { useUIStore } from "@/store/ui.store";
import { MESSAGES } from "@/utils/messages";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const uiStore = useUIStore();
const router = useRouter();
const { isLoading } = storeToRefs(uiStore);

const emit = defineEmits(["close"]);
const eventName = ref<string>("");

const onSubmitCreateEvent = async () => {
	try {
		isLoading.value = true;
		const res = await createEvent({ name: eventName.value });
		if (res.error) {
			uiStore.showAlert("error", res.message);
			return;
		}

		uiStore.showAlert("success", "Evento creado con éxito.");
		router.push("/event/" + res.data?.eventId);
	} catch (error) {
		console.log({ error });
		uiStore.showAlert("error", MESSAGES.DEFAULT_ERROR);
	} finally {
		emit("close");
		isLoading.value = false;
	}
};
</script>
