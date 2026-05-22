export function timeText(game) {
  return game.timeMin === game.timeMax ? `${game.timeMin} min` : `${game.timeMin}–${game.timeMax} min`;
}

export function timeLabel(game) {
  if (game.timeMax <= 25) return "Rápido";
  if (game.timeMax <= 45) return "Medio";
  return "Largo";
}

export function getPlayerSpecificSetup(game, players) {
  if (!game.playerSetups) return [];
  const match = game.playerSetups.find((rule) => players >= rule.min && players <= rule.max);
  return match ? match.steps : [];
}

