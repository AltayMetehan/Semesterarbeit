<script>
    import { onMount, tick } from 'svelte';
    import * as Tone from 'tone';
    import * as pdfjsLib from 'pdfjs-dist';

    let { notesheet } = $props();
    
    let canvas;
    let pdf = null;
    let synth;
    let lastClickNote = $state(null);
    let highlightX = -1;
    let highlightY = -1;
    let loading = $state(true);
    let error = $state(null);
    let staffLines = $state([]); // Y-Positionen der Notenlinen

    // Noten im Treble Clef (Violin Schlüssel) - von oben nach unten
    const trebleNoteNames = ['F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4', 'B3', 'A3', 'G3'];
    
    // Noten im Bass Clef - von oben nach unten
    const bassNoteNames = ['B3', 'A3', 'G3', 'F3', 'E3', 'D3', 'C3', 'B2', 'A2', 'G2', 'F2', 'E2', 'D2', 'C2'];

    onMount(async () => {
        try {
            // Initialize Tone.js
            await Tone.start();
            synth = new Tone.Synth({
                oscillator: { type: 'sine' },
                envelope: {
                    attack: 0.05,
                    decay: 0.1,
                    sustain: 0.3,
                    release: 0.5
                }
            }).toDestination();

            // Wait for Svelte to render canvas to DOM
            await tick();
            await new Promise(resolve => setTimeout(resolve, 300));
            
            if (!canvas) {
                throw new Error('Canvas element not found after tick()');
            }

            // Configure PDF.js worker
            const workerSrc = `/pdf.worker.min.mjs`;
            pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
            
            console.log('Loading PDF from:', `/uploads/${notesheet.filename}`);
            const pdfPath = `/uploads/${notesheet.filename}`;
            
            const pdfDoc = await pdfjsLib.getDocument({
                url: pdfPath,
                withCredentials: false
            }).promise;
            
            pdf = pdfDoc;
            console.log('PDF loaded successfully, pages:', pdf.numPages);
            
            // Render page
            await renderPage(1);
            loading = false;
        } catch (err) {
            console.error('Error loading PDF:', err);
            error = `Fehler beim Laden des PDF: ${err.message}`;
            loading = false;
        }
    });

    async function renderPage(pageNum) {
        if (!pdf || !canvas) {
            console.error('PDF or canvas not ready', { pdf: !!pdf, canvas: !!canvas });
            return;
        }

        try {
            console.log('Rendering page', pageNum);
            const page = await pdf.getPage(pageNum);
            const scale = 1.5;
            const viewport = page.getViewport({ scale });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const context = canvas.getContext('2d');
            if (!context) {
                throw new Error('Could not get 2D context');
            }

            const renderTask = page.render({
                canvasContext: context,
                viewport: viewport
            });

            await renderTask.promise;
            console.log('Page rendered successfully');
            
            // Detect staff lines after rendering
            detectStaffLines();
        } catch (err) {
            console.error('Error rendering page:', err);
            error = `Fehler beim Rendern: ${err.message}`;
        }
    }

    function detectStaffLines() {
        const context = canvas.getContext('2d');
        if (!context) return;

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        const lines = [];
        const threshold = 50; // Pixel dunkel genug für eine Linie
        
        // Scan every row for dark pixels (staff lines are black/very dark)
        for (let y = 0; y < canvas.height; y++) {
            let darkPixelCount = 0;
            
            // Count dark pixels in this row
            for (let x = 0; x < canvas.width; x++) {
                const idx = (y * canvas.width + x) * 4;
                const r = data[idx];
                const g = data[idx + 1];
                const b = data[idx + 2];
                
                // If pixel is dark (staff lines are black)
                if (r < threshold && g < threshold && b < threshold) {
                    darkPixelCount++;
                }
            }
            
            // If more than 70% of row is dark, it's likely a staff line
            if (darkPixelCount > canvas.width * 0.7) {
                // Only add if it's not too close to the previous line
                if (lines.length === 0 || y - lines[lines.length - 1] > 5) {
                    lines.push(y);
                }
            }
        }
        
        staffLines = lines;
        console.log('Detected staff lines at Y positions:', lines);
    }

    function getNoteFromPosition(y) {
        if (staffLines.length === 0) {
            console.warn('No staff lines detected');
            return null;
        }

        // Find the staff system (group of 5 lines) containing this Y position
        // Staff systems are typically 5 lines with spacing
        let closestSystem = -1;
        let minDist = Infinity;

        // Find closest staff line
        let closestLineIdx = 0;
        for (let i = 0; i < staffLines.length; i++) {
            const dist = Math.abs(staffLines[i] - y);
            if (dist < minDist) {
                minDist = dist;
                closestLineIdx = i;
            }
        }

        // Determine position relative to staff line
        // In music notation: line, space, line, space, line, space, line, space, line
        // Each staff has 5 lines (indexes 0, 1, 2, 3, 4)
        const staffSystem = Math.floor(closestLineIdx / 5);
        const positionInStaff = closestLineIdx % 5;
        
        // Calculate which note based on position
        const lineSpacing = staffLines.length > 5 ? staffLines[1] - staffLines[0] : 10;
        const positionY = y - staffLines[closestLineIdx];
        
        // Determine if on line or in space
        const onLine = Math.abs(positionY) < lineSpacing / 3;
        const offset = Math.round(positionY / (lineSpacing / 2));
        
        console.log('Staff system:', staffSystem, 'Position in staff:', positionInStaff, 'On line:', onLine, 'Offset:', offset);
        
        // Use treble clef by default (first staff system)
        const noteNames = staffSystem === 0 ? trebleNoteNames : bassNoteNames;
        
        // Calculate note index: lines and spaces alternate
        // Line 4 (bottom) = note 0, space = note 1, line 3 = note 2, etc.
        let noteIndex = (4 - positionInStaff) * 2;
        
        if (offset < 0) {
            noteIndex -= Math.abs(offset);
        } else if (offset > 0) {
            noteIndex += offset;
        }
        
        noteIndex = Math.max(0, Math.min(noteIndex, noteNames.length - 1));
        
        return noteNames[noteIndex];
    }

    function detectNoteFromClick(event) {
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Get note from position using staff line detection
        const note = getNoteFromPosition(y);
        
        if (note && synth) {
            synth.triggerAttackRelease(note, '0.5');
            lastClickNote = note;
            highlightX = x;
            highlightY = y;
            console.log('Played note:', note);
        }
    }

    function clickCanvas(event) {
        detectNoteFromClick(event);
    }
</script>

<div class="piano-container">
    <canvas
        bind:this={canvas}
        onclick={clickCanvas}
        width="800"
        height="1000"
        style="cursor: crosshair; border: 1px solid #ccc; border-radius: 8px; display: block; margin: 0 auto; max-width: 100%; width: 100%; height: auto;"
    ></canvas>

    {#if loading}
        <div class="loading-overlay">
            <div class="loading">PDF wird geladen...</div>
        </div>
    {/if}
    
    {#if error}
        <div class="error-overlay">
            <div class="error">
                <strong>Fehler:</strong> {error}
                <br />
                <small>Nutze den Download-Link um die Datei manuell zu öffnen</small>
            </div>
            {#if notesheet}
                <div style="margin-top: 1rem;">
                    <a href={`/uploads/${notesheet.filename}`} download class="fallback-link">
                        📥 Datei herunterladen: {notesheet.originalName}
                    </a>
                </div>
            {/if}
        </div>
    {/if}
    
    {#if lastClickNote}
        <div class="note-display">
            Gespielte Note: <strong>{lastClickNote}</strong>
        </div>
    {/if}
</div>

<style>
    .piano-container {
        margin-top: 1.5rem;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 1rem;
        background: #f9fafb;
        position: relative;
    }

    .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        z-index: 10;
    }

    .error-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 8px;
        z-index: 10;
        padding: 2rem;
    }

    .loading {
        text-align: center;
        padding: 2rem;
        color: #6b7280;
        font-size: 1rem;
    }

    .error {
        padding: 1rem;
        background: #fee2e2;
        border: 1px solid #fca5a5;
        border-radius: 4px;
        color: #991b1b;
        margin-bottom: 1rem;
    }

    canvas {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        height: auto;
    }

    .note-display {
        margin-top: 1rem;
        padding: 0.75rem;
        background: #dbeafe;
        border-left: 4px solid #2563eb;
        border-radius: 4px;
        font-size: 1rem;
    }

    .fallback-link {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        background: #3b82f6;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: background 0.2s;
    }

    .fallback-link:hover {
        background: #2563eb;
    }
</style>
