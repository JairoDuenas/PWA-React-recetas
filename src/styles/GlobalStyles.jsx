import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:           #0d0c0a;
    --bg-card:      #161410;
    --bg-hover:     #1e1b16;
    --fg:           #f0e8d4;
    --fg-dim:       #7a7060;
    --gold:         #c8a44a;
    --gold-light:   #e6c878;
    --border:       #262218;
    --danger:       #9e2f27;
    --success:      #2e6e42;

    --font-display: 'Cormorant Garamond', serif;
    --font-body:    'Jost', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 300;
    line-height: 1.7;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  a    { color: inherit; text-decoration: none; }
  ul   { list-style: none; }
  button { cursor: pointer; font-family: var(--font-body); }
  input, textarea { font-family: var(--font-body); }

  ::selection { background: var(--gold); color: var(--bg); }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); }
`;
