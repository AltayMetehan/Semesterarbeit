<script>
    let { notesheet } = $props();
</script>

<div class="notesheet-card">
    <div class="notesheet-meta">
        <span class="notesheet-date">Aufgemacht {notesheet.createdAt}</span>
    </div>
    <div class="notesheet-content">
        <a class="notesheet-title" href="/notesheets/{notesheet._id}">{notesheet.songname}</a>
        <p class="notesheet-writer">{notesheet.songwriter}</p>
    </div>
    <div class="notesheet-action" aria-hidden="true">›</div>
</div>

<style>
    .notesheet-card {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 0.75rem;
        align-items: center;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 1rem 1.25rem;
        box-shadow: 0 1px 4px rgba(15, 23, 42, 0.05);
        transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        margin-bottom: 1rem;
    }

    .notesheet-card:hover {
        transform: translateY(-1px);
        border-color: #cbd5e1;
        box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
    }

    .notesheet-meta {
        font-size: 0.85rem;
        color: #6b7280;
        margin-bottom: 0.25rem;
    }

    .notesheet-title {
        display: block;
        font-size: 1.05rem;
        font-weight: 700;
        color: #111827;
        text-decoration: none;
        margin-bottom: 0.25rem;
    }

    .notesheet-title:hover {
        color: #2563eb;
        text-decoration: underline;
    }

    .notesheet-writer {
        margin: 0;
        font-size: 0.95rem;
        color: #374151;
    }

    .notesheet-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        font-size: 1.5rem;
        color: #9ca3af;
    }

    @media (max-width: 640px) {
        .notesheet-card {
            grid-template-columns: 1fr;
            padding: 1rem;
        }

        .notesheet-action {
            justify-self: end;
        }
    }
</style>