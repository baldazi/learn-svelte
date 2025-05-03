<script lang="ts">
	import TaskCard from "$components/TaskCard.svelte";
    import type {PageProps} from "./$types";

    let {data}:PageProps = $props()

</script>

<div class="min-h-screen bg-blue-200">
    <!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
    <form>
        <input type="text" placeholder="task name">
    </form>
    {#each data.list as d}
        <TaskCard data={d}/>
    {/each}
</div>
