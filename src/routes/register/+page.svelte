<script>
    import { goto } from '$app/navigation';

    let firstname = '';
    let lastname = '';
    let email = '';
    let password = '';
    let message = '';
    let messageType = '';
    let loading = false;

    function validateEmail(value) {
        return /^\S+@\S+\.\S+$/.test(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        message = '';
        messageType = '';
        loading = true;

        if (!firstname || !lastname || !email || !password) {
            message = 'Alle Felder sind erforderlich.';
            messageType = 'error';
            loading = false;
            return;
        }

        if (!validateEmail(email)) {
            message = 'Bitte gib eine gültige E-Mail-Adresse ein.';
            messageType = 'error';
            loading = false;
            return;
        }

        if (password.length < 6) {
            message = 'Passwort muss mindestens 6 Zeichen lang sein.';
            messageType = 'error';
            loading = false;
            return;
        }

        try {
            const body = new URLSearchParams();
            body.append('firstname', firstname);
            body.append('lastname', lastname);
            body.append('email', email);
            body.append('password', password);

            const res = await fetch('/register', {
                method: 'POST',
                body
            });

            loading = false;

            if (res.ok) {
                message = 'Registrierung erfolgreich. Weiterleitung zum Login...';
                messageType = 'success';
                firstname = '';
                lastname = '';
                email = '';
                password = '';

                setTimeout(() => {
                    goto('/login');
                }, 1200);
            } else {
                let data;
                try {
                    data = await res.json();
                } catch (e) {
                    data = null;
                }
                message = (data && data.message) ? data.message : 'Registrierung fehlgeschlagen.';
                messageType = 'error';
            }
        } catch (err) {
            loading = false;
            message = 'Netzwerkfehler bei der Registrierung.';
            messageType = 'error';
        }
    }
</script>

<div class="register-container">
    <h1>Tonhelfer</h1>
    <h2>Registrieren</h2>

    {#if message}
        <p class={messageType === 'success' ? 'message success' : 'message error'}>{message}</p>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <label for="firstname">Vorname:</label>
            <input id="firstname" type="text" bind:value={firstname} required />
        </div>

        <div class="form-group">
            <label for="lastname">Nachname:</label>
            <input id="lastname" type="text" bind:value={lastname} required />
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input id="email" type="email" bind:value={email} required />
        </div>

        <div class="form-group">
            <label for="password">Passwort:</label>
            <input id="password" type="password" bind:value={password} required />
        </div>

        <div class="hint">
            <p><strong>Wichtige Hinweise:</strong></p>
            <ul>
                <li>Verwende deine echte E-Mail-Adresse.</li>
                <li>Das Passwort muss mindestens 6 Zeichen lang sein.</li>
                <li>Vorname und Nachname bitte korrekt eingeben.</li>
            </ul>
        </div>

        <button type="submit" disabled={loading}>
            {loading ? 'Registrierung läuft...' : 'Registrieren'}
        </button>
        <p>Bereits registriert? <a href="/login">Hier anmelden</a></p>
    </form>
</div>

<style>
    .register-container {
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h1, h2 {
        text-align: center;
        margin-bottom: 1.5rem;
    }

    .message {
        margin-bottom: 1rem;
        padding: 0.75rem 1rem;
        border-radius: 4px;
    }

    .message.success {
        background: #e6ffed;
        color: #166534;
        border: 1px solid #a7f3d0;
    }

    .message.error {
        background: #fee2e2;
        color: #991b1b;
        border: 1px solid #fca5a5;
    }

    .form-group {
        margin-bottom: 1.25rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: #4CAF50;
        box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
    }

    button {
        width: 100%;
        padding: 0.75rem;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover:not(:disabled) {
        background-color: #45a049;
    }

    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }

    p {
        margin-top: 1rem;
        text-align: center;
    }

    a {
        color: #4CAF50;
        text-decoration: none;
    }

    .hint {
        margin-bottom: 1.5rem;
        padding: 0.9rem 1rem;
        background: #f5faff;
        border: 1px solid #cfe8ff;
        border-radius: 6px;
        color: #1e3a8a;
        font-size: 0.95rem;
    }

    .hint p {
        margin: 0 0 0.5rem;
        font-weight: 600;
    }

    .hint ul {
        margin: 0;
        padding-left: 1.25rem;
    }

    .hint li {
        margin-bottom: 0.35rem;
    }
</style>
