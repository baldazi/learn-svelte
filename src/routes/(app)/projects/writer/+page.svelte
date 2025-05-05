<script lang="ts">
	import { EditorState } from "prosemirror-state";
	import { EditorView } from "prosemirror-view";
	import { Schema } from "prosemirror-model";
	import { schema as basicSchema } from "prosemirror-schema-basic";
	import { toggleMark } from "prosemirror-commands";

	let editorDiv: HTMLDivElement;
	let view: EditorView;

	$effect(() => {
		const state = EditorState.create({
			schema: basicSchema
		});

		view = new EditorView(editorDiv, {
			state
		});
	});

	function toggleBold() {
		toggleMark(basicSchema.marks.strong)(view.state, view.dispatch);
	}
</script>

<div>
	<button onclick={toggleBold}>Bold</button>
</div>
<div bind:this={editorDiv} class="border p-2 mt-2 h-full"></div>

