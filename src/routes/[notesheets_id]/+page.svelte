<script>
    import PianoNotePlayer from '$lib/components/PianoNotePlayer.svelte';
    
    export let data;
    let notesheet = data.notesheet;
</script>

<a href="/">Zurück zur Liste</a>

<h1>Tonhelfer</h1>
<h2>Notenblatt - {notesheet.songName}</h2>
<div class="row mt-3">
    <p class="click-notes">Klicke auf die Noten, um abzuspielen</p>

    <PianoNotePlayer notesheet={notesheet} />
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
</style>