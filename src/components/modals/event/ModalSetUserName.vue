<template>
	<section
		v-if="showModal"
		class="fixed inset-0 z-50 h-screen w-full grid place-items-center bg-custom-black-2/50 backdrop-blur-sm transition duration-300 ease-out"
	>
		<aside
			class="flex flex-col gap-y-7 bg-custom-black-2 border border-custom-green-1 shadow-2xl shadow-custom-green-3 rounded-2xl p-5 max-w-md w-10/12"
		>
			<header class="flex justify-between">
				<div class="flex flex-col">
					<h2 class="text-custom-white font-bold text-xl">
						Ingresar al evento
					</h2>
					<small>Ingresa tu nombre para poder participar.</small>
				</div>
				<button
					@click="onSubmitSetUserName"
					class="size-fit hover:text-custom-green-1 !p-0 text-custom-white"
				>
					x
				</button>
			</header>
			<form @submit.prevent="onSubmitSetUserName" class="flex flex-col gap-y-5">
				<input
					type="text"
					placeholder="Escribe tu nombre"
					class="w-full rounded-md border p-2"
					v-model="$userName"
				/>
				<div class="flex flex-col gap-y-3">
					<button type="submit" class="bg-custom-green-2 w-full rounded-md">
						Ingresar
					</button>
					<button type="submit" class="text-xs !p-0 text-center underline">
						Ingresar como anónimo 👻
					</button>
				</div>
			</form>
		</aside>
	</section>
</template>

<script lang="ts" setup>
import { useEventStore } from "@/store/event.store";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const eventStore = useEventStore();
const { userName } = storeToRefs(eventStore);

const $userName = ref<string>("");
const showModal = ref<boolean>(true);

const onSubmitSetUserName = async () => {
	if ($userName.value.trim() === "") {
		userName.value = "Anónimo";
	} else {
		userName.value = $userName.value.trim();
	}

	showModal.value = false;
};
</script>
