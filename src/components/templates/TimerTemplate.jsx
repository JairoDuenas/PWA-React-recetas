import { useState, useRef } from "react";
import styled from "styled-components";

export function TimerTemplate() {
  const [minutes, setMinutes] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      return alert("Tu browser no soporta notificaciones");
    }

    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }

    if (Notification.permission === "denied") {
      return alert("Bloqueaste las notificaciones :(");
    }

    if (Notification.permission !== "granted") return;

    const total = minutes * 60;
    setTimeLeft(total);
    setRunning(true);

    let remaining = total;
    intervalRef.current = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        setRunning(false);
        showNotification();
      }
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTimeLeft(0);
  };

  const showNotification = async () => {
    const registration = await navigator.serviceWorker?.getRegistration();
    if (!registration) return alert("¡Listo el timer! 🔔");
    registration.showNotification("Listo el timer", {
      body: "Ding ding ding 🔔",
      icon: "/icon.png",
    });
  };

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const progress = running
    ? ((minutes * 60 - timeLeft) / (minutes * 60)) * 100
    : 0;

  return (
    <Wrap>
      <Title>Timer de Cocina</Title>
      <GoldRule />

      <Ring $progress={progress}>
        <RingCenter>
          <TimeDisplay>
            {running ? fmt(timeLeft) : `${String(minutes).padStart(2, "0")}:00`}
          </TimeDisplay>
          <TimeLabel>{running ? "restantes" : "minutos"}</TimeLabel>
        </RingCenter>
      </Ring>

      {!running && (
        <InputRow>
          <MinInput
            type="number"
            min="1"
            max="999"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
          <InputLabel>min</InputLabel>
        </InputRow>
      )}

      <Actions>
        {!running ? (
          <StartBtn onClick={start}>Iniciar</StartBtn>
        ) : (
          <StopBtn onClick={stop}>Detener</StopBtn>
        )}
      </Actions>
    </Wrap>
  );
}

/* ── styled ── */
const Wrap = styled.div`
  max-width: 380px;
  margin: 0 auto;
  padding: 60px 32px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: 44px;
  font-style: italic;
  font-weight: 300;
  color: var(--fg);
  text-align: center;
  line-height: 1;
`;

const GoldRule = styled.div`
  width: 40px;
  height: 1px;
  background: var(--gold);
`;

const Ring = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  padding: 6px;
  background: conic-gradient(
    var(--gold) ${({ $progress }) => $progress}%,
    var(--border) ${({ $progress }) => $progress}%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.6s;
`;

const RingCenter = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--bg-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const TimeDisplay = styled.span`
  font-family: var(--font-display);
  font-size: 50px;
  font-weight: 300;
  color: var(--fg);
  line-height: 1;
`;

const TimeLabel = styled.span`
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--fg-dim);
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MinInput = styled.input`
  width: 84px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--fg);
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 300;
  text-align: center;
  padding: 8px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--gold);
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }
`;

const InputLabel = styled.span`
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--fg-dim);
`;

const BtnBase = styled.button`
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 14px 44px;
  border: 1px solid var(--gold);
  transition:
    background 0.2s,
    color 0.2s,
    transform 0.15s;
  &:active {
    transform: scale(0.97);
  }
`;

const StartBtn = styled(BtnBase)`
  background: var(--gold);
  color: var(--bg);
  &:hover {
    background: transparent;
    color: var(--gold);
  }
`;

const StopBtn = styled(BtnBase)`
  background: transparent;
  color: var(--gold);
  &:hover {
    background: var(--gold);
    color: var(--bg);
  }
`;
