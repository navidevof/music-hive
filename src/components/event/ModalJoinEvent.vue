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
						Ingresar al evento
					</h2>
					<small>Escribe el código del evento para poder participar.</small>
				</div>
				<button
					@click="emit('close')"
					class="size-fit hover:text-custom-green-1 !p-0 text-custom-white"
				>
					x
				</button>
			</header>
			<form @submit.prevent="onSubmitJoinEvent" class="flex flex-col gap-y-5">
				<input
					type="text"
					placeholder="Código del evento"
					class="w-full rounded-md border p-2"
					v-model="eventCode"
					required
				/>
				<button class="bg-custom-green-2 w-full rounded-md">Ingresar</button>
			</form>
		</aside>
	</section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits(["close"]);

const eventCode = ref<string>("");

const onSubmitJoinEvent = async () => {
	if (eventCode.value.trim() === "") return;
	router.push("/event/" + eventCode.value);
};
</script>
