<script setup>
import { useComponentStore } from '@/store/component';
import { useParameterStore } from '@/store/parameter';
import { ref } from 'vue';
const comStore = useComponentStore();
const login = useParameterStore();
const { fixOpenEditPop } = comStore;
const { fixError } = login;

const emit = defineEmits(['data']);
const props = defineProps({
	foo: String,
	title: String,
	rules: Object,
	keys: Array,
});
const editTarget = ref(JSON.parse(props.foo));
const formData = ref(null);

const editAdmin = () => {
	formData.value.validate(async (valid) => {
		console.log(valid);
		if (valid) {
			emit('data', editTarget.value);
			fixOpenEditPop(false);
		} else
			fixError({
				title: 'Error',
				msg: 'Some data cannot be empty!',
				isShow: true,
			});
	});
};
</script>

<template>
	<div class="edit-pop">
		<header>
			<h2>{{ props.title }}</h2>
		</header>
		<main>
			<el-form
				label-position="left"
				label-width="150px"
				:rules="props.rules"
				:model="editTarget"
				ref="formData"
			>
				<div v-for="ed in props.keys" :key="ed">
					<el-form-item :label="`${ed.title}`" :prop="`${ed.key}`">
						<el-input
							type="text"
							style="width: 30em"
							autocomplete="off"
							v-model="editTarget[ed.key]"
							v-if="ed.option === 'input'"
						></el-input>
						<select v-model="editTarget[ed.key]" v-else>
							<option
								v-for="item in ed.isSelect"
								:key="item.opt"
								:value="item.val"
							>
								{{ item.opt }}
							</option>
						</select>
					</el-form-item>
				</div>
			</el-form>
		</main>
		<footer>
			<el-button
				@click="editAdmin"
				class="btn"
				style="width: 15%"
				type="primary"
			>
				Edit
			</el-button>
			<el-button
				@click="fixOpenEditPop(false)"
				class="btn"
				style="width: 15%"
				type="primary"
			>
				Abort
			</el-button>
		</footer>
	</div>
</template>

<style lang="scss">
@import '../assets/scss/_color.scss';
@import '../assets/scss/_style.scss';
.edit-pop {
	position: fixed;
	width: 800px;
	height: 600px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 10px 10px 10px rgba($color: $main-font-color, $alpha: 0.3);
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10000;
	padding: 20px;
	header {
		width: 100%;
		height: 15%;
		color: $main-font-color;
	}
	main {
		width: 100%;
		height: 70%;
		overflow: auto;
		select {
			@extend %select;
		}
	}
	footer {
		width: 100%;
		height: 15%;
		display: flex;
		justify-content: flex-end;
	}
}
</style>
