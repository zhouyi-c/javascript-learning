import React, { useState } from 'react';
import { Card, Tag, Typography, Space, Modal, Descriptions, Image } from 'antd';
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

const DetailImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    setIsModalVisible(true);
    if (onClick) {
      onClick(pokemon);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
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

      <Modal
        title={
          <Space>
            <span>{pokemon.name}</span>
            <Text type="secondary">#{String(pokemon.pokemon_id).padStart(3, '0')}</Text>
          </Space>
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <DetailImage
            src={pokemon.image_url}
            alt={pokemon.name}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
            }}
          />
        </div>
        
        <Descriptions column={1} bordered>
          <Descriptions.Item label="中文名称">{pokemon.name}</Descriptions.Item>
          <Descriptions.Item label="英文名称">{pokemon.name_en}</Descriptions.Item>
          <Descriptions.Item label="宝可梦编号">#{String(pokemon.pokemon_id).padStart(3, '0')}</Descriptions.Item>
          <Descriptions.Item label="属性类型">
            <Space wrap>
              {pokemon.types.map(({ type, slot }) => (
                <TypeTag
                  key={type.name}
                  color={type.color}
                  style={{ backgroundColor: type.color, color: 'white' }}
                >
                  {type.name} (槽位 {slot})
                </TypeTag>
              ))}
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default PokemonCard; 