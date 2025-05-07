<script>
    let { children } = $props()
</script>

<div class="flex min-h-screen">
    <aside class="w-64 bg-teal-900/25">
        <nav>
            <ul class="flex flex-col gap-2 p-2">
                <li class="border text-center"><a href="/projects/pdfviewer">PDF Viewer</a></li>
                <li class="border text-center"><a href="/projects/writer">writer</a></li>
                <li class="border text-center"><a href="/projects/design">design</a></li>
            </ul>
        </nav>
    </aside>

    <main class="flex-1">
        {@render children()}
    </main>
</div>