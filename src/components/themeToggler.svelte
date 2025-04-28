<script lang="ts">
	import { browser } from '$app/environment';
    import { SunMoon, Sun, Moon } from '@lucide/svelte';

    let hasTheme = $state(false);
    let currentTheme = $state('light');

    $effect(() => {
        if (browser) {
            hasTheme = 'theme' in localStorage;
            currentTheme = hasTheme 
                ? localStorage.theme 
                : window.matchMedia('(prefers-color-scheme: dark)').matches 
                    ? 'dark' 
                    : 'light';
            
            document.documentElement.classList.toggle('dark', currentTheme === 'dark');
        }
    });

    const switchMode = () => {
        if (!browser) return;

        if (!hasTheme) {
            // Premier clic : passe en mode light (sauvegardé)
            currentTheme = 'light';
            localStorage.theme = 'light';
            hasTheme = true;
        } else if (currentTheme === 'light') {
            // Deuxième clic : passe en mode dark
            currentTheme = 'dark';
            localStorage.theme = 'dark';
        } else {
            // Troisième clic : retour au système (supprime la préférence)
            localStorage.removeItem('theme');
            hasTheme = false;
            currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? 'dark' 
                : 'light';
        }

        document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    }
</script>

<div class="flex gap-2">
    <button aria-label="theme-toggler" onclick={switchMode}>
        {#if !hasTheme}
            <SunMoon/> <!-- Mode système -->
        {:else if currentTheme === 'light'}
            <Sun/> <!-- Mode clair forcé -->
        {:else}
            <Moon/> <!-- Mode sombre forcé -->
        {/if}
    </button>
</div>