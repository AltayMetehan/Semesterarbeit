<script>
    import { goto } from '$app/navigation';

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

        if (!email || !password) {
            message = 'Email und Passwort sind erforderlich.';
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
            body.append('email', email);
            body.append('password', password);

            const res = await fetch('/login', {
                method: 'POST',
                body
            });

            loading = false;

            if (res.ok) {
                message = 'Login erfolgreich.';
                messageType = 'success';
                email = '';
                password = '';
                // redirect to home
                goto('/notesheets');
            } else {
                let data;
                try {
                    data = await res.json();
                } catch (e) {
                    data = null;
                }
                message = (data && data.message) ? data.message : 'Login fehlgeschlagen.';
                messageType = 'error';
            }
        } catch (err) {
            loading = false;
            message = 'Netzwerkfehler beim Login.';
            messageType = 'error';
        }
    }
</script>

<div class="login-container">
    <h1>Tonhelfer</h1>
    <h2>Login</h2>

    {#if message}
        <p class={messageType === 'success' ? 'message success' : 'message error'}>{message}</p>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <label for="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                bind:value={email}
                required
                placeholder="E-Mail eingeben"
            />
        </div>

        <div class="form-group">
            <label for="password">Passwort</label>
            <input
                type="password"
                id="password"
                name="password"
                bind:value={password}
                required
                placeholder="Passwort eingeben"
            />
        </div>

        <button type="submit" disabled={loading}>
            {loading ? 'Login läuft...' : 'Login'}
        </button>
        <p>Noch nicht eingeloggt? <a href="/register">Hier registrieren</a></p>
    </form>
</div>

<style>
    .login-container {
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h1, h2 {
        text-align: center;
        margin-bottom: 2rem;
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
        margin-bottom: 1.5rem;
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
</style>
