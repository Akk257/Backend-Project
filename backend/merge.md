1. Zum Ziel-Branch wechseln

Bevor du einen Branch mergen kannst, musst du in den Branch wechseln, in den du die Änderungen übernehmen möchtest.

git checkout main  # oder `git switch main`

2. Merge durchführen

Nun kannst du den Branch, den du einfügen willst (z. B. feature-branch), mit main zusammenführen:

git merge feature-branch

3. Merge-Typen

Es gibt verschiedene Arten von Merges:

    Fast-Forward Merge: Wenn main keine neuen Commits hat, wird einfach der Pointer verschoben.
    Recursive Merge (Standard): Falls main neue Commits hat, wird ein Merge-Commit erstellt.

Falls es zu Konflikten kommt, zeigt Git betroffene Dateien als "conflicted" an. Dann musst du sie manuell bearbeiten und mit:

git add <konflikt-datei>
git commit

abschließen.
4. Merge prüfen

Nach dem Merge kannst du mit

git log --oneline --graph --decorate --all

die Historie überprüfen.