import { Link } from "react-router-dom";
import styled from "styled-components";

export function RecipeCard({ recipe }) {
  return (
    <Card to={`/recipe/${recipe.id}`}>
      <ImageWrap>
        <Img src={recipe.thumbnail} alt={recipe.name} loading="lazy" />
        <ImgOverlay />
        {recipe.category && <CategoryBadge>{recipe.category}</CategoryBadge>}
      </ImageWrap>
      <Info>
        <RecipeName>{recipe.name}</RecipeName>
        {recipe.origin && <Origin>{recipe.origin}</Origin>}
      </Info>
    </Card>
  );
}

const Card = styled(Link)`
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border);
  overflow: hidden;
  transition:
    transform 0.35s,
    border-color 0.35s;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--gold);
  }
  &:hover img {
    transform: scale(1.06);
  }
`;

const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  height: 210px;
  max-height: 260px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
`;

const ImgOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(13, 12, 10, 0.65) 0%,
    transparent 55%
  );
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  background: var(--gold);
  color: var(--bg);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 4px 10px;
`;

const Info = styled.div`
  padding: 20px 24px 24px;
  border-top: 1px solid var(--border);
`;

const RecipeName = styled.h2`
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  line-height: 1.2;
  color: var(--fg);
  margin-bottom: 6px;
`;

const Origin = styled.p`
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 300;
`;
