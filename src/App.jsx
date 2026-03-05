import styled from "styled-components";
import { MyRoutes } from "./routers/routes";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <Container>
        <GlobalStyles />
        <MyRoutes />
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  overflow-x: hidden;
`;

export default App;
