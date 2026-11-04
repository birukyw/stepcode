const fs = require('fs');
const path = require('path');

const pyPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'pythonTrack.js');
let content = fs.readFileSync(pyPath, 'utf8');

// Line 22: Output comment
content = content.replace('# Output: Mana: 75/100 (75.0%)', '# Output: Tasks: 75/100 (75.0%)');

// Line 33: variable name
content = content
  .replace('spell = \\"   clean input data   \\"', 'sample_text = \\"   clean input data   \\"')
  .replace('print(\\"Cleaned:\\", spell.strip().upper())', 'print(\\"Cleaned:\\", sample_text.strip().upper())')
  .replace('print(\\"Replaced:\\", spell.replace(\\"fire\\", \\"lightning\\").strip())', 'print(\\"Replaced:\\", sample_text.replace(\\"input\\", \\"output\\").strip())');

// Line 100: comparison logic
const old100 = `can_challenge_dungeon = player_level >= 20\\n\\n# Logical Operators: and, or, not\\n# Python evaluates logical operators with short-circuiting!\\ncan_enter_boss_room = player_level >= 20 and has_boss_key\\nneeds_cure = is_poisoned or player_level < 5\\nis_healthy = not is_poisoned\\n\\nprint(\\"Can challenge dungeon:\\", can_challenge_dungeon)\\nprint(\\"Can enter boss room:\\", can_enter_boss_room)\\nprint(\\"Needs cure potion:\\", needs_cure)\\nprint(\\"Is healthy:\\", is_healthy)`;
const new100 = `is_adult = user_age >= 18\\n\\n# Logical Operators: and, or, not\\n# Python evaluates logical operators with short-circuiting!\\ncan_access_admin = user_age >= 18 and has_api_key\\nneeds_review = is_admin or user_age < 18\\nis_active = not is_admin\\n\\nprint(\\"Is adult:\\", is_adult)\\nprint(\\"Can access admin:\\", can_access_admin)\\nprint(\\"Needs review:\\", needs_review)\\nprint(\\"Is active:\\", is_active)`;
content = content.replace(old100, new100);

// Line 193: for-else search diagram
content = content
  .replace('for target in dungeon_creatures:', 'for record in user_records:')
  .replace('if target.is_boss():', 'if record.is_flagged():')
  .replace('print(\\"Boss encountered! Engaging combat...\\")', 'print(\\"Flagged item detected!\\")')
  .replace('print(\\"Dungeon cleared: No boss detected in sector.\\")', 'print(\\"Scan complete: No flagged items found.\\")');

// Line 198: enumerate starter code
const old198 = `# enumerate() provides index alongside element\\nspells = [\\"Fireball\\", \\"Frost Nova\\", \\"Thunderclap\\"]\\nfor idx, spell in enumerate(spells, start=1):\\n    print(f\\"Slot {idx}: {spell}\\")\\n\\n# zip() iterates multiple collections in parallel\\nheroes = [\\"Astra\\", \\"Vex\\", \\"Kaelen\\"]\\nlevels = [14, 22, 18]\\nfor hero, lvl in zip(heroes, levels):\\n    print(f\\"Hero {hero} is Level {lvl}\\")\\n`;
const new198 = `# enumerate() provides index alongside element\\nlanguages = [\\"Python\\", \\"TypeScript\\", \\"Go\\"]\\nfor idx, lang in enumerate(languages, start=1):\\n    print(f\\"Rank {idx}: {lang}\\")\\n\\n# zip() iterates multiple collections in parallel\\nusers = [\\"Alice\\", \\"Bob\\", \\"Charlie\\"]\\nscores = [94, 88, 92]\\nfor user, score in zip(users, scores):\\n    print(f\\"User {user} has score {score}\\")\\n`;
content = content.replace(old198, new198);

// Line 204: generator infinite
content = content
  .replace('def infinite_mana():\\n    mana = 10\\n    while True:\\n        yield mana\\n        mana += 10', 'def infinite_counter():\\n    counter = 10\\n    while True:\\n        yield counter\\n        counter += 10')
  .replace('for xp in data_batch_stream(100, 3):\\n    print(\\"Awarded XP:\\", xp)', 'for batch in data_batch_stream(100, 3):\\n    print(\\"Batch size:\\", batch)');

fs.writeFileSync(pyPath, content, 'utf8');
console.log('Final 5 pythonTrack cleanups done!');
