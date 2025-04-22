<script lang="ts">
    let data:{userId: number; id: number; title:string; completed:boolean}[] = []

    async function getTodos(){
        const reponse = await fetch(`https://jsonplaceholder.typicode.com/todos/`)
        data = await reponse.json()
    }

    getTodos()
    
</script>

<div class="min-h-screen bg-blue-200">
    <pre>{JSON.stringify(data, null, 2)}</pre>

</div>