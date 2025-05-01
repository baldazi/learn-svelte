<script lang="ts">
	import loadPDF from "$lib/pdfjs";

</script>
<div class="p-2">
<canvas use:loadPDF={ '/sample.pdf' } class="ring-2 ring-green-300/60 mx-auto"></canvas>
</div>
