<template>
	<editor v-model="editorValue" :init="init"></editor>
</template>

<script setup>
import { reactive, ref, watch, toRefs } from "vue";
import tinymce from "tinymce/tinymce.js";

// 外觀
import "tinymce/skins/ui/oxide/skin.css";
import "tinymce/themes/silver";

// Icon
import "tinymce/icons/default";

// 用到的外掛
import "tinymce/plugins/emoticons";
import "tinymce/plugins/emoticons/js/emojis.js";
import "tinymce/plugins/table";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/textcolor";

// 語言包
import "tinymce-i18n/langs5/zh_TW.js";

// TinyMCE-Vue
import Editor from "@tinymce/tinymce-vue";

const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
	plugins: {
		type: [String, Array],
		default:
			"anchor autolink charmap codesample emoticons image textcolor link lists media searchreplace table visualblocks",
	},
	toolbar: {
		type: [String, Array],
		default:
			"undo redo | forecolor backcolor | blocks fontfamily fontsize | bold italic underline strikethrough| link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat | searchreplace",
	},
});

const emit = defineEmits(["update:modelValue"]);

const init = reactive({
	language: "zh_TW",
	height: 500,
	menubar: false,
	content_css: false,
	skin: false,
	plugins: props.plugins,
	toolbar: props.toolbar,
	quickbars_insert_toolbar: false,
	branding: false,
	file_picker_types: "image",
	file_picker_callback: function (cb, value, meta) {
		var input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");

		input.onchange = function () {
			var file = this.files[0];

			var reader = new FileReader();
			reader.onload = function () {
				var id = "blobid" + new Date().getTime();
				var blobCache = tinymce.activeEditor.editorUpload.blobCache;
				var base64 = reader.result.split(",")[1];
				var blobInfo = blobCache.create(id, file, base64);
				blobCache.add(blobInfo);

				cb(blobInfo.blobUri(), { title: file.name });
			};
			reader.readAsDataURL(file);
		};

		input.click();
	},
	content_style:
		"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
});

const { modelValue } = toRefs(props);
const editorValue = ref(modelValue.value);

watch(modelValue, (newValue) => {
	editorValue.value = newValue;
});

watch(editorValue, (newValue) => {
	emit("update:modelValue", newValue);
});
</script>
