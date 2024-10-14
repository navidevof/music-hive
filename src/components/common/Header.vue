<template>
	<header class="w-full flex border-b-[0.1px] border-custom-green-1/50">
		<nav
			class="max-w-screen-lg mx-auto w-10/12 justify-between flex gap-x-5 items-center py-5"
		>
			<router-link
				to="/"
				class="text-custom-green-1 font-bold text-2xl flex items-center gap-x-2"
			>
				<img
					src="@/assets/logo.webp"
					alt="Logo Music Hive"
					class="w-16 md:w-14"
				/>
				<h2 class="md:block hidden">Music Hive</h2>
			</router-link>
			<div v-if="event.eventId != '' && route.path != '/'">
				<button
					v-if="auth.currentUser && auth.currentUser.uid == event.uid"
					class="bg-red-500 text-white text-xs items-center gap-x-2 flex"
					@click="onLeaveEvent"
				>
					<IconFinish class="size-5" />
					Finalizar Evento
				</button>
				<router-link
					to="/"
					v-else
					class="bg-red-500 text-white text-xs items-center gap-x-2 flex button"
				>
					<IconLogout class="size-5" />
					Salir
				</router-link>
			</div>
		</nav>
	</header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { auth } from "@/firebase";
import { useEventStore } from "@/store/event.store";

import IconFinish from "@/components/icons/IconFinish.vue";
import IconLogout from "@/components/icons/IconLogout.vue";
import { leaveEvent } from "@/services/event";
import { useUIStore } from "@/store/ui.store";
import { MESSAGES } from "@/utils/messages";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const eventStore = useEventStore();
const uiStore = useUIStore();

const { isLoading } = storeToRefs(uiStore);
const { event } = storeToRefs(eventStore);

const onLeaveEvent = async () => {
	try {
		isLoading.value = true;
		const res = await leaveEvent({ eventId: event.value.eventId });
		if (res.error) {
			uiStore.showAlert("error", res.message);
			return;
		}

		router.push("/");
	} catch (error) {
		console.log({ error });
		uiStore.showAlert("error", MESSAGES.DEFAULT_ERROR);
	} finally {
		isLoading.value = false;
	}
};
</script>
