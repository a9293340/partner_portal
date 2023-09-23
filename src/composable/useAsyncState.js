import { ref } from "vue";

export function useAsyncState(promise, initialState) {
	const state = ref(initialState | []);
	const isReady = ref(false);
	const error = ref(null);

	const execute = async () => {
		try {
			state.value = await promise;
			isReady.value = true;
		} catch (error) {
			error.value = error;
		}
	};

	execute();

	return {
		state,
		isReady,
		error,
	};
}
