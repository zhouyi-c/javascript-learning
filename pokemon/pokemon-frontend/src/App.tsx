import React from 'react';
import { Layout, Typography } from 'antd';
import styled from 'styled-components';
import PokemonList from './components/PokemonList';

const { Header, Content } = Layout;
const { Title } = Typography;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;

const StyledContent = styled(Content)`
  background: #f0f2f5;
`;

const App: React.FC = () => {
  return (
    <StyledLayout>
      <StyledHeader>
        <Title level={2} style={{ margin: 0 }}>宝可梦图鉴</Title>
      </StyledHeader>
      <StyledContent>
        <PokemonList />
      </StyledContent>
    </StyledLayout>
  );
};

export default App;
