<script lang="ts">
	import { EditorState } from "prosemirror-state";
	import { EditorView } from "prosemirror-view";
	import { schema as basicSchema } from "prosemirror-schema-basic";
	import { toggleMark, baseKeymap } from "prosemirror-commands";
	import {undo, redo, history} from "prosemirror-history"
	import {keymap} from "prosemirror-keymap"
	import { Bold, Indent, Italic, Outdent, Redo, Subscript, Superscript, Text, Underline, Undo } from "@lucide/svelte";
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css'; 
	import type { Action } from "svelte/action";
	import * as Menubar from "$lib/components/ui/menubar";

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

<Menubar.Root>
	<Menubar.Menu>
	  <Menubar.Trigger>File</Menubar.Trigger>
	  <Menubar.Content>
		<Menubar.Item>
		  New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
		</Menubar.Item>
		<Menubar.Item>
		  New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
		</Menubar.Item>
		<Menubar.Item>New Incognito Window</Menubar.Item>
		<Menubar.Separator />
		<Menubar.Sub>
		  <Menubar.SubTrigger>Share</Menubar.SubTrigger>
		  <Menubar.SubContent>
			<Menubar.Item>Email link</Menubar.Item>
			<Menubar.Item>Messages</Menubar.Item>
			<Menubar.Item>Notes</Menubar.Item>
		  </Menubar.SubContent>
		</Menubar.Sub>
		<Menubar.Separator />
		<Menubar.Item>
		  Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
		</Menubar.Item>
	  </Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
	  <Menubar.Trigger>Edit</Menubar.Trigger>
	  <Menubar.Content>
		<Menubar.Item>
		  Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
		</Menubar.Item>
		<Menubar.Item>
		  Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
		</Menubar.Item>
		<Menubar.Separator />
		<Menubar.Sub>
		  <Menubar.SubTrigger>Find</Menubar.SubTrigger>
		  <Menubar.SubContent>
			<Menubar.Item>Search the web</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>Find...</Menubar.Item>
			<Menubar.Item>Find Next</Menubar.Item>
			<Menubar.Item>Find Previous</Menubar.Item>
		  </Menubar.SubContent>
		</Menubar.Sub>
		<Menubar.Separator />
		<Menubar.Item>Cut</Menubar.Item>
		<Menubar.Item>Copy</Menubar.Item>
		<Menubar.Item>Paste</Menubar.Item>
	  </Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
	  <Menubar.Trigger>View</Menubar.Trigger>
	  <Menubar.Content>
		<Menubar.CheckboxItem 
		  >Always Show Bookmarks Bar</Menubar.CheckboxItem
		>
		<Menubar.CheckboxItem>
		  Always Show Full URLs
		</Menubar.CheckboxItem>
		<Menubar.Separator />
		<Menubar.Item inset>
		  Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
		</Menubar.Item>
		<Menubar.Item inset>
		  Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
		</Menubar.Item>
		<Menubar.Separator />
		<Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
		<Menubar.Separator />
		<Menubar.Item inset>Hide Sidebar</Menubar.Item>
	  </Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
	  <Menubar.Trigger>Profiles</Menubar.Trigger>
	  <Menubar.Content>
		<Menubar.RadioGroup>
		  <Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
		  <Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
		  <Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
		</Menubar.RadioGroup>
		<Menubar.Separator />
		<Menubar.Item inset>Edit...</Menubar.Item>
		<Menubar.Separator />
		<Menubar.Item inset>Add Profile...</Menubar.Item>
	  </Menubar.Content>
	</Menubar.Menu>
  </Menubar.Root>

<div class="flex gap-1 shadow-2xl p-2 items-center h-12 border rounded mx-1">
	
	<div class="flex gap-1.5">
		<button onclick={undo} use:tooltip={{content :"undo"}} aria-label="undo"><Undo/></button>
		<button onclick={redo} use:tooltip={{content :"redo"}}><Redo/></button>
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
	class="mx-auto border-2 p-2 mt-2 w-[210mm] h-[297mm] mx-1 border-gray-500 shadow-2xl rounded-xs mb-2.5"></div>


<div class="fixed bg-gray-50 border border-gray-500/20 bottom-0 z-10 inset-x-0">

</div>


