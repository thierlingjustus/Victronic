# Feature-Pipeline: Kurzanleitung

Vier spezialisierte Agenten für Feature-Arbeit an dieser Website, angelehnt an ein Planner → Coder → Tester → Reviewer-Muster. Läuft nur in **Claude Code** (dem CLI-Tool), nicht in Cowork — dafür ist die Website hier aber genau die Art Projekt (echtes Git-Repo, React/TS-Codebase), für die sich das Muster lohnt.

## Aufruf

In Claude Code, im Ordner `victronic-gmbh/`:

```
/feature Rate-Limiting fürs Kontaktformular ergänzen
```

Das startet automatisch:

1. **planner** (Opus) — baut aus der Anfrage eine präzise Spec → `.pipeline/specs.md`
2. **coder** (Sonnet) — setzt die Spec um → `.pipeline/changes.md`
3. **tester** (Sonnet) — Typecheck, Build, manuelle Edge-Case-Prüfung → `.pipeline/tests.md`
4. **reviewer** (Sonnet, read-only) — vergleicht Diff/Spec/Tests, gibt Urteil → `.pipeline/review.md`

Am Ende bekommst du eine Zusammenfassung mit SHIP/NO-SHIP-Verdict.

## Was die Pipeline NICHT macht

- Sie committet nicht. Sie pusht nicht. Der `reviewer`-Agent kann nicht mal Dateien bearbeiten.
- Sie ist nicht "über Nacht laufen lassen und morgens ist main aktualisiert". Jeder Lauf endet mit unstaged Changes, die du selbst per `git diff` gegenliest und dann committest. Das ist Absicht, kein Bug — gerade weil dieses Repo direkt auf `main` arbeitet (kein Standard-PR-Workflow), sollte zwischen Agent-Output und `main` immer ein Mensch stehen.
- Sie ersetzt keine echte Testsuite. Das Projekt hat aktuell keinen Testrunner (siehe `CLAUDE.md`) — der `tester`-Agent macht Typecheck + Build + strukturierte manuelle Prüfung, keine automatisierten Unit-Tests.

## Wann sich der volle Durchlauf lohnt

Für ein neues Produkt/System im Datenarray, eine neue Sektion auf einer Seite, eine neue Komponente: ja, die vier Schritte lohnen sich, weil die Spec-Phase verhindert, dass das Feature in eine falsche Richtung gebaut wird.

Für Ein-Zeiler (Text ändern, Farbe anpassen, Tippfehler): nicht die Pipeline nutzen, das ist Overhead ohne Nutzen. Einfach direkt mit Claude Code arbeiten.

## Empfehlung: Feature-Branch

Das Repo committet laut `CLAUDE.md` normalerweise direkt auf `main`. Für Pipeline-Läufe empfiehlt sich trotzdem ein kurzlebiger Branch (`git checkout -b feature/<slug>`), weil hier mehrere Agenten hintereinander an denselben Dateien arbeiten — der Command fragt beim Start danach, erzwingt es aber nicht.

## Dateien in diesem Setup

```
.claude/agents/planner.md
.claude/agents/coder.md
.claude/agents/tester.md
.claude/agents/reviewer.md
.claude/commands/feature.md
.pipeline/README.md
.pipeline/specs.md      (Platzhalter, wird bei jedem Lauf überschrieben)
.pipeline/changes.md    (Platzhalter, wird bei jedem Lauf überschrieben)
.pipeline/tests.md      (Platzhalter, wird bei jedem Lauf überschrieben)
.pipeline/review.md     (Platzhalter, wird bei jedem Lauf überschrieben)
```

## Modelle anpassen

Falls sich Kosten/Qualität-Abwägung ändern soll: `model:` im Frontmatter der jeweiligen `.claude/agents/*.md`-Datei anpassen. Aktuell: Opus für den Planner (Spec-Qualität ist der Flaschenhals der ganzen Pipeline), Sonnet für Coder/Tester/Reviewer.
