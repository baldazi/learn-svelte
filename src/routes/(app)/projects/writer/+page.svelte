<script lang="ts">
	import { EditorState } from "prosemirror-state";
	import { EditorView } from "prosemirror-view";
	import { schema as basicSchema } from "prosemirror-schema-basic";
	import { toggleMark, baseKeymap } from "prosemirror-commands";
	import {undo, redo, history} from "prosemirror-history";
	import {keymap} from "prosemirror-keymap";
	import { MarkType } from "prosemirror-model";
	import { Bold, Indent, Italic, Outdent, Redo, Subscript, Superscript, Text, Underline, Undo } from "@lucide/svelte";
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css'; 
	import type { Action } from "svelte/action";

	function markActive(state: EditorState, type: MarkType) {
		const sel = state.selection;
		if (sel.empty) {
			return !!type.isInSet(state.storedMarks || sel.$from.marks());
		} else {
			return state.doc.rangeHasMark(sel.from, sel.to, type);
		}
	}

	const tooltip: Action<HTMLElement, Object> = (node , params) => {
		  $effect(() => {
			tippy(node, params);
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
				updateBoldState()
			}
		});
	});

	let isBold = $state(false);
	const updateBoldState = () => {
		if (!view) return;
		isBold = markActive(view.state, basicSchema.marks.strong);
	};

	function toggleBold() {
		toggleMark(basicSchema.marks.strong)(view.state, view.dispatch);
		console.log(isBold);
	}

	function toggleItalic() {
		toggleMark(basicSchema.marks.em)(view.state, view.dispatch);
	}
</script>

<div class="flex gap-1 shadow-2xl p-2 items-center h-12 border rounded mx-1">
	
	<div class="flex gap-1.5">
		<button onclick={() => {undo(view.state, view.dispatch); view.dom.focus()}} use:tooltip={{content :"undo"}} aria-label="undo"><Undo/></button>
		<button onclick={() => {redo(view.state, view.dispatch); view.dom.focus()}} use:tooltip={{content :"redo"}}><Redo/></button>
	</div>
	<div class="border-r w-1 bg-dark-200 h-full"></div>
	<div class="flex gap-2.5">
		<button onclick={toggleBold} use:tooltip={{content :"bold"}} aria-label="bold" class:is-active={isBold}><Bold/></button>
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
	class="mx-auto border-2 p-2 mt-2 w-[210mm] h-[297mm] mx-1 border-gray-500 shadow-2xl rounded-xs mb-2.5"></div>


<div class="fixed bg-gray-50 border border-gray-500/20 bottom-0 z-10 inset-x-0">

</div>

<style>
	.is-active {
	color: #000;
	background-color: #ddd;
}
</style>


