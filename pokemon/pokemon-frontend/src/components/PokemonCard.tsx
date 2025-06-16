import React from 'react';
import { Card, Tag, Typography, Space } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;

// 使用styled-components创建样式组件
const StyledCard = styled(Card)`
  width: 280px;
  margin: 16px;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
`;

const TypeTag = styled(Tag)`
  margin: 4px;
  padding: 4px 8px;
  font-size: 14px;
`;

interface PokemonType {
  name: string;
  color: string;
}

interface Pokemon {
  pokemon_id: number;
  name: string;
  name_en: string;
  image_url: string;
  types: Array<{
    type: PokemonType;
    slot: number;
  }>;
}

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(pokemon);
    }
  };

  return (
    <StyledCard
      hoverable
      onClick={handleClick}
      cover={
        <PokemonImage
          src={pokemon.image_url}
          alt={pokemon.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
          }}
        />
      }
    >
      <Card.Meta
        title={
          <Space direction="vertical" size={0} style={{ width: '100%' }}>
            <Title level={4} style={{ margin: 0 }}>
              {pokemon.name}
            </Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              #{String(pokemon.pokemon_id).padStart(3, '0')} {pokemon.name_en}
            </Text>
          </Space>
        }
        description={
          <Space wrap style={{ marginTop: 8 }}>
            {pokemon.types.map(({ type }) => (
              <TypeTag
                key={type.name}
                color={type.color}
                style={{ backgroundColor: type.color, color: 'white' }}
              >
                {type.name}
              </TypeTag>
            ))}
          </Space>
        }
      />
    </StyledCard>
  );
};

export default PokemonCard; 