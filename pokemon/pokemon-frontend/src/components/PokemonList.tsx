import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Empty, Input } from 'antd';
import styled from 'styled-components';
import PokemonCard from './PokemonCard';
import axios from 'axios';

const { Search } = Input;

const Container = styled.div`
  padding: 24px;
`;

const SearchContainer = styled.div`
  margin-bottom: 24px;
  max-width: 400px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

interface Pokemon {
  pokemon_id: number;
  name: string;
  name_en: string;
  image_url: string;
  types: Array<{
    type: {
      name: string;
      color: string;
    };
    slot: number;
  }>;
}

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/pokemon/');
        setPokemons(response.data.results);
        setFilteredPokemons(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('加载宝可梦数据失败');
        setLoading(false);
        console.error('Error fetching pokemons:', err);
      }
    };

    fetchPokemons();
  }, []);

  // 搜索过滤功能
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.pokemon_id.toString().includes(searchTerm)
      );
      setFilteredPokemons(filtered);
    }
  }, [searchTerm, pokemons]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handlePokemonClick = (pokemon: Pokemon) => {
    // 处理宝可梦点击事件，可以跳转到详情页
    console.log('Clicked pokemon:', pokemon);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  if (error) {
    return <Empty description={error} />;
  }

  return (
    <Container>
      <SearchContainer>
        <Search
          placeholder="搜索宝可梦名称或编号..."
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </SearchContainer>
      
      {filteredPokemons.length === 0 ? (
        <Empty description="没有找到匹配的宝可梦" />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredPokemons.map((pokemon) => (
            <Col key={pokemon.pokemon_id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <PokemonCard
                pokemon={pokemon}
                onClick={handlePokemonClick}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PokemonList; 