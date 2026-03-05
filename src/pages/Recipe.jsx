import styled from "styled-components";
import { RecipeTemplate } from "../components/templates/RecipeTemplate";

export function Recipe() {
  return (
    <Container>
      <RecipeTemplate />
    </Container>
  );
}
const Container = styled.div``;
