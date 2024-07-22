import React, { useEffect, useState, useCallback } from 'react';
import ContentCard from './ContentCard';
import Loader from './Loader';
import { Box, Input, Flex, Heading, Image, Center } from '@chakra-ui/react';
import useDebounce from '../hooks/useDebounce';
import tigerhallIcon from "../assets/tigerhall-icon.svg"

interface Content {
  id: string;
  name: string;
  image: { uri: string };
  categories: { name: string }[];
  experts: { firstName: string; lastName: string; title: string; company: string }[];
}

const ContentList: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchContents = useCallback(async (page: number, term: string) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.tigerhall.net/v2/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              contentCards(filter: {limit: 20, keywords: "${term}", types: [PODCAST], offset: ${page * 2 - 2}}) {
                edges {
                  ... on Podcast {
                    name
                    image {
                      uri
                    }
                    categories {
                      name
                    }
                    experts {
                      firstName
                      lastName
                      title
                      company
                    }
                  }
                }
              }
            }
          `,
        }),
      });
      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      const newContents = result.data.contentCards.edges;
      setContents(prev => [...prev, ...newContents]);
      setHasMore(newContents.length > 0);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContents(page, debouncedSearchTerm);
  }, [page, debouncedSearchTerm, fetchContents]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        // Trigger fetch when scrolled near the bottom
        if (!loading && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <Box p="4">
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Box justifyContent="flex-start">
          <Image src={tigerhallIcon} alt="Tigerhall icon" className="tigerhall-icon" />
        </Box>
        <Box flex="1" textAlign="center" alignContent="center">
          <Heading
            as="h1"
            size="lg"
            color="orange.500" // Orange color
            mb="4"
            fontWeight="bold" // Bold font weight
          >
            TigerHall Content
          </Heading>
        </Box>
      </Box>
      <Box className="search-box-container">
        <Input
          placeholder="Search content..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='search-box'
          width="200px"
        />
      </Box>
      {loading &&
        <Flex justify="center">
          <Loader />
        </Flex>}
      <Flex direction="row" wrap="wrap" justify="center" mt="4">
        {contents.map(content => (
          <ContentCard
            key={content.id}
            title={content.name}
            imageUri={content.image.uri}
            categories={content.categories}
            experts={content.experts}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default ContentList;