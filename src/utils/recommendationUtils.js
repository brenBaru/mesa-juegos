function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9ñ\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOPWORDS = new Set([
  "con",
  "para",
  "por",
  "los",
  "las",
  "una",
  "uno",
  "del",
  "que",
  "juego",
  "juegos",
  "mesa",
  "de",
  "y",
  "o",
  "en",
  "la",
  "el",
  "un"
]);

function vibeTokens(game) {
  return normalizeText(game.vibe)
    .split(" ")
    .filter((word) => word.length >= 4 && !STOPWORDS.has(word));
}

function timeAverage(game) {
  return (Number(game.timeMin || 0) + Number(game.timeMax || 0)) / 2;
}

function rangesOverlap(aMin, aMax, bMin, bMax) {
  return Number(aMin) <= Number(bMax) && Number(bMin) <= Number(aMax);
}

function addReason(reasons, reason) {
  if (!reasons.includes(reason)) {
    reasons.push(reason);
  }
}

export function getRecommendedGames({ games, favoriteIds, players, limit = 6 }) {
  if (!Array.isArray(games) || !Array.isArray(favoriteIds) || favoriteIds.length === 0) {
    return [];
  }

  const favoriteIdSet = new Set(favoriteIds);
  const favorites = games.filter((game) => favoriteIdSet.has(game.id));
  const candidates = games.filter((game) => !favoriteIdSet.has(game.id));

  if (favorites.length === 0 || candidates.length === 0) {
    return [];
  }

  return candidates
    .map((candidate) => {
      let score = 0;
      const reasons = [];
      const candidateTokens = new Set(vibeTokens(candidate));

      favorites.forEach((favorite) => {
        if (candidate.type && favorite.type && candidate.type === favorite.type) {
          score += 3;
          addReason(reasons, "tipo");
        }

        if (candidate.mode && favorite.mode && candidate.mode === favorite.mode) {
          score += 2;
          addReason(reasons, "modo");
        }

        const timeDifference = Math.abs(timeAverage(candidate) - timeAverage(favorite));
        if (timeDifference <= 15) {
          score += 2;
          addReason(reasons, "duración");
        }

        if (candidate.level && favorite.level && candidate.level === favorite.level) {
          score += 1;
          addReason(reasons, "dificultad");
        }

        if (rangesOverlap(candidate.min, candidate.max, favorite.min, favorite.max)) {
          score += 1;
          addReason(reasons, "cantidad de jugadores");
        }

        const sharedWords = vibeTokens(favorite).filter((word) => candidateTokens.has(word));
        if (sharedWords.length > 0) {
          score += Math.min(2, sharedWords.length);
          addReason(reasons, "estilo de juego");
        }
      });

      if (Number(players) >= Number(candidate.min) && Number(players) <= Number(candidate.max)) {
        score += 1;
        addReason(reasons, `compatible con ${players}`);
      }

      return {
        ...candidate,
        recommendationScore: score,
        recommendationReasons: reasons.slice(0, 4)
      };
    })
    .filter((game) => game.recommendationScore > 0)
    .sort((a, b) => b.recommendationScore - a.recommendationScore || a.name.localeCompare(b.name))
    .slice(0, limit);
}
