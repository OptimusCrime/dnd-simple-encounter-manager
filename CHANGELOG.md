v2.1.0-pl                      2025-01-24
=========================================

- [Feature] Timer for the whole encounter (in addition to active turn).
- [Feature] Make it possible to clone a monster before starting encounter (reuses dynamic health formula if provided).
- [Improvement] Re-arranged the sections for notes and conditions/effects to stand out more.
- [Improvement] Dropdown for conditions takes more horizontal space for improved usability.
- [Improvement] Unified how name and turn number is formatted, so that it looks the same everywhere.
- [Fix] Footer should be positioned correctly now (hopefully).

v2.0.0-pl                      2024-10-09
=========================================

- [Feature] Turn timer to keep track of slow players.
- [Feature] Possibility to add notes to monsters when you create them.
- [Feature] Log that displays health changes.
- [Feature] Possibility to change temporary effect anchor entity.
- [Feature] Selected character set will now be remembered.
- [Removed] Surprised is taken out, because it was never used.
- [Removed] Buttons for decreasing and increase 1, 5, and 10 HP.
- [Removed] Monsters with the same name will no longer have a number attached to it. Use the initiative order instead.
- [Fix] Correctly start encounter on round 1 instead of 0.
- [Fix] Some bugs related to character sets.
- [Improvement] Reorganized the main playing interface, and moved some stuff around.
- [Improvement] Include entity initiative number in various places instead of just name.
- [Improvement] Dropdown menus are prettier.
- [Improvement] Temporary effects has 60 prefilled as the default value, because it is almost always is the correct value.
- [Other] Added simple footer (which looks pretty weird if the page is too short).
