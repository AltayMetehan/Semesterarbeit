<script>
    let { form } = $props();
</script>

<h1>Tonhelfer</h1>
<h2>Registrieren</h2>

<form method="POST" action="?/register">
    <div class="mb-3">
        <label for="firstname">Vorname:</label>
        <input type="text" id="firstname" name="firstname" required />
    </div>
    <div class="mb-3">
        <label for="lastname">Nachname:</label>
        <input type="text" id="lastname" name="lastname" required />
    </div>
    <div class="mb-3">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
    </div>
    <div class="mb-3">
        <label for="password">Passwort:</label>
        <input type="password" id="password" name="password" required />
    </div>
    <button type="submit" class="btn btn-primary">Registrieren</button>
    <p>Bereits registriert? <a href="/login">Hier anmelden</a></p>
</form>

{#if form?.success}
    <div class="alert alert-success" role="alert">
        Registrierung erfolgreich!
    </div>
{/if}