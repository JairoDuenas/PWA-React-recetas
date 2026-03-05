import styled from "styled-components";
import { TimerTemplate } from "../components/templates/TimerTemplate";

export function Timer() {
  return (
    <Container>
      <TimerTemplate />
    </Container>
  );
}
const Container = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;
