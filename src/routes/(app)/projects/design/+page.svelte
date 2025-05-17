<script lang="ts">
	import ctxMenuAction from '$lib/actions/contextMenu.svelte';
    import Konva from 'konva';

    let containerDiv: HTMLDivElement;
    const ctxMenu = $state({width:0, height:0, x: 0, y: 0, isShow: false});


    $inspect(ctxMenu)

    $effect(() => {
        let {width, height} = containerDiv.getBoundingClientRect();
        const stage = new Konva.Stage({
            container: containerDiv,
            width,
            height,
        });

        const layer = new Konva.Layer();
        stage.add(layer);

        const circle = new Konva.Circle({
            x: stage.width() / 2,
            y: stage.height() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true,
        });
        // add cursor styling
        circle.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
        });
        circle.on('mouseout', function () {
        document.body.style.cursor = 'default';
        });

        layer.add(circle);
    })
    
</script>

<div class="flex flex-wrap relative">
    <div bind:this={containerDiv} class="size-[72mm] border rounded" use:ctxMenuAction={ctxMenu}></div>

    {#if ctxMenu.isShow}
    <nav class="absolute" bind:offsetHeight={ctxMenu.height} bind:offsetWidth={ctxMenu.width}
    style="top:{ctxMenu.y}px; left:{ctxMenu.x}px">
        <ul class="rounded shadow p-2 flex flex-col gap-2">
            <li>Show {ctxMenu.x}</li>
            <li>Edit {ctxMenu.y}</li>
            <li>Delete</li>
        </ul>
    </nav>
    {/if}
</div>
