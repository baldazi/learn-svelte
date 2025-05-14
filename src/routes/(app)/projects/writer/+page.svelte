<script lang="ts">
	import { EditorState } from "prosemirror-state";
	import { EditorView } from "prosemirror-view";
	import { schema as basicSchema } from "prosemirror-schema-basic";
	import { toggleMark, baseKeymap } from "prosemirror-commands";
	import {undo, redo, history} from "prosemirror-history"
	import {keymap} from "prosemirror-keymap"
	import { Bold, Indent, Italic, Outdent, Redo, Subscript, Superscript, Text, Underline, Undo } from "@lucide/svelte";
	import ContextMenu from "$components/contextMenu.svelte";
	import tippy from 'tippy.js';
	import type { Action } from "svelte/action";

	const tooltip: Action = (node , params) => {
		  $effect(() => {
			// setup goes here
			
			return () => {
				// teardown goes here
				tippy(node, params);
			};
		});
	}
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
			dispatchTransaction:(transaction) => {
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

	function toggleItalic() {
		toggleMark(basicSchema.marks.em)(view.state, view.dispatch);
	}
</script>

<ContextMenu/>

<div class="flex gap-1 shadow-2xl p-2 items-center h-12 border rounded mx-1">
	<div class="flex gap-1.5">
		<button onclick={undo} use:tooltip={{content :"undo"}}><Undo/></button>
		<button onclick={redo} title="redo"><Redo/></button>
	</div>
	<div class="border-r w-1 bg-dark-200 h-full"></div>
	<div class="flex gap-2.5">
		<button onclick={toggleBold} aria-label="bold"><Bold/></button>
		<button onclick={toggleBold} aria-label="underline"><Underline/></button>
		<button onclick={toggleItalic} aria-label="italic"><Italic/></button>
	</div>
	<div class="border-r w-1 bg-dark-200 h-full"></div>
	<div class="flex gap-2.5">
		<button onclick={toggleBold} aria-label="bold"><Subscript/></button>
		<button onclick={toggleBold} aria-label="underline"><Superscript/></button>
		<button onclick={toggleBold} aria-label="italic"><Text/></button>
	</div>

	<div class="flex gap-2.5">
		<button onclick={toggleBold} aria-label="bold"><Indent/></button>
		<button onclick={toggleBold} aria-label="bold"><Outdent/></button>
	</div>
</div>
<div bind:this={editorDiv}  onclick={()=>view.dom.focus()}
	class="mx-auto border-2 p-2 mt-2 w-[210mm] h-[297mm] mx-1 border-gray-500 shadow-2xl rounded-xs"></div>


<style>
	.ProseMirror-focused .ProseMirror-gapcursor{
    	outline: none;
	}
</style>