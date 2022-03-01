import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  color: var(--gray);

  div {
    text-align: center;
    cursor: pointer;
    margin: 8px 0;
  }

  div:hover {
    color: var(--white);
  }
`;

export const ProfileWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 52px;
    font-family: Open Sans;

    margin-bottom: 52px;
  }

  h2 {
    font-size: 22px;
    font-weigth: 500;
    color: inherit;
    transition: 0.3s;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
      margin-bottom: 12px;
    }
    h2 {
      font-size: 12px;
    }
  }
`;

export const ProfileImage = styled.img`
  width: 200px;
  margin: 8px 10px 0px 10px;
  transition: 0.3s;
  border: 2px solid transparent;

  &:hover {
    border-color: var(--white);
  }

  @media (max-width: 768px) {
    width: 100px;
  }
`;
