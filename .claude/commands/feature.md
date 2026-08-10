---
description: Orchestriert die vierstufige Feature-Pipeline (planner → coder → tester → reviewer) für eine Feature-Anfrage. Aufruf z. B. /feature Rate-Limiting fürs Kontaktformular ergänzen
---

Feature-Anfrage von Justus: $ARGUMENTS

Du orchestrierst jetzt die Feature-Pipeline für diese Anfrage. Arbeite die Schritte strikt der Reihe nach ab und nutze für jeden Schritt den passenden Subagenten über das Task-Tool (nicht selbst implementieren). Jeder Agent liest/schreibt Dateien im `.pipeline/`-Ordner im Repo-Root.

## 0. Vorbereitung

1. Prüfe mit `git status`, ob das Arbeitsverzeichnis sauber ist. Falls es bereits uncommittete Änderungen gibt, die nicht zu diesem Feature gehören, weise Justus kurz darauf hin, bevor du weitermachst.
2. Empfehle explizit einen Feature-Branch für diesen Lauf (`git checkout -b feature/<kurzer-slug>`), falls aktuell auf `main` gearbeitet wird. Führe das Erstellen des Branches nicht eigenmächtig aus — frage kurz nach oder folge Justus' Antwort, falls er direkt auf main weiterarbeiten will. Das Repo committet standardmäßig direkt auf main (siehe CLAUDE.md), ein Branch ist bei Pipeline-Läufen aber sinnvoller, weil hier mehrere Agenten hintereinander Code anfassen.
3. Stelle sicher, dass `.pipeline/` existiert (specs.md, changes.md, tests.md, review.md). Falls nicht vorhanden, aus `.pipeline/README.md`-Templates anlegen.

## 1. Planner

Rufe den `planner`-Agenten mit der Feature-Anfrage auf. Warte, bis `.pipeline/specs.md` geschrieben wurde. Lies die Datei danach kurz gegen — falls unter "Offene Fragen" etwas steht, das nicht "Keine" ist, unterbrich die Pipeline und frage Justus, statt mit einer lückenhaften Spec weiterzumachen.

## 2. Coder

Rufe den `coder`-Agenten auf. Er liest `.pipeline/specs.md` selbst. Warte, bis `.pipeline/changes.md` geschrieben wurde.

## 3. Tester

Rufe den `tester`-Agenten auf. Er liest `.pipeline/specs.md` und `.pipeline/changes.md` selbst. Warte, bis `.pipeline/tests.md` geschrieben wurde.

## 4. Reviewer

Rufe den `reviewer`-Agenten auf. Er liest alle drei vorherigen Pipeline-Dateien selbst und macht einen eigenen `git diff`. Warte, bis `.pipeline/review.md` geschrieben wurde.

## 5. Abschluss

Fasse für Justus in 5-8 Zeilen zusammen:
- Verdict aus review.md (SHIP / NO-SHIP)
- Welche Dateien geändert wurden
- Ob es offene Punkte, Abweichungen von der Spec oder FAILs aus tests.md gibt
- Expliziter letzter Satz: "Committed/gepusht wurde nichts — bitte `git diff` selbst gegenlesen und dann manuell committen."

## Harte Regeln

- Kein Agent in dieser Pipeline committet oder pusht. Das bleibt immer ein manueller Schritt.
- Bei NO-SHIP-Verdict: nicht automatisch einen neuen Coder-Durchlauf starten. Erst Justus die kritischen Punkte zeigen und auf seine Entscheidung warten.
- Wenn ein Agent in seinem Schritt scheitert (z. B. Build bricht komplett), Pipeline stoppen und den Fehler zeigen statt den nächsten Agenten trotzdem zu starten.
