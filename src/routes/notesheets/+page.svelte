<script>
    import NotesheetList from "$lib/components/NotesheetList.svelte";

    let {data} = $props();
</script>

<h1>Tonhelfer</h1>
<h2>Notenblätter</h2>

<div class="row">
    {#each data.notesheets as notesheet}
        <div class="col-12">
            <NotesheetList notesheet={notesheet}>
            </NotesheetList>
        </div>
    {/each}
</div>