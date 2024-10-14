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
					<small class="text-pretty">
						Escanea el código QR para ingresar al evento o
						<a
							class="underline text-custom-green-1 cursor-pointer"
							@click="onManualJoinEvent"
						>
							ingresa el código manualmente.
						</a>
					</small>
				</div>
				<button
					@click="emit('close')"
					class="size-fit hover:text-custom-green-1 !p-0 text-custom-white"
				>
					x
				</button>
			</header>
			<form @submit.prevent="onSubmitJoinEvent" class="flex flex-col gap-y-5">
				<div
					v-show="showQrScan"
					class="w-11/12 mx-auto rounded-3xl max-w-72 overflow-hidden flex justify-center items-center"
				>
					<qrcode-stream
						@detect="onDetect"
						@init="onInit"
						@camera-on="isLoadingInternal = false"
						class="z-10 relative"
					></qrcode-stream>
					<div
						class="loader m-auto absolute z-0"
						v-show="isLoadingInternal"
					></div>
				</div>
				<input
					v-show="!showQrScan"
					type="text"
					placeholder="Código del evento"
					class="w-full rounded-md border p-2"
					name="event-code"
					v-model="eventCode"
					required
				/>
				<button
					v-show="!showQrScan"
					@click="showQrScan = true"
					class="p-0 text-xs mx-auto -mt-2"
				>
					Escanear código
				</button>
				<button class="bg-custom-green-2 w-full rounded-md">Ingresar</button>
			</form>
		</aside>
	</section>
</template>

<script lang="ts" setup>
import { useUIStore } from "@/store/ui.store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["close"]);
const uiStore = useUIStore();

const eventCode = ref<string>("");
const isLoadingInternal = ref<boolean>(true);
const showQrScan = ref<boolean>(true);

const onSubmitJoinEvent = async () => {
	if (eventCode.value.trim() === "") return;
	router.push("/event/" + eventCode.value);
};

const onManualJoinEvent = async () => {
	showQrScan.value = false;
	eventCode.value = "";
};

function onDetect(decodedString: any) {
	const result = decodedString[0].rawValue as string;
	const url = `${window.location.host}`;
	if (!result.includes(url)) {
		uiStore.showAlert("error", "El código no es válido");
		return;
	}

	eventCode.value = result.split("/").slice(-1)[0];
	showQrScan.value = false;
}

function onInit(promise: Promise<any>) {
	promise
		.then(() => {
			console.log("Lector de QR inicializado");
		})
		.catch((err) => {
			console.error("Error al inicializar el lector:", err);
		});
}
</script>
