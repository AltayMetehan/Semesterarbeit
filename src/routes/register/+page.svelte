<h1>Tonhelfer</h1>

<div class=register-container>
    <h2>Registrieren</h2>
    <form method="POST" action="?/register">
    <div class="mb-3 form-group">
        <label for="firstname">Vorname:</label>
        <input type="text" id="firstname" name="firstname" required />
    </div>
    <div class="mb-3 form-group">
        <label for="lastname">Nachname:</label>
        <input type="text" id="lastname" name="lastname" required />
    </div>
    <div class="mb-3 form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
    </div>
    <div class="mb-3 form-group">
        <label for="password">Passwort:</label>
        <input type="password" id="password" name="password" required />
    </div>
    <button type="submit">Registrieren</button>
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
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    h2 {
        text-align: center;
        margin-bottom: 2rem;
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
</style>