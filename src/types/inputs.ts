export const LANGUAGES = ["English", "Portuguese", "Spanish"] as const;

export const SECTION_TYPES = [
  "Verse",
  "Pre-Chorus",
  "Chorus",
  "Bridge",
  "Outro",
  "Intro",
] as const;

export const LEVEL = [
  "Very Low",
  "Low",
  "Medium",
  "High",
  "Very High",
] as const;

export const ENERGY_CURVE = [
  "Flat",
  "Gradual Rise",
  "Gradual Fall",
  "Peak",
  "Wave",
] as const;

export const EMOTIONAL_ARC = [
  "Uncertain",
  "Conflicted",
  "Lost",
  "Broken",
  "Fearful",
  "Anxious",
  "Numb",
  "Sad",
  "Lonely",
  "Overwhelmed",
  "Regretful",
  "Ashamed",
  "Doubtful",
  "Confused",
  "Trapped",
  "Angry",
  "Frustrated",
  "Restless",
  "Tired",
  "Hopeless",
  "Curious",
  "Thoughtful",
  "Introspective",
  "Yearning",
  "Hopeful",
  "Determined",
  "Empowered",
  "Confident",
  "Courageous",
  "Resilient",
  "Inspired",
  "Motivated",
  "Optimistic",
  "Energized",
  "Comforted",
  "Relieved",
  "Healing",
  "Calm",
  "Peaceful",
  "Accepting",
  "Reassured",
  "Liberated",
  "Free",
  "Resolved",
] as const;

export const SCALES = [
  "Major (Ionian)",
  "Minor (Aeolian)",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Locrian",
  "Harmonic Major",
  "Harmonic Minor",
  "Melodic Minor",
  "Major Pentatonic",
  "Minor Pentatonic",
  "Blues Major",
  "Blues Minor",
  "Overtone Scale",
  "Jazz Minor",
  "Double Harmonic Major",
  "Double Harmonic Minor",
  "Whole Tone",
  "Half-Diminished",
  "Diminished Whole Half",
  "Diminished Half Whole",
  "Major Triad",
  "Minor Triad",
  "Chromatic",
] as const;

export const VOICES = ["1st Person", "2nd Person", "3rd Person"];
export const GRAMMATICAL_NUMBER = ["Singular", "Plural", "Mixed"];
export const TENSES = ["Past", "Present", "Future", "Mixed"];

export const POSITIONS = [
  "Internal Monologue",
  "External Narration",
  "Dialogue",
  "Declarative Statement",
  "Reflective Commentary",
];

export const FIGURES_OF_SPEECH = [
  "Metaphor",
  "Simile",
  "Personification",
  "Hyperbole",
  "Irony",
  "Sarcasm",
  "Onomatopoeia",
  "Alliteration",
  "Assonance",
  "Consonance",
  "Imagery",
  "Symbolism",
  "Foreshadowing",
  "Flashback",
  "Tone",
  "Mood",
  "Theme",
  "Motif",
  "Rhyme",
  "Internal rhyme",

  "Analogy",
  "Euphemism",
  "Oxymoron",
  "Paradox",
  "Understatement / Litotes",
  "Allegory",
  "Extended metaphor",
  "Conceit",
  "Metonymy",
  "Synecdoche",

  "Anaphora",
  "Epiphora",
  "Epizeuxis",
  "Anadiplosis",
  "Chiasmus",
  "Parallelism",
  "Antithesis",
  "Polysyndeton",
  "Asyndeton",
  "Ellipsis",

  "Pun (Paronomasia)",
  "Zeugma",
  "Syllepsis",
  "Apostrophe",
  "Caesura",
  "Amplification",
  "Enumeration",
  "Hypophora",
  "Pathos",
  "Ethos",
  "Logos",

  "Stream of consciousness",
  "In medias res",
  "Chekhov’s gun",
  "Red herring",
  "Deus ex machina",
  "Plot twist",

  "Euphony",
  "Cacophony",
  "Aposiopesis",
  "Parenthesis",
  "Apposition",
  "Climax (gradation)",
  "Anticlimax (bathos)",
  "Tautology",
  "Pleonasm",
  "Hendiadys",
  "Tricolon",
  "Isocolon",

  "Antimetabole",
  "Symploce",
  "Mesodiplosis",
  "Diacope",
  "Epanalepsis",

  "Synesthesia",
  "Periphrasis",
  "Circumlocution",
  "Catachresis",
  "Hypallage",
  "Antiphrasis",
  "Enallage",
  "Bdelygmia",
  "Prolepsis",
  "Antanagoge",
  "Epanorthosis",
  "Kenning",
];

export const SENSES = [
  "Visual",
  "Auditory",
  "Tactile",
  "Olfactory",
  "Kinesthetic",
];

export const PHRASE_TYPES = [
  "Declarative",
  "Interrogative",
  "Imperative",
  "Exclamatory",
];

export const TONE_KEYWORDS = [
  "Calm",
  "Serene",
  "Peaceful",
  "Gentle",
  "Soft",
  "Nostalgic",
  "Reflective",
  "Introspective",
  "Melancholic",
  "Wistful",
  "Bittersweet",
  "Tender",
  "Warm",
  "Soothing",
  "Dreamy",
  "Sentimental",
  "Passionate",
  "Dramatic",
  "Raw",
  "Vulnerable",
  "Anguished",
  "Tormented",
  "Desperate",
  "Furious",
  "Aggressive",
  "Explosive",
  "Urgent",
  "Haunting",
  "Sorrowful",
  "Mournful",
  "Cathartic",
  "Emotional",
  "Dark",
  "Moody",
  "Brooding",
  "Bleak",
  "Ominous",
  "Mysterious",
  "Tense",
  "Cold",
  "Distant",
  "Gritty",
  "Grim",
  "Oppressive",
  "Eerie",
  "Hollow",
  "Somber",
  "Hopeful",
  "Uplifting",
  "Optimistic",
  "Bright",
  "Cheerful",
  "Playful",
  "Humorous",
  "Energetic",
  "Lighthearted",
  "Joyful",
  "Inspiring",
  "Liberating",
  "Poetic",
  "Abstract",
  "Surreal",
  "Metaphorical",
  "Symbolic",
  "Minimalist",
  "Elaborate",
  "Ornate",
  "Cinematic",
  "Atmospheric",
  "Ethereal",
  "Airy",
  "Visceral",
  "Enigmatic",
  "Conversational",
  "Storytelling",
  "Confessional",
  "Intimate",
  "Honest",
  "Assertive",
  "Detached",
  "Contemplative",
  "Philosophical",
  "Edgy",
  "Streetwise",
  "Neon-Soaked",
  "Industrial",
  "Digital",
  "Futuristic",
  "Retro",
  "Nostalgic-Synth",
  "Cyberpunk",
  "Lo-Fi",
  "High-Energy",
  "Rebellious",
  "Existential",
  "Spiritual",
  "Ritualistic",
  "Cosmic",
  "Chaotic",
  "Orderly",
  "Hypnotic",
  "Meditative",
  "Sarcastic",
  "Ironic",
  "Deadpan",
  "Stoic",
];
export const RHYME_SCHEME = [
  "A",
  "AA",
  "AB",
  "ABAB",
  "AABB",
  "ABBA",
  "ABCABC",
  "ABCB",
  "AABBA",
  "ABBC",
  "ABCD",
  "AAAA",
  "ABAC",
  "AABC",
  "ABCA",
  "ABCC",
  "ABCDAB",
  "ABAAB",
  "AABAB",
];
export const RHYME_TYPES = [
  "Perfect Rhyme",
  "Near Rhyme",
  "Slant Rhyme",
  "Assonance Rhyme",
  "Consonance Rhyme",
  "Syllabic Rhyme",
  "Identical Rhyme",
  "Eye Rhyme",
  "Pararhyme",
  "Internal Rhyme",
  "Reverse Rhyme",
  "Off Rhyme",
  "Wrenched Rhyme",
  "Rich Rhyme",
  "Weak Rhyme",
  "Feminine Rhyme",
  "Masculine Rhyme",
  "Triple Rhyme",
  "Compound Rhyme",
  "Multisyllabic Rhyme",
  "Chain Rhyme",
  "Tail Rhyme",
  "End Rhyme",
  "Head Rhyme",
];

export const LENGTHS = ["Very Short", "Short", "Medium", "Long", "Very Long"];

export interface Track {
  global_settings: GlobalSettings;
  sections_specifications: SectionSpecifications[];
}

export interface GlobalSettings {
  title?: string;
  language?: string;
  tempo?: number;
  residual_emotion?: string[];
  brainstorming_words?: string[];
  general_instructions?: string;
}

export interface SectionSpecifications {
  id?: number | string;
  section_type?: string;
  artistic_influences?: string[];
  emotional_arc_start: string[];
  emotional_arc_end: string[];
  energy_level?: string | null;
  energy_curve?: string | null;
  override_settings: Record<string, any>;
  // lyric_instructions
  lyric_already_written: string;
  creative_brief: string[];
  avoid_brief?: string[] | null;
  mandatory_concepts?: string[];
  tone_keywords?: string[];
  lyric_style?: string;
  narrative: Narrative;
  rhyme_scheme?: string | null;
  rhyme_type?: string[] | null;
  syllabic_density?: string | null;
  repetition_intensity?: string | null;
  // musicality_instructions
  scale?: string | null;
  length_in_bars?: number;
  notes_length?: string | null;
  spaces_between_lines?: string | null;
  density_of_notes?: string | null;
  midi_json?: MidiJson;
}

export interface MidiJson {
  lyrics_alignment: LyricsAlignment;
  notes: MidiNote[];
}

export interface LyricsAlignment {
  one_syllable_per_note: boolean;
  allow_melisma: boolean;
  prefer_stressed_on_downbeats: boolean;
}

export interface MidiNote {
  time: number;
  note: string;
  duration: number;
}

export interface Narrative {
  voice?: string | null;
  grammatical_number?: string | null;
  tense?: string | null;
  position?: string | null;
  figures_of_speech?: string[];
  literalness?: string | null;
  sensorial_details?: string[] | null;
  phrase_types?: string[] | null;
}

export interface SemanticConstraints {}
