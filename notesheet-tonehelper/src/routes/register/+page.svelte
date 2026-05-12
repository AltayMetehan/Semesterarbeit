<script>
    let firstname = "";
    let lastname = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let message = "";
    let messageType = "";
    let loading = false;

    function validateEmail(value) {
        return /^\S+@\S+\.\S+$/.test(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        message = "";
        messageType = "";
        loading = true;

        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            message = "Alle Felder sind erforderlich.";
            messageType = "error";
            loading = false;
            return;
        }

        if (!validateEmail(email)) {
            message = "Bitte gib eine gültige E-Mail-Adresse ein.";
            messageType = "error";
            loading = false;
            return;
        }

        if (password !== confirmPassword) {
            message = "Passwörter stimmen nicht überein.";
            messageType = "error";
            loading = false;
            return;
        }

        if (password.length < 6) {
            message = "Passwort muss mindestens 6 Zeichen lang sein.";
            messageType = "error";
            loading = false;
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        message = "Registrierung erfolgreich (Frontend-only).";
        messageType = "success";
        firstname = "";
        lastname = "";
        email = "";
        password = "";
        confirmPassword = "";
        loading = false;
    }
</script>

<div class="register-container">
    <h1>Tonhelfer</h1>
    <h2>Registrieren</h2>
    {#if message}
        <p class={messageType === "success" ? "message success" : "message error"}>{message}</p>
    {/if}
    
    <form on:submit={handleSubmit}>
        <div class="form-group">
            <label for="firstname">Vorname</label>
            <input 
                type="text" 
                id="firstname" 
                name="firstname" 
                bind:value={firstname}
                required
                placeholder="Vorname eingeben"
            />
        </div>
        
        <div class="form-group">
            <label for="lastname">Nachname</label>
            <input 
                type="text" 
                id="lastname" 
                name="lastname" 
                bind:value={lastname}
                required
                placeholder="Nachname eingeben"
            />
        </div>
        
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
        
        <div class="form-group">
            <label for="confirmPassword">Passwort wiederholen</label>
            <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                bind:value={confirmPassword}
                required
                placeholder="Passwort wiederholen"
            />
        </div>
        
        <button type="submit" disabled={loading}>
            {loading ? "Registrierung läuft..." : "Registrieren"}
        </button>
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
