import styled from "styled-components";

export function RecipeInstructions({ instructions }) {
  return (
    <Section>
      <SectionTitle>Preparación</SectionTitle>
      <GoldRule />
      <Steps>
        {instructions.map((line, i) => (
          <Step key={i}>
            <StepNum>{String(i + 1).padStart(2, "0")}</StepNum>
            <StepText>{line}</StepText>
          </Step>
        ))}
      </Steps>
    </Section>
  );
}

const Section = styled.div`
  padding: 48px 40px;

  @media (max-width: 768px) {
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
  margin-bottom: 36px;
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
`;

const Step = styled.div`
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid var(--border);
  align-items: start;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 36px 1fr;
    gap: 14px;
  }
`;

const StepNum = styled.span`
  font-family: var(--font-display);
  font-size: 38px;
  font-weight: 300;
  color: var(--border);
  line-height: 1;
  padding-top: 3px;
`;

const StepText = styled.p`
  font-size: 15px;
  font-weight: 300;
  line-height: 1.85;
  color: var(--fg);
`;
