<script>
    let file = null;
    let writer = '';
    let message = '';
    let messageType = '';
    let loading = false;
    let uploadedFileName = '';
    let uploadedWriter = '';

    function handleFileChange(event) {
        file = event.target.files[0] ?? null;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        message = '';
        messageType = '';

        if (!file) {
            message = 'Bitte wähle ein Notenblatt aus.';
            messageType = 'error';
            return;
        }

        if (!writer.trim()) {
            message = 'Bitte gib den Songtext-Schreiber ein.';
            messageType = 'error';
            return;
        }

        loading = true;

        try {
            const form = new FormData();
            form.append('file', file);
            form.append('writer', writer.trim());

            const res = await fetch('/upload', {
                method: 'POST',
                body: form
            });

            loading = false;

            if (res.ok) {
                const data = await res.json();
                uploadedFileName = data.body.originalName || file.name;
                uploadedWriter = data.body.writer;
                message = 'Notenblatt erfolgreich hochgeladen.';
                messageType = 'success';
                file = null;
                writer = '';
                event.target.reset();
            } else {
                let data;
                try {
                    data = await res.json();
                } catch (e) {
                    data = null;
                }
                message = (data && data.message) ? data.message : 'Upload fehlgeschlagen.';
                messageType = 'error';
            }
        } catch (err) {
            loading = false;
            message = 'Netzwerkfehler beim Upload.';
            messageType = 'error';
        }
    }
</script>

<div class="upload-container">
    <h1>Tonhelfer</h1>
    <h2>Notenblatt hochladen</h2>

    {#if message}
        <p class={messageType === 'success' ? 'message success' : 'message error'}>{message}</p>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <label for="file">Notenblatt als Dokument</label>
            <input
                type="file"
                id="file"
                name="file"
                accept=".pdf,.doc,.docx,.xml,.musicxml,.txt"
                on:change={handleFileChange}
                required
            />
        </div>

        <div class="form-group">
            <label for="writer">Songtext Schreiber</label>
            <input
                type="text"
                id="writer"
                name="writer"
                bind:value={writer}
                required
                placeholder="Name des Songtext-Schreibers"
            />
        </div>

        <button type="submit" disabled={loading}>
            {loading ? 'Hochladen...' : 'Hochladen'}
        </button>
    </form>

    {#if uploadedFileName}
        <div class="result-card">
            <h2>Hochgeladene Datei</h2>
            <p><strong>Datei:</strong> {uploadedFileName}</p>
            <p><strong>Songtext Schreiber:</strong> {uploadedWriter}</p>
        </div>
    {/if}
</div>

<style>
    .upload-container {
        max-width: 500px;
        margin: 2rem auto;
        padding: 2rem;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        background: white;
    }

    h1 {
        text-align: center;
        margin-bottom: 1.75rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }

    input[type=text],
    input[type=file] {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
        box-sizing: border-box;
    }

    input[type=file] {
        padding: 0.4rem 0.75rem;
    }

    button {
        width: 100%;
        padding: 0.85rem;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    button:hover:not(:disabled) {
        background: #1d4ed8;
    }

    button:disabled {
        background: #94a3b8;
        cursor: not-allowed;
    }

    .message {
        margin-bottom: 1rem;
        padding: 0.85rem 1rem;
        border-radius: 8px;
    }

    .message.success {
        background: #ecfdf5;
        color: #166534;
        border: 1px solid #a7f3d0;
    }

    .message.error {
        background: #fef2f2;
        color: #991b1b;
        border: 1px solid #fecaca;
    }

    .result-card {
        margin-top: 1.5rem;
        padding: 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background: #f8fafc;
    }

    .result-card h2 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        font-size: 1.1rem;
    }
</style>
