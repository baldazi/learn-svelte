<script lang="ts">
	import { EditorState } from "prosemirror-state";
	import { EditorView } from "prosemirror-view";
	import { schema as basicSchema } from "prosemirror-schema-basic";
	import { toggleMark, baseKeymap } from "prosemirror-commands";
	import {undo, redo, history} from "prosemirror-history"
	import {keymap} from "prosemirror-keymap"
	import { Bold, Redo, Undo } from "@lucide/svelte";
	import ContextMenu from "$components/contextMenu.svelte";

	let editorDiv: HTMLDivElement;
	let view: EditorView;

	$effect(() => {
		const state = EditorState.create({
			schema: basicSchema,
			
			plugins: [
						history(),
						keymap({"Mod-z": undo, "Mod-y": redo}),
						keymap(baseKeymap)
					]
		});

		view = new EditorView(editorDiv, {
			state,
			dispatchTransaction(transaction) {
				console.log("Document size went from", transaction.before.content.size,
							"to", transaction.doc.content.size)
				let newState = view.state.apply(transaction)
				view.updateState(newState)
			}
		});
	});

	function toggleBold() {
		toggleMark(basicSchema.marks.strong)(view.state, view.dispatch);
	}
</script>

<ContextMenu/>
<div class="flex flex-col">
	<div class="flex border">
		<button onclick={undo} aria-label="undo"><Undo/></button>
		<button onclick={redo} aria-label="redo"><Redo/></button>
	</div>
	<button onclick={toggleBold} aria-label="bold"><Bold/></button>
</div>
<div bind:this={editorDiv} class="border p-2 mt-2 h-full"></div>


