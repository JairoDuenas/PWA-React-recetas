import styled, { keyframes } from "styled-components";
import { useRecipes } from "../../hooks/useRecipes";
import { RecipeCard } from "../../components/organismos/RecipeCard";
import {
  LoadingScreen,
  ErrorScreen,
} from "../../components/organismos/LoadingScreen";

export function HomeTemplate() {
  const { recipes, loading, error } = useRecipes();

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message="No se pudieron cargar las recetas" />;

  return (
    <Page>
      <Hero>
        <HeroEyebrow>Cocina del mundo</HeroEyebrow>
        <HeroTitle>
          Recetas
          <br />
          <em>para inspirarte</em>
        </HeroTitle>
        <HeroRule />
        <HeroSub>{recipes.length} recetas disponibles</HeroSub>
      </Hero>

      <Grid>
        {recipes.map((recipe, i) => (
          <CardAnim key={recipe.id} $i={i}>
            <RecipeCard recipe={recipe} />
          </CardAnim>
        ))}
      </Grid>
    </Page>
  );
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  padding-top: 80px;
`;

const Hero = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 40px 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 60px 20px 40px;
  }
`;

const HeroEyebrow = styled.p`
  font-size: 11px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 300;
`;

const HeroTitle = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(52px, 9vw, 100px);
  font-weight: 300;
  line-height: 0.95;
  color: var(--fg);

  em {
    font-style: italic;
    color: var(--gold);
  }
`;

const HeroRule = styled.div`
  width: 48px;
  height: 1px;
  background: var(--gold);
  margin: 4px 0;
`;

const HeroSub = styled.p`
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--fg-dim);
  font-weight: 300;
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px 80px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    padding: 0 20px 60px;
    grid-template-columns: 1fr;
  }
`;

const CardAnim = styled.div`
  opacity: 0;
  animation: ${fadeUp} 0.5s ${({ $i }) => $i * 0.05}s ease forwards;
`;
