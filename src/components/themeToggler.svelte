<script lang="ts">
    import {Bolt, SunMoon, Sun, Moon} from '@lucide/svelte'
</script>

<div class="flex gap-2">

    <div>
        
    </div>

    <button aria-label="theme-toggler">
        {#if 'theme' in localStorage}
            <SunMoon/>
        {:else}
            <Bolt/>
        {/if}
    </button>

</div>