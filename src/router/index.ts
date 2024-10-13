import { auth } from "@/firebase";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const pages: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "landing",
		component: () => import("@/pages/Landing.vue"),
	},
];

const routes: Array<RouteRecordRaw> = [
	...pages,
	{
		path: "/event/:eventId",
		name: "event",
		component: () => import("@/views/Event.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, _, next) => {
	if (
		to.matched.some((record) => record.meta.requiresAuth) &&
		!auth.currentUser
	) {
		next("/");
		return;
	}

	next();
});

export default router;
