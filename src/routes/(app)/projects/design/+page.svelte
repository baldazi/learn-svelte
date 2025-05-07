<script lang="ts">
    import Konva from 'konva';

    let containerDiv: HTMLDivElement

    $effect(() => {
        const stage = new Konva.Stage({
            container: containerDiv,
            width: window.innerWidth,
            height: window.innerHeight,
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

<div class="flex flex-wrap">
    <div bind:this={containerDiv} class="w-[72mm] border rounded"></div>
</div>

