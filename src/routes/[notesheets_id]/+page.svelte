<script>
    export let data;
    let notesheet = data.notesheet;
</script>

<a href="/">Zurück zur Liste</a>

<h1>Tonhelfer</h1>
<h2>Notenblatt - {notesheet.songName}</h2>
<div class="row mt-3">
    <p class="click-notes">Klicke auf die Noten, um abzuspielen</p>

    <div class="notesheet-container">
        {#if notesheet.mimeType === 'application/pdf'}
            <embed src={`/uploads/${notesheet.filename}`} type="application/pdf" width="100%" height="600px" />
        {:else if notesheet.mimeType.startsWith('image/')}
            <img src={`/uploads/${notesheet.filename}`} alt={notesheet.songName} style="max-width: 100%; height: auto;" />
        {:else}
            <a href={`/uploads/${notesheet.filename}`} download>{notesheet.originalName}</a>
        {/if}
    </div>
</div>

<style>
    a {
        color: #2563eb;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    a:active {
        color: #1e40af;
    }

    .click-notes {
        font-size: 1.1rem;
        color: lightgray;
    }

    .notesheet-container {
        margin-top: 1.5rem;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 1rem;
        background: #f9fafb;
    }
</style>