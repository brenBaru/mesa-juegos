# Roll For Game - Refactor etapa 1

Este paquete reorganiza `src/App.jsx` sin cambiar comportamiento.

## Qué se movió

- Datos base: `src/data/initialGames.js`
- Opciones/config: `src/data/options.js`
- Utils de juegos: `src/utils/gameUtils.js`
- Utils de catálogo: `src/utils/catalogUtils.js`
- Marca/íconos propios: `src/components/brand/*`
- Componentes UI chicos: `src/components/ui/*`
- Login: `src/screens/LoginScreen.jsx`

## Qué NO se movió todavía

Las pantallas Home, Detail, Add e Import siguen dentro de `App.jsx` para reducir riesgo. Si esta etapa compila bien, la siguiente etapa es separar `screens/HomeScreen.jsx`, `screens/DetailScreen.jsx`, `screens/AddGameScreen.jsx` e `screens/ImportScreen.jsx`.

## Cómo aplicar

1. Hacé backup o commit de tu versión actual.
2. Copiá el contenido de esta carpeta sobre tu proyecto respetando carpetas.
3. Verificá que `public/catalog.json` siga en `public/catalog.json`.
4. Corré:

```bash
npm run dev
```

5. Si funciona:

```bash
git add src
git commit -m "refactorizo app en modulos etapa 1"
git push
```
