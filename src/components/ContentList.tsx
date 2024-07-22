import React, { useEffect, useState, useCallback } from 'react';
import ContentCard from './ContentCard';
import Loading from './Loading';
import { Box, Input, SimpleGrid } from '@chakra-ui/react';
import useDebounce from '../hooks/useDebounce';

interface Content {
  id: string;
  title: string;
  description: string;
  imageUri?: string;
  categories?: { name: string }[];
  experts?: {
    firstName: string;
    lastName: string;
    title: string;
    company: string;
  }[];
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
              contentCards(filter: {limit: 20, keywords: "${term}", types: [PODCAST]}) {
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
      setContents(prev => (page === 1 ? result.data.contentCards.edges : [...prev, ...result.data.contentCards.edges]));
      setHasMore(result.data.contentCards.edges.length > 0);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContents(1, debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchContents]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) {
        return;
      }
      setPage(prevPage => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchContents(page, debouncedSearchTerm);
    }
  }, [page, debouncedSearchTerm, fetchContents]);

  return (
    <Box p="4">
      <Input
        placeholder="Search content..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        mb="4"
      />
      {loading && <Loading />}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="4">
        {contents.map(content => (
          <ContentCard
            key={content.id}
            title={content.title}
            description={content.description}
            imageUri={content.image?.uri}
            categories={content.categories?.map(category => category.name)}
            experts={content.experts}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ContentList;