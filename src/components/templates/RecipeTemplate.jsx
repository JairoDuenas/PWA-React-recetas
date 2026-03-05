import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecipe } from "../../hooks/useRecipes";
import { RecipeIngredients } from "../../components/organismos/RecipeIngredients";
import { RecipeInstructions } from "../../components/organismos/RecipeInstructions";
import {
  LoadingScreen,
  ErrorScreen,
} from "../../components/organismos/LoadingScreen";

export function RecipeTemplate() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { recipe, loading, error } = useRecipe(recipeId);

  if (loading) return <LoadingScreen />;
  if (error || !recipe)
    return <ErrorScreen message="No se encontró la receta" />;

  const compartir = (e) => {
    e.preventDefault();
    if (!navigator.share)
      return alert("Tu browser no soporta la Web Share API");
    navigator.share({
      title: recipe.name,
      text: `Mira esta receta: ${recipe.name}`,
      url: document.location.href,
    });
  };

  return (
    <Page>
      {/* Hero con imagen de fondo */}
      <Hero style={{ backgroundImage: `url(${recipe.thumbnail})` }}>
        <HeroOverlay />
        <HeroContent>
          {recipe.origin && <Origin>{recipe.origin}</Origin>}
          <RecipeTitle>{recipe.name}</RecipeTitle>
          {recipe.category && <CategoryTag>{recipe.category}</CategoryTag>}
          <HeroActions>
            <BackBtn onClick={() => navigate(-1)}>← Volver</BackBtn>
            <ShareBtn onClick={compartir}>Compartir ↗</ShareBtn>
          </HeroActions>
        </HeroContent>
      </Hero>

      <Body>
        {/* Tags */}
        {recipe.tags.length > 0 && (
          <TagsRow>
            {recipe.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagsRow>
        )}

        {/* Contenido en dos columnas */}
        <TwoCol>
          <RecipeIngredients ingredients={recipe.ingredients} />
          <RightCol>
            <RecipeInstructions instructions={recipe.instructions} />
            {recipe.youtube && (
              <YoutubeLink
                href={recipe.youtube}
                target="_blank"
                rel="noreferrer"
              >
                ▶ Ver en YouTube
              </YoutubeLink>
            )}
          </RightCol>
        </TwoCol>
      </Body>
    </Page>
  );
}

const Page = styled.div`
  padding-top: 80px;
`;

const Hero = styled.div`
  position: relative;
  height: 52vh;
  min-height: 340px;
  max-width: 1200px;
  margin: 0 auto;
  background-size: cover;
  background-position: 50% 50%;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(13, 12, 10, 0.15) 0%,
    rgba(13, 12, 10, 0.88) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 40px;

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`;

const Origin = styled.p`
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 300;
  margin-bottom: 10px;
`;

const RecipeTitle = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(36px, 6vw, 72px);
  font-style: italic;
  font-weight: 300;
  color: var(--fg);
  line-height: 1;
  margin-bottom: 16px;
`;

const CategoryTag = styled.span`
  display: inline-block;
  border: 1px solid var(--gold);
  color: var(--gold);
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 4px 12px;
  margin-bottom: 24px;
  font-weight: 300;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const BtnBase = styled.button`
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 10px 24px;
  border: 1px solid;
  transition:
    background 0.2s,
    color 0.2s;
  font-weight: 400;
`;

const BackBtn = styled(BtnBase)`
  background: rgba(13, 12, 10, 0.5);
  border-color: rgba(240, 232, 212, 0.3);
  color: var(--fg);
  &:hover {
    border-color: var(--fg);
  }
`;

const ShareBtn = styled(BtnBase)`
  background: var(--gold);
  border-color: var(--gold);
  color: var(--bg);
  &:hover {
    background: transparent;
    color: var(--gold);
  }
`;

const Body = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 24px 40px;
  border-bottom: 1px solid var(--border);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Tag = styled.span`
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--fg-dim);
  border: 1px solid var(--border);
  padding: 4px 10px;
  font-weight: 300;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const RightCol = styled.div``;

const YoutubeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 40px 48px;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  border-bottom: 1px solid var(--gold);
  padding-bottom: 2px;
  font-weight: 300;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.65;
  }

  @media (max-width: 768px) {
    margin: 0 20px 40px;
  }
`;
