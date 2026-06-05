# Projektdokumentation - Tonhelfer

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

<!-- Diese Vorlage ist für eine README.md im Repository gedacht. Abschnitte mit [Optional] können weggelassen werden, wenn in den Übungen nichts anderes verlangt wird. -->

## 1. Ausgangslage
Hier wird Kurz beschrieben, welches Problem adressiert wird und welches Ergebnis angestrebt ist. Wem nützt die Lösung, wer ist beteiligt oder betroffen?
- **Problem:** Wer ein Notenblatt vor sich hat, aber nicht weiss, wie die notierten Töne klingen sollen, steht vor einer grossen Hürde – besonders beim eigenständigen Üben zu Hause. Ohne einen Chorleiter oder ein Instrument ist es für viele Menschen schlicht nicht möglich, sich den richtigen Ton vorzustellen. Ein typisches Beispiel: Jemand möchte ein neues Chorstück zu Hause einüben, sieht die Noten auf dem Papier, weiss aber nicht, ob der Ton hoch oder tief ist. Genau hier setzt dieses Projekt an: Es gibt den gesuchten Ton direkt aus, sodass jede Person selbstständig und ohne fremde Hilfe üben kann.
- **Ziele:** Die Applikation gibt auf Anfrage den korrekten Ton einer ausgewählten Note akustisch aus, sodass Nutzende wissen, wie dieser klingen soll. Singende Personen können dadurch ohne Chorleiter oder Instrument eigenständig und ortsunabhängig üben. Die Anwendung ist einfach und intuitiv bedienbar, damit auch Personen ohne musiktheoretische Vorkenntnisse damit umgehen können. Sie steht einer breiten Nutzergruppe zur Verfügung – von Choreinsteigern bis hin zu fortgeschrittenen Laien – und hilft, Intonationsfehler beim Üben zu reduzieren.
- **Primäre Zielgruppe:** **Chormitglieder ohne Notenkenntnisse**, die neue Stücke zu Hause vorbereiten möchten, aber keinen Chorleiter zur Hand haben. **Gesangsanfänger**, die zum Üben auf ein Instrument oder eine Begleitperson angewiesen wären, dies aber nicht immer organisieren können.
- **Weitere Stakeholder:** **Hobbysingende**, die eigenständig und ortsunabhängig üben möchten, profitieren direkt von der Lösung. **Kinder und Jugendliche** können Noten spielerisch erlernen. **Chorleiter und Dirigenten** können das Tool ihren Mitgliedern als Übungshilfe empfehlen und so die Probenqualität steigern. **Musikschulen und Chörvereine** können die Applikation institutionell einsetzen oder weiterempfehlen. 


## 2. Lösungsidee
Die Applikation ermöglicht es Nutzenden, Notenblätter hochzuladen, in einer Liste auszuwählen und anzuzeigen. Zu jeder Note kann der entsprechende Ton abgespielt werden, damit Nutzende selbstständig und ohne externe Hilfe üben können. Optional lässt sich das Lied über YouTube abspielen, falls die Melodie unbekannt ist.
- **Kernfunktionalität:** (1) Notenblatt hochladen → (2) aus Liste auswählen → (3) Notenblatt anzeigen → (4) Ton abspielen → (5) optional: Lied auf YouTube anhören 
- **Annahmen:** Es wird angenommen, dass das blosse Hören eines Tons ausreicht, damit Nutzende die Note korrekt singen können. Zudem wird vorausgesetzt, dass ein YouTube-Zugang vorhanden ist. Geprüft wird: Verbessert das Abspielen von Tönen die Intonationsfähigkeit der Nutzenden messbar?
- **Abgrenzung:** Eine automatische Überprüfung der Gesangsleistung gehört explizit nicht zum Umfang des Projekts. Der Fokus liegt auf spielerischem Lernen – Nutzende sollen durch Ausprobieren lernen, nicht durch Bewertungen.

## 3. Vorgehen & Artefakte
Die Durchführung erfolgt phasenbasiert; dokumentieren Sie die wichtigsten Ergebnisse je Phase.

### 3.1 Understand & Define
- **Zielgruppenverständnis:** _[Problemraumanalyse, Recherche, (Proto-)Personas]_
- **Wesentliche Erkenntnisse:** _[Stichpunkte]_

### 3.2 Sketch
- **Variantenüberblick:** _[kurz]_
- **Skizzen:** _[Mehrere Varianten; Unterschiede kurz dokumentieren.]_

### 3.3 Decide
- **Gewählte Variante & Begründung:** _[Entscheidkriterien nennen]_  
- **End-to-End-Ablauf:** _[Beschreibung inkl. User Journey Map]_  
- **Mockup:** _[URL, z. B. Figma; Screenshots mit kurzen Beschreibungen]_  

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
Beschreibt die Gestaltung und Interaktion.
> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.
- **Informationsarchitektur:** _[z. B. Seiten/Navigation: Konzept, nicht die technische Umsetzung]_
- **User Interface Design:** _[wichtige Screens: Screenshots mit kurzen Erläuterungen]_  
- **Designentscheidungen:** _[zentrale Entscheidungen und Begründungen]_

#### 3.4.2. Umsetzung (Technik)
Fasst die technische Realisierung zusammen.
- **Technologie-Stack:** _[SvelteKit, Bibliotheken falls genutzt]_
- **Tooling:** _[IDE/Erweiterungen, lokale/Cloud-Tools; den Einsatz von KI beschreiben Sie im Kapitel **KI-Deklaration**]_  
- **Struktur & Komponenten:** _[Seiten, Routen, State/Stores, wichtige Komponenten]_
- **Daten & Schnittstellen:** _[Wie werden Daten gespeichert, verwaltet, abgerufen?]_
- **Deployment:** _[URL]_  
- **Besondere Entscheidungen:** _[z. B. Trade-offs, Vereinfachungen]_  

### 3.5 Validate
- **URL der getesteten Version** (separat deployt)
- **Ziele der Prüfung:** _[welche Fragen sollen beantwortet werden?]_  
- **Vorgehen:** _[moderiert/unmoderiert; remote/on-site]_  
- **Stichprobe:** _[Mit wem wurde getestet? Profil; Anzahl]_  
- **Aufgaben/Szenarien:** _[Ausformulierte Testaufgaben]_  
- **Kennzahlen & Beobachtungen:** _[z. B. Erfolgsquote, Zeitbedarf, qualitative Findings]_  
- **Zusammenfassung der Resultate:** _[Wichtigste Erkenntnisse; 2-4 Sätze]_  
- **Abgeleitete Verbesserungen:** _[Anforderungen, die als nächstes umgesetzt werden sollten, priorisiert, kurz begründet; falls Verbesserungen im Prototyp konkret umgesetzt wurden: In Kap. 4 dokumentieren]_  

## 4. Erweiterungen [Optional]
Dokumentiert Erweiterungen über den Mindestumfang hinaus.
> **Hinweis:** Jede Erweiterung ist separat nach dem folgenden Schema zu beschreiben.

### _[4.x Kurzbeschreibung / Titel]_  
- **Beschreibung & Nutzen:** _[Was wurde erweitert? Warum?]_  
- **Wo umgesetzt:** _[Wie und wo wurde es gemacht? Frontend, Backend, Datenbank?]_  
- **Referenz:** _[Wo wird die Erweiterung auch noch beschrieben, z.B. Screenshot oder Beschreibung in einem anderen Kapitel]_  
- **Aus Evaluation abgeleitet?:** _[Wurde diese Erweiterung als Folge eines in der Evaluation identifizierten Issues implementiert?]_  

> Das folgende **Beispiel** wurde bewusst kurz gehalten. Erweiterungen dürfen auch ausführlicher beschrieben werden.

### 4.1 Tabelle nach Kategorien filtern
- **Beschreibung & Nutzen:** Tabelle X kann nach Kategorie gefiltert werden, weil User typischerweise nur an einer bestimmten Kategorie interessiert sind.  
- **Wo umgesetzt:** 
  - **Frontend:** Tabelle mit Dropdown in Datei ...
  - **Backend:** Form Action ... in Datei ...
  - **Datenbank:** MongoDB-Query in Datei ...
- **Referenz:** Screenshot in Kap. x.y
- **Aus Evaluation abgeleitet?:** Ja, Issue x.y

## 5. Projektorganisation [Optional]
Beispiele:
- **Repository & Struktur:** _[Link; kurze Strukturübersicht]_  
- **Issue-Management:** _[Vorgehen kurz beschreiben]_  
- **Commit-Praxis:** _[z. B. sprechende Commits]_

## 6. KI-Deklaration
Die folgende Deklaration ist verpflichtend und beschreibt den Einsatz von KI im Projekt.

### 6.1 KI-Tools
- **Eingesetzte Tools**: _[z. B. Copilot, ChatGPT, Claude, lokale Modelle; Version/Variante wenn bekannt]_
- **Zweck & Umfang**: _[wie, wofür und in welchem Ausmass wurde KI eingesetzt (z. B. Textentwürfe, Codevorschläge, Tests, Refactoring); welche Teile stammen (ganz/teilweise) aus KI-Unterstützung?]_
- **Eigene Leistung (Abgrenzung):** _[was ist eigenständig erarbeitet/überarbeitet worden?]_

### 6.2 Prompt-Vorgehen
_[Überlegungen zu Prompt-Vorgehen, Qualität und Urheberrecht/Quellen. Wie wurde beim Prompting vorgegangen? Zu beschreiben ist die grundlegende Vorgehensweise. Einzelne, konkrete Prompts sollten höchstens als Beispiele aufgeführt werden. ]_

### 6.3 Reflexion
_[Nutzen, Grenzen, Risiken/Qualitätssicherung, ...]_

## 7. Anhang [Optional]
Beispiele:
- **Quellen:** _[verwendete Vorlagen/Assets/Modelle; Lizenz/Urheberrecht; ...]_
- **Testskript & Materialien:** _[Link/Datei]_  
- **Rohdaten/Auswertung:** _[Link/Datei]_  

