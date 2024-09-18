export type beatmap = {
  "approved"?: -1 | 0 | 1 | 2 | 3 | 4
  "submit_date": "2013-05-15 11:32:26", // date submitted, in UTC
  "approved_date": "2013-07-06 08:54:46", // date ranked, in UTC
  "last_update": "2013-07-06 08:51:22", // last update date, in UTC. May be after approved_date if map was unranked and reranked.
  "artist": "Luxion",
  "beatmap_id": "252002",              // beatmap_id is per difficulty
  "beatmapset_id": "93398",               // beatmapset_id groups difficulties into a set
  "bpm": "196",
  "creator": "RikiH_",
  "creator_id": "686209",
  "difficultyrating": "5.744717597961426",   // The number of stars the map would have in-game and on the website
  "diff_aim": "2.7706098556518555",
  "diff_speed": "2.9062750339508057",
  "diff_size": "4",                   // Circle size value (CS)
  "diff_overall": "8",                   // Overall difficulty (OD)
  "diff_approach": "9",                   // Approach Rate (AR)
  "diff_drain": "7",                   // Health drain (HP)
  "hit_length": "114",                 // seconds from first note to last note not including breaks
  "source": "BMS",
  "genre_id": "2",                   // 0 = any, 1 = unspecified, 2 = video game, 3 = anime, 4 = rock, 5 = pop, 6 = other, 7 = novelty, 9 = hip hop, 10 = electronic, 11 = metal, 12 = classical, 13 = folk, 14 = jazz (note that there's no 8)
  "language_id": "5",                   // 0 = any, 1 = unspecified, 2 = english, 3 = japanese, 4 = chinese, 5 = instrumental, 6 = korean, 7 = french, 8 = german, 9 = swedish, 10 = spanish, 11 = italian, 12 = russian, 13 = polish, 14 = other
  "title": "High-Priestess",      // song name
  "total_length": "146",                 // seconds from first note to last note including breaks
  "version": "Overkill",            // difficulty name
  "file_md5": "c8f08438204abfcdd1a748ebfae67421",
  // md5 hash of the beatmap
  "mode": "0",                   // game mode,
  "tags": "kloyd flower roxas",  // Beatmap tags separated by spaces.
  "favourite_count": "140",                 // Number of times the beatmap was favourited. (Americans: notice the ou!)
  "rating": "9.44779",
  "playcount": "94637",               // Number of times the beatmap was played
  "passcount": "10599",               // Number of times the beatmap was passed, completed (the user didn't fail or retry)
  "count_normal": "388",
  "count_slider": "222",
  "count_spinner": "3",
  "max_combo": "899",                 // The maximum combo a user can reach playing this beatmap.
  "storyboard": "0",                   // If this beatmap has a storyboard
  "video": "0",                   // If this beatmap has a video
  "download_unavailable": "0",                   // If the download for this beatmap is unavailable (old map, etc.)
  "audio_unavailable": "0";                    // If the audio for this beatmap is unavailable (DMCA takedown, etc.)
};