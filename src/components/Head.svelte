<script lang="ts">
    import {Menu, Skull, X} from '@lucide/svelte';
    let isToggle = $state(false);
</script>




<div class="flex flex-wrap item-center justify-between bg-teal-800/80 text-lime-100 p-3">
    <Skull/>
    <button aria-label="menu toggler" class="md:hidden" onclick={() => isToggle = !isToggle}>
        <Menu class={isToggle?"hidden":""}/>
        <X class={isToggle?"":"hidden"}/> 
    </button>

    <nav class={`${isToggle?"":"hidden"} w-full mt-5 md:mt-0 md:flex md:w-auto md:gap-3`}>
        <a href="#home" class="block border-b hover:text-gray-800">Home</a>
        <a href="#about" class="block border-b hover:text-gray-800">About</a>
        <a href="#contact" class="block border-b hover:text-gray-800">Contact</a>
    </nav>

    <button class={`${isToggle?"":"hidden"} w-full mt-5 md:flex md:w-auto md:mt-0`}>
        Login
    </button>
    
</div>