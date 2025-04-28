<script lang="ts">
    import { getLocale, locales, localizeHref, setLocale } from '$lib/paraglide/runtime';
    import {page} from '$app/state';
    import logo from '$assets/images/logo.svg';
	import { m } from '$lib/paraglide/messages.js';
	import ThemeToggler from './themeToggler.svelte';

    let lang = getLocale();
</script>

<header class="flex items-center justify-between dark:bg-teal-900 bg-teal-200 shadow backdrop-blur-md p-0.5 px-2">
    <a class="flex items-center" href="/">
        <img src={logo} alt="SvelteKit" class="w-10 h-10 text-gray-500/60"/>
        <h1 class="text-xl font-semibold bg-linear-to-r from-gray-800 to-blue-600 text-transparent bg-clip-text">Task</h1>
    </a>

    <nav>
        <ul class="flex items-center gap-2.5">
            <li aria-current={page.url.pathname === '/'? 'page' : undefined}
                class="text-lg text-teal-100 hover:bg-teal-800 p-1 rounded">
                <a href="/">{m["navigation.home"]()}</a>
            </li>
            <li aria-current={page.url.pathname === '/task' ? 'page' : undefined}
                class="text-lg text-teal-100 hover:bg-teal-800 p-1 rounded">
                <a href="/task">{m["navigation.task"]()}</a>
            </li>
            <li aria-current={page.url.pathname === '/calendar'?'page' : undefined}
                class="text-lg text-teal-100 hover:bg-teal-800 p-1 rounded">
                <a href="/calendar">{m["navigation.calendar"]()}</a>
            </li>

            <li aria-current={page.url.pathname === '/projects' ? 'page' : undefined}
                class="text-lg text-teal-100 hover:bg-teal-800 p-1 rounded">
                <a href="/projects">{m["navigation.projects"]()}</a>
            </li>

            <li aria-current={page.url.pathname === '/help' ? 'page' : undefined}
                class="text-lg text-teal-100 hover:bg-teal-800 p-1 rounded">
                <a href={localizeHref("/help")}>{m["navigation.help"]()}</a>
            </li>
        </ul>
    </nav>

    <div class="flex items-center gap-3">
        
        <select bind:value={lang} onchange={() => setLocale(lang)} class="border-2 border-teal-800 h-10 rounded focus:ring-2 ring-teal-200/60 bg-teal-100 cursor-pointer">
            {#each locales as local}
                <option value={local}>{local.toUpperCase()}</option>
            {/each}
        </select>
        <ThemeToggler/>
    </div>
</header>