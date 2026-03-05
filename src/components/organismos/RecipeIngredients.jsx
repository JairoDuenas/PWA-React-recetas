import styled from "styled-components";

export function RecipeIngredients({ ingredients }) {
  return (
    <Section>
      <SectionTitle>Ingredientes</SectionTitle>
      <GoldRule />
      <List>
        {ingredients.map((item, i) => (
          <Item key={i}>
            <Dot />
            <IngName>{item.ingredient}</IngName>
            <Measure>{item.measure}</Measure>
          </Item>
        ))}
      </List>
    </Section>
  );
}

const Section = styled.div`
  padding: 48px 40px;
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 32px 20px;
  }
`;

const SectionTitle = styled.h2`
  font-family: var(--font-display);
  font-size: 34px;
  font-style: italic;
  font-weight: 300;
  color: var(--fg);
  margin-bottom: 12px;
`;

const GoldRule = styled.div`
  width: 40px;
  height: 1px;
  background: var(--gold);
  margin-bottom: 28px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--gold);
  }
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gold);
  flex-shrink: 0;
`;

const IngName = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  color: var(--fg);
`;

const Measure = styled.span`
  font-size: 13px;
  color: var(--gold);
  font-weight: 300;
  white-space: nowrap;
`;
