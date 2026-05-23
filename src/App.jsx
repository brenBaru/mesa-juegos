import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import {
  subscribeGames,
  subscribeFavs,
  setFavs as saveFavsToFirestore,
  upsertGame,
  deleteGame
} from "./data/firestoreGames";
import { initialGames } from "./data/initialGames";
import { emptyForm, modeOptions, typeOptions } from "./data/options";
import { ToastMessage } from "./components/ui/ToastMessage";
import { LoginScreen } from "./screens/LoginScreen";
import { DetailScreen } from "./screens/DetailScreen";
import { ImportScreen } from "./screens/ImportScreen";
import { AddGameScreen } from "./screens/AddGameScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { timeLabel } from "./utils/gameUtils";
import { normalizeCatalogGame } from "./utils/catalogUtils";
import { getRecommendedGames } from "./utils/recommendationUtils";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [players, setPlayers] = useState(5);
  const { user, authLoading, loginGoogle, logout } = useAuth();
  const [cloudGames, setCloudGames] = useState([]);
  const [cloudFavs, setCloudFavs] = useState([]);
  const [cloudLoading, setCloudLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleteNotice, setDeleteNotice] = useState(null);
  const [allowOffline, setAllowOffline] = useState(false);
  const [query, setQuery] = useState("");
  const [onlyPlayable, setOnlyPlayable] = useState(true);
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [modeFilter, setModeFilter] = useState("Todos");
  const [timeFilter, setTimeFilter] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);
  const [isCompactHeader, setIsCompactHeader] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [isEditingGuide, setIsEditingGuide] = useState(false);
  const [guideForm, setGuideForm] = useState({
    vibe: "",
    videoUrl: "",
    rulesUrl: "",
    setupText: "",
    howToText: ""
  });
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [noteText, setNoteText] = useState("");

  const [customGames, setCustomGames] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mesa-juegos-custom")) || [];
    } catch {
      return [];
    }
  });

  const [favs, setFavs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mesa-juegos-favs")) || [];
    } catch {
      return [];
    }
  });

  const [importQuery, setImportQuery] = useState("");
  const [importResults, setImportResults] = useState([]);
  const [importLoading, setImportLoading] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);

  const effectiveCustomGames = user ? cloudGames : customGames;
  const effectiveFavs = user ? cloudFavs : favs;

  const games = useMemo(() => {
    const mergedGames = new Map(initialGames.map((game) => [game.id, game]));
    effectiveCustomGames.forEach((game) => {
      mergedGames.set(game.id, game);
    });
    return Array.from(mergedGames.values());
  }, [effectiveCustomGames]);

  useEffect(() => {
    if (!user) {
      setCloudGames([]);
      setCloudFavs([]);
      setCloudLoading(false);
      return;
    }

    setCloudLoading(true);

    const unsubscribeGames = subscribeGames(user.uid, (list) => {
      setCloudGames(list);
      setCloudLoading(false);
    });

    const unsubscribeFavs = subscribeFavs(user.uid, (ids) => {
      setCloudFavs(ids);
    });

    return () => {
      unsubscribeGames();
      unsubscribeFavs();
    };
  }, [user]);

  useEffect(() => {
    let active = true;

    fetch("/catalog.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("No se pudo cargar catalog.json");
      }

      return res.json();
    })
    .then((data) => {
      const list = Array.isArray(data)
        ? data
        : data.games || data.items || data.collection || [];

      const normalizedCatalog = list
        .map((item, index) => normalizeCatalogGame(item, index))
        .filter((game) => game.name && game.name !== "Sin nombre");

      if (active) {
        setCatalog(normalizedCatalog);
      }
    })
    .catch((error) => {
      console.error("Error cargando catálogo local", error);

      if (active) {
        setCatalog([]);
      }
    })
    .finally(() => {
      if (active) {
        setCatalogLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Histeresis amplia para evitar parpadeo cuando cambia el alto del header.
        // Si el usuario baja con filtros abiertos, cerramos filtros para que el alto
        // de la cabecera no cambie repetidamente durante el scroll.
        if (scrollY > 360) {
          setShowFilters(false);
          setIsCompactHeader(true);
        } else if (scrollY < 70) {
          setIsCompactHeader(false);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("mesa-juegos-favs", JSON.stringify(favs));
    }
  }, [favs, user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("mesa-juegos-custom", JSON.stringify(customGames));
    }
  }, [customGames, user]);

  const playable = (game) => players >= Number(game.min) && players <= Number(game.max);

  const visibleGames = useMemo(() => {
    return games
      .filter((game) => screen !== "favorites" || effectiveFavs.includes(game.id))
      .filter((game) => !onlyPlayable || playable(game))
      .filter((game) => typeFilter === "Todos" || game.type === typeFilter)
      .filter((game) => modeFilter === "Todos" || game.mode === modeFilter)
      .filter((game) => timeFilter === "Todos" || timeLabel(game) === timeFilter)
      .filter((game) => `${game.name} ${game.type} ${game.mode}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => Number(playable(b)) - Number(playable(a)) || a.name.localeCompare(b.name));
  }, [games, players, onlyPlayable, typeFilter, modeFilter, timeFilter, query, effectiveFavs, screen]);

  const recommendedGames = useMemo(() => {
    return getRecommendedGames({
      games,
      catalog,
      favoriteIds: effectiveFavs,
      players
    });
  }, [games, catalog, effectiveFavs, players]);

  const setupPlaceholder = [
    "Un paso por línea.",
    "Ej: Separar cartas.",
    "Repartir roles.",
    "Preparar tablero."
  ].join("\n");

  const howToPlaceholder = [
    "Un paso por línea.",
    "Ej: En tu turno robás una carta.",
    "Luego jugás una acción.",
    "Gana quien llegue al objetivo."
  ].join("\n");

  const resetFilters = () => {
    setQuery("");
    setIsSearchOpen(false);
    setOnlyPlayable(true);
    setTypeFilter("Todos");
    setModeFilter("Todos");
    setTimeFilter("Todos");
  };

  const activeFilterChips = useMemo(() => {
    const chips = [];
    chips.push(onlyPlayable ? `Jugables para ${players}` : "Todos los juegos");
    if (typeFilter !== "Todos") chips.push(typeFilter);
    if (timeFilter !== "Todos") chips.push(timeFilter);
    if (modeFilter !== "Todos") chips.push(modeFilter);
    if (query.trim()) chips.push(`Búsqueda: ${query.trim()}`);
    return chips;
  }, [onlyPlayable, players, typeFilter, timeFilter, modeFilter, query]);

  const saveManualGame = async () => {
    if (!form.name.trim()) return;

    const setup = form.setupText
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    const howTo = form.howToText
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    const newGame = {
      id: `custom-${Date.now()}`,
      custom: true,
      name: form.name.trim(),
      min: Number(form.min),
      max: Number(form.max),
      type: form.type,
      mode: form.mode,
      timeMin: Number(form.timeMin),
      timeMax: Number(form.timeMax),
      age: form.age || "N/D",
      level: form.level,
      vibe: form.vibe || "Juego agregado manualmente.",
      videoUrl:
        form.videoUrl ||
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          form.name + " como jugar"
        )}`,
      rulesUrl:
        form.rulesUrl ||
        `https://www.google.com/search?q=${encodeURIComponent(
          form.name + " reglas"
        )}`,
      setup: setup.length
        ? setup
        : ["Prepará los componentes del juego según el reglamento."],
      howTo: howTo.length
        ? howTo
        : ["Jugá siguiendo la secuencia indicada por el reglamento."],
      playerSetups: []
    };

    if (user) {
      await upsertGame(user.uid, newGame);
    } else {
      setCustomGames((prev) => [newGame, ...prev]);
    }

    setSelected(newGame);
    setForm(emptyForm);
    setScreen("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFav = async (id) => {
    if (!user) {
      setFavs((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
      return;
    }

    const nextFavs = effectiveFavs.includes(id)
      ? effectiveFavs.filter((x) => x !== id)
      : [...effectiveFavs, id];

    await saveFavsToFirestore(user.uid, nextFavs);
  };

  const showToast = (message) => {
    setToast({ message });
    window.setTimeout(() => setToast(null), 2800);
  };

  const requestDeleteGame = (game) => {
    setPendingDelete(game);
  };

  const openEditGuide = (game) => {
    setGuideForm({
      vibe: game.vibe || "",
      videoUrl: game.videoUrl || "",
      rulesUrl: game.rulesUrl || "",
      setupText: Array.isArray(game.setup) ? game.setup.join("\n") : "",
      howToText: Array.isArray(game.howTo) ? game.howTo.join("\n") : ""
    });
    setIsEditingGuide(true);
  };

  const saveGuide = async () => {
    if (!selected) return;

    const setup = guideForm.setupText
      .split("\n")
      .map((step) => step.trim())
      .filter(Boolean);
    const howTo = guideForm.howToText
      .split("\n")
      .map((step) => step.trim())
      .filter(Boolean);

    const updatedGame = {
      ...selected,
      custom: true,
      vibe: guideForm.vibe.trim() || selected.vibe || "Guía personalizada.",
      videoUrl: guideForm.videoUrl.trim() || selected.videoUrl || "",
      rulesUrl: guideForm.rulesUrl.trim() || selected.rulesUrl || "",
      setup: setup.length ? setup : ["Preparación no disponible."],
      howTo: howTo.length ? howTo : ["Reglas no disponibles."]
    };

    if (user) {
      await upsertGame(user.uid, updatedGame);
    } else {
      setCustomGames((prev) => {
        const exists = prev.some((game) => game.id === updatedGame.id);
        return exists
          ? prev.map((game) => (game.id === updatedGame.id ? updatedGame : game))
          : [updatedGame, ...prev];
      });
    }

    setSelected(updatedGame);
    setIsEditingGuide(false);
    showToast("Guía actualizada correctamente.");
  };

  const openEditNotes = (game) => {
    setNoteText(game.personalNotes || "");
    setIsEditingNotes(true);
  };

  const saveNotes = async () => {
    if (!selected) return;

    const updatedGame = {
      ...selected,
      custom: true,
      personalNotes: noteText.trim()
    };

    if (user) {
      await upsertGame(user.uid, updatedGame);
    } else {
      setCustomGames((prev) => {
        const exists = prev.some((game) => game.id === updatedGame.id);
        return exists
          ? prev.map((game) => (game.id === updatedGame.id ? updatedGame : game))
          : [updatedGame, ...prev];
      });
    }

    setSelected(updatedGame);
    setIsEditingNotes(false);
    showToast("Notas personales actualizadas.");
  };

  const confirmDeleteGame = async () => {
    if (!pendingDelete) return;

    const deletedId = pendingDelete.id;
    const deletedName = pendingDelete.name;

    if (user) {
      await deleteGame(user.uid, deletedId);
      await saveFavsToFirestore(
        user.uid,
        effectiveFavs.filter((fav) => fav !== deletedId)
      );
    } else {
      setCustomGames((prev) => prev.filter((game) => game.id !== deletedId));
      setFavs((prev) => prev.filter((fav) => fav !== deletedId));
    }

    setPendingDelete(null);
    setSelected(null);
    setScreen("home");
    setDeleteNotice({ name: deletedName });
    showToast(`Se borró ${deletedName} del listado.`);
  };

  const importSuggestedGame = async (game) => {
    if (!game) return;

    const newGame = {
      ...game,
      custom: true,
      videoUrl:
        game.videoUrl ||
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          game.name + " juego de mesa como jugar"
        )}`,
      rulesUrl:
        game.rulesUrl ||
        `https://www.google.com/search?q=${encodeURIComponent(
          game.name + " reglas juego de mesa"
        )}`,
      setup:
        Array.isArray(game.setup) && game.setup.length
          ? game.setup
          : ["Preparación no disponible."],
      howTo:
        Array.isArray(game.howTo) && game.howTo.length
          ? game.howTo
          : ["Reglas no disponibles."],
      playerSetups: Array.isArray(game.playerSetups) ? game.playerSetups : []
    };

    if (user) {
      await upsertGame(user.uid, newGame);
    } else {
      setCustomGames((prev) => [newGame, ...prev]);
    }

    setSelected(newGame);
    setScreen("detail");
    showToast("Juego importado desde sugerencias.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const searchGames = (query) => {
    if (!query.trim() || query.length < 3) {
      setImportResults([]);
      return;
    }

    setImportLoading(true);

    const normalizedQuery = query.toLowerCase();

    const results = catalog
      .filter((game) =>
        `${game.name} ${game.type} ${game.mode} ${game.vibe}`
          .toLowerCase()
          .includes(normalizedQuery)
      )
      .slice(0, 12);

    setImportResults(results);
    setImportLoading(false);
  };

  if (!authLoading && !user && !allowOffline) {
    return (
      <>
        <ToastMessage toast={toast} />
        <LoginScreen
          authLoading={authLoading}
          loginGoogle={loginGoogle}
          onContinueOffline={() => setAllowOffline(true)}
        />
      </>
    );
  }

  if (screen === "detail" && selected) {
    return (
      <DetailScreen
        selected={selected}
        players={players}
        pendingDelete={pendingDelete}
        toast={toast}
        effectiveFavs={effectiveFavs}
        setPendingDelete={setPendingDelete}
        confirmDeleteGame={confirmDeleteGame}
        setIsEditingGuide={setIsEditingGuide}
        setIsEditingNotes={setIsEditingNotes}
        setScreen={setScreen}
        toggleFav={toggleFav}
        openEditGuide={openEditGuide}
        playable={playable}
        isEditingNotes={isEditingNotes}
        noteText={noteText}
        setNoteText={setNoteText}
        openEditNotes={openEditNotes}
        saveNotes={saveNotes}
        requestDeleteGame={requestDeleteGame}
        isEditingGuide={isEditingGuide}
        guideForm={guideForm}
        setGuideForm={setGuideForm}
        setupPlaceholder={setupPlaceholder}
        howToPlaceholder={howToPlaceholder}
        saveGuide={saveGuide}
      />
    );
  }
  if (screen === "import") {
    return (
      <ImportScreen
        toast={toast}
        catalog={catalog}
        importResults={importResults}
        catalogLoading={catalogLoading}
        importQuery={importQuery}
        setImportQuery={setImportQuery}
        searchGames={searchGames}
        importLoading={importLoading}
        games={games}
        setSelected={setSelected}
        setScreen={setScreen}
        user={user}
        upsertGame={upsertGame}
        setCustomGames={setCustomGames}
        showToast={showToast}
      />
    );
  }
  if (screen === "add") {
    return (
      <AddGameScreen
        toast={toast}
        setScreen={setScreen}
        form={form}
        setForm={setForm}
        typeOptions={typeOptions}
        modeOptions={modeOptions}
        setupPlaceholder={setupPlaceholder}
        howToPlaceholder={howToPlaceholder}
        saveManualGame={saveManualGame}
      />
    );
  }

  return (
    <HomeScreen
      toast={toast}
      pendingDelete={pendingDelete}
      setPendingDelete={setPendingDelete}
      confirmDeleteGame={confirmDeleteGame}
      isCompactHeader={isCompactHeader}
      authLoading={authLoading}
      user={user}
      logout={logout}
      loginGoogle={loginGoogle}
      showFilters={showFilters}
      setShowFilters={setShowFilters}
      players={players}
      setPlayers={setPlayers}
      isSearchOpen={isSearchOpen}
      setIsSearchOpen={setIsSearchOpen}
      query={query}
      setQuery={setQuery}
      activeFilterChips={activeFilterChips}
      onlyPlayable={onlyPlayable}
      setOnlyPlayable={setOnlyPlayable}
      typeFilter={typeFilter}
      setTypeFilter={setTypeFilter}
      timeFilter={timeFilter}
      setTimeFilter={setTimeFilter}
      modeFilter={modeFilter}
      setModeFilter={setModeFilter}
      resetFilters={resetFilters}
      visibleGames={visibleGames}
      recommendedGames={recommendedGames}
      onImportSuggestedGame={importSuggestedGame}
      deleteNotice={deleteNotice}
      setDeleteNotice={setDeleteNotice}
      screen={screen}
      setScreen={setScreen}
      effectiveFavs={effectiveFavs}
      games={games}
      playable={playable}
      setSelected={setSelected}
      toggleFav={toggleFav}
    />
  );
}
