<template>
	<main class="flex flex-col grow">
		<section
			class="py-20 md:py-32 bg-hero-gradient text-center max-w-screen-lg w-10/12 mx-auto flex flex-col justify-center items-center gap-y-5"
		>
			<h1 class="text-custom-green-1 font-bold text-2xl lg:text-5xl uppercase">
				La forma más fácil de compartir música en tus eventos
			</h1>
			<p class="text-base lg:text-lg font-semibold text-custom-white/90">
				Crea listas de reproducción interactivas y deja que tus invitados
				agreguen, voten y disfruten de la música en tiempo real.
			</p>

			<div class="flex flex-col gap-y-3 justify-center items-center">
				<button @click="onClickCreateEvent" class="bg-custom-green-2 w-fit">
					{{
						auth.currentUser
							? "Crear nuevo evento 💖"
							: "Crea tu Primer Evento 🎯"
					}}
				</button>
				<div class="flex gap-x-5 items-center w-full">
					<div class="h-px bg-custom-white/50 w-full"></div>
					<span>o</span>
					<div class="h-px bg-custom-white/50 w-full"></div>
				</div>
				<button @click="showModalJoinEvent = true" class="border">
					Ingresa a un evento
				</button>
			</div>
		</section>
		<section class="flex flex-col bg-custom-black-2 py-20">
			<aside class="flex flex-col max-w-screen-lg w-10/12 mx-auto gap-y-7">
				<h2
					class="text-custom-green-1 font-bold text-2xl text-center lg:text-3xl"
				>
					¿Como funciona?
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div
						class="flex flex-col gap-y-3 group justify-center items-center p-5 rounded-2xl border border-custom-green-1 transition duration-300 h-full hover:scale-105 hover:bg-custom-black"
					>
						<IconSettings
							class="size-16 text-custom-green-1 group-hover:animate-spin"
						/>
						<p class="text-center">
							Configura tu evento en segundos. Invita a tus amigos y empieza a
							compartir música.
						</p>
					</div>
					<div
						class="flex flex-col gap-y-3 group justify-center items-center p-5 rounded-2xl border border-custom-green-1 transition duration-300 h-full hover:scale-105 hover:bg-custom-black"
					>
						<IconYoutube
							class="size-16 text-custom-green-1 group-hover:animate-bounce"
						/>
						<p class="text-center">
							Todos los participantes pueden agregar videos de YouTube a la cola
							de reproducción.
						</p>
					</div>
					<div
						class="flex flex-col gap-y-3 group justify-center items-center p-5 rounded-2xl border border-custom-green-1 transition duration-300 h-full hover:scale-105 hover:bg-custom-black"
					>
						<IconHeart
							class="size-16 text-custom-green-1 group-hover:animate-pulse"
						/>
						<p class="text-center">
							Deja que tus invitados voten sus canciones favoritas y determina
							la prioridad en la lista.
						</p>
					</div>
				</div>
			</aside>
		</section>

		<ModalCreateEvent
			@close="showModalCreateEvent = false"
			v-show="showModalCreateEvent"
		/>

		<ModalJoinEvent
			@close="showModalJoinEvent = false"
			v-show="showModalJoinEvent"
		/>
	</main>
</template>

<script setup lang="ts">
import ModalCreateEvent from "@/components/modals/event/ModalCreateEvent.vue";
import ModalJoinEvent from "@/components/modals/event/ModalJoinEvent.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import IconYoutube from "@/components/icons/IconYoutube.vue";
import { auth, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { ref } from "vue";

const showModalCreateEvent = ref<boolean>(false);
const showModalJoinEvent = ref<boolean>(false);

const onClickCreateEvent = async () => {
	if (auth.currentUser) {
		showModalCreateEvent.value = true;
		return;
	}

	await signInWithPopup(auth, provider);

	showModalCreateEvent.value = true;
};
</script>
