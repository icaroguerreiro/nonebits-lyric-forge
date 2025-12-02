import { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Grid,
  Button,
  Card,
  CardContent,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Typography,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  SECTION_TYPES,
  LANGUAGES,
  LEVEL,
  ENERGY_CURVE,
  EMOTIONAL_ARC,
  SCALES,
  VOICES,
  Narrative,
  GRAMMATICAL_NUMBER,
  TENSES,
  POSITIONS,
  FIGURES_OF_SPEECH,
  SENSES,
  PHRASE_TYPES,
  TONE_KEYWORDS,
  RHYME_SCHEME,
  RHYME_TYPES,
  LENGTHS,
  STYLES,
} from "../../types/inputs";
import { GlobalSettings, SectionSpecifications } from "../../types/inputs";
import NumberField from "../../components/ui/NumberField";

import {
  AddCircle,
  Delete,
  ExpandMore,
  Bookmark,
  Save,
  Menu,
  MenuOpen,
  FileOpen,
  DataObject,
  AddBox,
  Note,
  DragIndicator,
  ContentCopy,
} from "@mui/icons-material";
import FreeSoloChipsAutocomplete from "../../components/ui/FreeSoloChipsAutocomplete";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import SortableSection from "../../components/ui/SortableSection";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export default function Home() {
  const { draft } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const updateGlobalSettings = (newInput: Partial<GlobalSettings>) => {
    setinputs({
      ...inputs,
      global_settings: {
        ...inputs?.global_settings,
        ...newInput,
      },
    });
  };
  const updateSectionSpecifications = (
    index: number,
    newInput: Partial<SectionSpecifications>
  ) => {
    const updatedSections = inputs?.sections_specifications?.map(
      (__section: SectionSpecifications, __i: number) => {
        if (__i === index) {
          return {
            ...__section,
            ...newInput,
          };
        }
        return __section;
      }
    );
    setinputs({
      ...inputs,
      sections_specifications: updatedSections,
    });
  };
  const updateNarrative = (
    __index: number,
    __new_input: Partial<Narrative>
  ) => {
    updateSectionSpecifications(__index, {
      narrative: {
        ...inputs?.sections_specifications[__index]?.narrative,
        ...__new_input,
      },
    });
  };

  const [inputs, setinputs] = useState<any>({
    sections_specifications: [],
  });

  const [draftList, setdraftList] = useState<any>([]);
  useEffect(() => {
    if (draft) {
      const draft_project = localStorage.getItem(draft) as any;
      if (draft_project) {
        setinputs(JSON.parse(draft_project));
      }
    }
    setdraftList(loadAllDraftsArray() as any);
  }, [draft]);

  function loadAllDraftsArray() {
    const arr = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("draft-")) {
        const value = localStorage.getItem(key);
        if (value) {
          const _data = JSON.parse(value);
          arr.push({
            id: key,
            title: _data?.global_settings?.title,
          });
        }
      }
    }
    return arr;
  }

  const saveDraft = () => {
    const _id = draft || `draft-${crypto.randomUUID()}`;
    localStorage.setItem(_id, JSON.stringify(inputs));
    if (!draft) {
      setdraftList([
        ...draftList,
        {
          id: _id,
          title: inputs?.global_settings?.title || null,
        },
      ]);
      openDraft(_id);
    }
    showToast({
      message: "Draft saved!",
      severity: "success",
    });
  };

  const openDraft = (__id: string) => {
    navigate(`/draft/${__id}`, { replace: true });
  };

  const [fileListOpen, setfileListOpen] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false);

  const copyPrompt = () => {
    const _prompt = {
      instruction:
        "Compose lyrics for a song based on the following specifications.",
      generation_rules: {
        handle_empty_fields: "fill_creatively",
        handle_arrays: "select_or_mix_contextually",
      },
      global_settings: inputs?.global_settings,
      sections_specifications: inputs?.sections_specifications?.map(
        (__section: any) => {
          const { id, ...rest } = __section;
          return rest;
        }
      ),
    };
    navigator.clipboard.writeText(JSON.stringify(_prompt));
    showToast({
      message: "Prompt copied to clipboard!",
      severity: "success",
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    })
  );

  const duplicateSection = (__section: any) => {
    setinputs((prev: any) => {
      const idx = prev.sections_specifications.findIndex(
        (s: any) => s.id === __section.id
      );

      if (idx === -1) return prev;

      const duplicated = {
        ...structuredClone(__section),
        id: crypto.randomUUID(),
      };

      const updated = [...prev.sections_specifications];
      updated.splice(idx + 1, 0, duplicated);

      return {
        ...prev,
        sections_specifications: updated,
      };
    });
  };

  useEffect(() => {
    inputs.sections_specifications &&
      console.log(
        "inputs.sections_specifications",
        inputs.sections_specifications
      );
  }, [inputs.sections_specifications]);

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={3}>
              <TextField
                label="Song Title"
                value={inputs?.global_settings?.title || ""}
                onChange={(__ev) => {
                  updateGlobalSettings({
                    title: __ev.target.value,
                  });
                }}
                fullWidth
              />
            </Grid>
            <Grid size={3}>
              <Autocomplete
                freeSolo
                options={LANGUAGES}
                value={inputs?.global_settings?.language || ""}
                onInputChange={(__ev, __value) => {
                  updateGlobalSettings({
                    language: __value,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Language" />
                )}
                fullWidth
              />
            </Grid>
            <Grid size={2}>
              <NumberField
                label="Tempo (BPM)"
                value={inputs?.global_settings?.tempo || ""}
                onChange={(__ev: any) => {
                  updateGlobalSettings({
                    tempo: Number(__ev.target.value),
                  });
                }}
                max={300}
              />
            </Grid>
            <Grid size={4}>
              <FreeSoloChipsAutocomplete
                label="Residual Emotion(s)"
                options={[...EMOTIONAL_ARC]}
                value={inputs?.global_settings?.residual_emotion || []}
                limitTags={3}
                onChange={(__value) => {
                  updateGlobalSettings({
                    residual_emotion: __value,
                  });
                }}
              />
            </Grid>
            <Grid size={6}>
              <FreeSoloChipsAutocomplete
                label="Track Brainstorm Words"
                value={inputs?.global_settings?.brainstorming_words || []}
                limitTags={3}
                onChange={(__value) => {
                  updateGlobalSettings({
                    brainstorming_words: __value,
                  });
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label="General Instructions"
                value={inputs?.global_settings?.general_instructions || ""}
                onChange={(__ev) => {
                  updateGlobalSettings({
                    general_instructions: __ev.target.value,
                  });
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) => {
                  if (!over || active.id === over.id) return;

                  const oldIndex = inputs?.sections_specifications?.findIndex(
                    (s: any) => s.id === active.id
                  );
                  const newIndex = inputs?.sections_specifications?.findIndex(
                    (s: any) => s.id === over.id
                  );

                  setinputs({
                    ...inputs,
                    sections_specifications: arrayMove(
                      inputs?.sections_specifications,
                      oldIndex,
                      newIndex
                    ),
                  });
                }}
              >
                <SortableContext
                  items={inputs?.sections_specifications?.map((s: any) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {inputs?.sections_specifications?.map(
                    (__section: any, __section_i: any) => (
                      <SortableSection key={__section.id} id={__section.id}>
                        {({ attributes, listeners }: any) => (
                          <>
                            <Accordion
                              defaultExpanded={false}
                              // defaultExpanded={!__section?.section_type}
                              key={__section?.id}
                              sx={{ mb: 2 }}
                            >
                              <AccordionSummary
                                sx={{
                                  "& .MuiAccordionSummary-expandIconWrapper": {
                                    transform: "none !important",
                                    transition: "none !important",
                                  },
                                }}
                                expandIcon={
                                  <>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                        backgroundColor: "action.hover",
                                        borderRadius: 3,
                                        padding: "0 .5rem",
                                        mr: 2,
                                      }}
                                    >
                                      <Delete
                                        fontSize="small"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setinputs({
                                            ...inputs,
                                            sections_specifications:
                                              inputs.sections_specifications.filter(
                                                (__: any, __i: number) =>
                                                  __i !== __section_i
                                              ),
                                          });
                                        }}
                                        sx={{
                                          padding: ".5rem .5rem .5rem .25rem",
                                          width: 20,
                                          height: 20,
                                        }}
                                      />
                                      <ContentCopy
                                        fontSize="small"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          duplicateSection(__section);
                                        }}
                                        sx={{
                                          padding: ".25rem",
                                          width: 18,
                                          height: 18,
                                        }}
                                      />
                                    </Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <ExpandMore />
                                    </Box>
                                  </>
                                }
                                aria-controls="panel3-content"
                                id="panel3-header"
                                {...attributes}
                              >
                                <Typography
                                  component="div"
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <DragIndicator
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                    {...listeners}
                                    onClick={(e: any) => e.stopPropagation()}
                                  />
                                  {__section.section_type || "Untitled Section"}
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      ml: "auto",
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  ></Box>
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Grid container spacing={2}>
                                  <Grid size={2}>
                                    <Autocomplete
                                      freeSolo
                                      fullWidth
                                      options={SECTION_TYPES}
                                      value={__section?.section_type || ""}
                                      onInputChange={(__ev, __value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            section_type: __value,
                                          }
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Section Type"
                                        />
                                      )}
                                    />
                                  </Grid>{" "}
                                  <Grid size={4}>
                                    <FreeSoloChipsAutocomplete
                                      label="Artistic Influences"
                                      value={
                                        __section?.artistic_influences || []
                                      }
                                      limitTags={2}
                                      onChange={(__value) =>
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            artistic_influences: __value,
                                          }
                                        )
                                      }
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    <Autocomplete
                                      fullWidth
                                      options={LEVEL}
                                      value={__section?.energy_level || ""}
                                      onChange={(__ev, __value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            energy_level: __value,
                                          }
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Energy Level"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    <Autocomplete
                                      fullWidth
                                      options={ENERGY_CURVE}
                                      value={__section?.energy_curve || ""}
                                      onChange={(__ev, __value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            energy_curve: __value,
                                          }
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Energy Curve"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={6}>
                                    <FreeSoloChipsAutocomplete
                                      label="Emotional Arc Start"
                                      options={[...EMOTIONAL_ARC]}
                                      value={
                                        __section?.emotional_arc_start || []
                                      }
                                      limitTags={3}
                                      onChange={(__value) =>
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            emotional_arc_start: __value,
                                          }
                                        )
                                      }
                                    />
                                  </Grid>
                                  <Grid size={6}>
                                    <FreeSoloChipsAutocomplete
                                      label="Emotional Arc End"
                                      options={[...EMOTIONAL_ARC]}
                                      value={__section?.emotional_arc_end || []}
                                      limitTags={3}
                                      onChange={(__value) =>
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            emotional_arc_end: __value,
                                          }
                                        )
                                      }
                                    />
                                  </Grid>
                                  {/* <Grid size={12}>
                                <Divider variant="fullWidth" component="div" />
                              </Grid>
                              <Grid size={12}>
                                <Typography variant="h6">
                                  Lyrics Instructions
                                </Typography>
                              </Grid> */}
                                  <Grid size={6}>
                                    <TextField
                                      fullWidth
                                      value={
                                        __section?.lyric_already_written || ""
                                      }
                                      onChange={(__ev) =>
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            lyric_already_written:
                                              __ev.target.value,
                                          }
                                        )
                                      }
                                      label="Lyrics Already Written"
                                      multiline
                                    />
                                  </Grid>
                                  <Grid size={6}>
                                    <FreeSoloChipsAutocomplete
                                      label="Brainstorm Words, Themes & Sentences"
                                      value={__section?.creative_brief || []}
                                      onChange={(__value) =>
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            creative_brief: __value,
                                          }
                                        )
                                      }
                                    />
                                  </Grid>
                                  <Grid size={4}>
                                    <FreeSoloChipsAutocomplete
                                      label="Avoid Words, Themes & Sentences"
                                      value={__section?.avoid_brief || []}
                                      onChange={(__value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            avoid_brief: __value,
                                          }
                                        );
                                      }}
                                    />
                                  </Grid>
                                  <Grid size={4}>
                                    <FreeSoloChipsAutocomplete
                                      label="Mandatory concepts"
                                      value={
                                        __section?.mandatory_concepts || []
                                      }
                                      onChange={(__value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            mandatory_concepts: __value,
                                          }
                                        );
                                      }}
                                    />
                                  </Grid>
                                  <Grid size={4}>
                                    <FreeSoloChipsAutocomplete
                                      label="Tone Keywords"
                                      options={TONE_KEYWORDS}
                                      value={__section?.tone_keywords || []}
                                      onChange={(__value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            tone_keywords: __value,
                                          }
                                        );
                                      }}
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    {/* <TextField
                                  label="Lyric Style"
                                  value={__section?.lyric_style || ""}
                                  onChange={(__ev) => {
                                    updateSectionSpecifications(__section_i, {
                                      lyric_style: __ev?.target?.value,
                                    });
                                  }}
                                  fullWidth
                                /> */}
                                    <Autocomplete
                                      fullWidth
                                      options={STYLES}
                                      value={__section?.lyric_style || ""}
                                      onChange={(__ev, __value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            lyric_style: __value,
                                          }
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Lyrical Style"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    <Autocomplete
                                      fullWidth
                                      options={VOICES}
                                      value={__section?.narrative?.voice || ""}
                                      onChange={(__ev, __value) => {
                                        updateNarrative(__section_i, {
                                          voice: __value,
                                        });
                                      }}
                                      renderInput={(params) => (
                                        <TextField {...params} label="Voice" />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    <Autocomplete
                                      fullWidth
                                      options={GRAMMATICAL_NUMBER}
                                      value={
                                        __section?.narrative
                                          ?.grammatical_number || ""
                                      }
                                      onChange={(__ev, __value) => {
                                        updateNarrative(__section_i, {
                                          grammatical_number: __value,
                                        });
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Grammatical Number"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    <Autocomplete
                                      fullWidth
                                      options={TENSES}
                                      value={__section?.narrative?.tense || ""}
                                      onChange={(__ev, __value) => {
                                        updateNarrative(__section_i, {
                                          tense: __value,
                                        });
                                      }}
                                      renderInput={(params) => (
                                        <TextField {...params} label="Tense" />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    <Autocomplete
                                      fullWidth
                                      options={POSITIONS}
                                      value={
                                        __section?.narrative?.position || ""
                                      }
                                      onChange={(__ev, __value) => {
                                        updateNarrative(__section_i, {
                                          position: __value,
                                        });
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Position"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={6}>
                                    <Autocomplete
                                      fullWidth
                                      multiple
                                      options={FIGURES_OF_SPEECH}
                                      limitTags={2}
                                      value={
                                        __section?.narrative
                                          ?.figures_of_speech || []
                                      }
                                      onChange={(__ev, __value) => {
                                        updateNarrative(__section_i, {
                                          figures_of_speech: __value,
                                        });
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Figures of Speech"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    <Autocomplete
                                      fullWidth
                                      options={[...LEVEL]}
                                      value={
                                        __section?.narrative?.literalness || ""
                                      }
                                      onChange={(__ev, __value) => {
                                        updateNarrative(__section_i, {
                                          literalness: __value,
                                        });
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Literalness"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={4}>
                                    <Autocomplete
                                      fullWidth
                                      multiple
                                      options={SENSES}
                                      limitTags={3}
                                      value={
                                        __section?.narrative
                                          ?.sensorial_details || []
                                      }
                                      onChange={(__ev, __value) => {
                                        updateNarrative(__section_i, {
                                          sensorial_details: __value,
                                        });
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Sensorial Details"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={4}>
                                    <Autocomplete
                                      fullWidth
                                      multiple
                                      options={PHRASE_TYPES}
                                      limitTags={2}
                                      value={
                                        __section?.narrative?.phrase_types || []
                                      }
                                      onChange={(__ev, __value) => {
                                        updateNarrative(__section_i, {
                                          phrase_types: __value,
                                        });
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Phrase Types"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={4}>
                                    <Autocomplete
                                      fullWidth
                                      freeSolo
                                      options={RHYME_SCHEME}
                                      value={__section?.rhyme_scheme || ""}
                                      onChange={(__ev, __value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            rhyme_scheme: __value,
                                          }
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Rhyme Scheme"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={6}>
                                    <Autocomplete
                                      fullWidth
                                      freeSolo
                                      multiple
                                      limitTags={2}
                                      options={RHYME_TYPES}
                                      value={__section?.rhyme_type || []}
                                      onChange={(__ev, __value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            rhyme_type: __value,
                                          }
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Rhyme Type"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    <Autocomplete
                                      fullWidth
                                      options={[...LEVEL]}
                                      value={__section?.syllabic_density || ""}
                                      onChange={(__ev, __value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            syllabic_density: __value,
                                          }
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Syllabic Density"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    <Autocomplete
                                      fullWidth
                                      options={[...LEVEL]}
                                      value={
                                        __section?.repetition_intensity || ""
                                      }
                                      onChange={(__ev, __value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            repetition_intensity: __value,
                                          }
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Repetition Intensity"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={4}>
                                    <Autocomplete
                                      fullWidth
                                      options={SCALES}
                                      value={__section?.scale || null}
                                      onChange={(__ev, __value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            scale: __value,
                                          }
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField {...params} label="Scale" />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={2}>
                                    <NumberField
                                      label="Bars"
                                      value={__section?.length_in_bars || ""}
                                      onChange={(__ev: any) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            length_in_bars: __ev?.target?.value,
                                          }
                                        );
                                      }}
                                      max={300}
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    <Autocomplete
                                      fullWidth
                                      options={LENGTHS}
                                      value={__section?.notes_length || null}
                                      onChange={(__ev, __value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            notes_length: __value,
                                          }
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Notes Length"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    <Autocomplete
                                      fullWidth
                                      options={LEVEL}
                                      value={
                                        __section?.spaces_between_lines || null
                                      }
                                      onChange={(__ev, __value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            spaces_between_lines: __value,
                                          }
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Space Between Lines"
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid size={3}>
                                    <Autocomplete
                                      fullWidth
                                      options={LEVEL}
                                      value={
                                        __section?.density_of_notes || null
                                      }
                                      onChange={(__ev, __value) => {
                                        updateSectionSpecifications(
                                          __section_i,
                                          {
                                            density_of_notes: __value,
                                          }
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Density of Notes"
                                        />
                                      )}
                                    />
                                  </Grid>
                                </Grid>
                              </AccordionDetails>
                              <AccordionActions>
                                <Button
                                  size="small"
                                  color="error"
                                  startIcon={<Delete />}
                                  onClick={() => {
                                    setinputs({
                                      ...inputs,
                                      sections_specifications:
                                        inputs.sections_specifications.filter(
                                          (__: any, __i: number) =>
                                            __i !== __section_i
                                        ),
                                    });
                                  }}
                                >
                                  Remove Section
                                </Button>
                              </AccordionActions>
                            </Accordion>
                          </>
                        )}
                      </SortableSection>
                    )
                  )}
                </SortableContext>
              </DndContext>
            </Grid>
            <Grid size={12}>
              <Button
                variant="contained"
                startIcon={<AddCircle />}
                fullWidth
                onClick={() => {
                  setinputs({
                    ...inputs,
                    sections_specifications: [
                      ...(inputs?.sections_specifications || []),
                      { id: crypto.randomUUID() },
                    ],
                  });
                }}
              >
                Add Section
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Button
                variant="contained"
                startIcon={<DataObject />}
                onClick={() => {
                  copyPrompt();
                }}
              >
                Copy Prompt
              </Button>
              <Button
                sx={{ ml: 2 }}
                variant="contained"
                startIcon={<Save />}
                onClick={() => {
                  saveDraft();
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <SpeedDial
        ariaLabel="floating actions"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon icon={<Menu />} openIcon={<MenuOpen />} />}
        FabProps={{
          onClick: () => setmenuOpen((prev) => !prev),
        }}
        open={menuOpen}
      >
        <SpeedDialAction
          icon={<Save />}
          slotProps={{
            tooltip: {
              open: true,
              title: "Save",
            },
          }}
          onClick={() => {
            setmenuOpen(false);
            saveDraft();
          }}
        />
        <SpeedDialAction
          icon={<DataObject />}
          slotProps={{
            tooltip: {
              open: true,
              title: "Prompt",
            },
          }}
          onClick={() => {
            setmenuOpen(false);
            copyPrompt();
          }}
        />
        <SpeedDialAction
          icon={<FileOpen />}
          slotProps={{
            tooltip: {
              open: true,
              title: "Open",
            },
          }}
          onClick={() => {
            setmenuOpen(false);
            setfileListOpen(true);
          }}
        />
        <SpeedDialAction
          icon={<AddBox />}
          slotProps={{
            tooltip: {
              open: true,
              title: "New",
            },
          }}
          onClick={() => {
            setmenuOpen(false);
            setinputs({});
            openDraft("");
          }}
        />
      </SpeedDial>
      <Drawer
        open={fileListOpen}
        onClose={() => {
          setfileListOpen(false);
          setmenuOpen(false);
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => {
            setfileListOpen(false);
          }}
        >
          <List>
            {draftList?.map((__draft: any) => {
              return (
                <ListItem
                  key={__draft?.id}
                  disablePadding
                  onClick={() => {
                    openDraft(__draft?.id);
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <Note />
                    </ListItemIcon>
                    <ListItemText
                      primary={__draft?.title || "Untitled Draft"}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
