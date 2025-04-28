<script lang="ts">
	import { browser } from '$app/environment';
    import { SunMoon, Sun, Moon} from '@lucide/svelte';

    let hasTheme = $state(false);
    let currentTheme = $state('light')

    $effect( () => {
        if (browser){
            hasTheme = 'theme' in localStorage;
            currentTheme = hasTheme? localStorage.theme : 
                window.matchMedia('(prefers-color-scheme:dark)').matches?
                'dark':'light';
            
            //apply the theme
            document.documentElement.classList.toggle('dark', currentTheme === 'dark');
        }
            
    })

    const switchMode = () => {
        if (hasTheme)
            localStorage.removeItem('theme');
        else{
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            localStorage.theme = isDark ? 'dark' : 'light';
        }
        hasTheme = 'theme' in localStorage;      
        currentTheme = hasTheme? localStorage.theme : 
                window.matchMedia('(prefers-color-scheme:dark)').matches?
                'dark':'light';
            
            //apply the theme
        document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    }
</script>

<div class="flex gap-2">

    <div>

    </div>

    <button aria-label="theme-toggler" onclick={switchMode}>
        {#if hasTheme}
            <SunMoon/>
        {:else if currentTheme === 'dark'}
            <Moon/>
        {:else}
            <Sun/>
        {/if}
    </button>

</div>