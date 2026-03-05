import styled, { keyframes } from "styled-components";

export function LoadingScreen() {
  return (
    <Wrap>
      <Spinner />
      <Label>Cargando recetas</Label>
    </Wrap>
  );
}

export function ErrorScreen({ message = "Ocurrió un problema" }) {
  return (
    <Wrap>
      <ErrorSymbol>✦</ErrorSymbol>
      <Title>Sin conexión</Title>
      <Label>{message}</Label>
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
`;

const spin = keyframes`to { transform: rotate(360deg); }`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--border);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

const ErrorSymbol = styled.span`
  font-size: 36px;
  color: var(--gold);
`;

const Title = styled.p`
  font-family: var(--font-display);
  font-size: 32px;
  font-style: italic;
  font-weight: 300;
  color: var(--fg);
`;

const Label = styled.p`
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--fg-dim);
`;
