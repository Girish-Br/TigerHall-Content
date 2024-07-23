import React, { useEffect, useState, useCallback } from 'react';
import ContentCard from './ContentCard';
import Loader from './Loader';
import { Box, Input, Flex, Heading, Image } from '@chakra-ui/react';
import useDebounce from '../hooks/useDebounce';
import tigerhallIcon from "../assets/tigerhall-icon.svg";

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
              contentCards(filter: {limit: 40, keywords: "${term}", types: [PODCAST], offset: ${page * 1 - 1}}) {
                edges {
                  ... on Podcast {
                    id
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
      setContents(prev => page === 1 ? newContents : [...prev, ...newContents]);
      setHasMore(newContents.length > 0);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setContents([]); // Clear contents when search term changes
    setPage(1); // Reset page to 1 when search term changes
    fetchContents(1, debouncedSearchTerm); // Fetch new search results from page 1
  }, [debouncedSearchTerm, fetchContents]);

  useEffect(() => {
    if (page > 1) {
      fetchContents(page, debouncedSearchTerm);
    }
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
    <Box p="5" m="5">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb="4"
        flexDirection={['column', 'column', 'row']} // Stack vertically on small screens
      >
        <Flex alignItems="center" mb={[2, 2, 0]}>
          <Image src={tigerhallIcon} alt="Tigerhall icon" className="tigerhall-icon" mr="2" />
          <Heading as="h1" size="md" color="orange.500">
            TIGERHALL
          </Heading>
        </Flex>
        <Box flex="1" textAlign="center" mb={[2, 2, 0]}>
          <Heading size="md" color="orange.500">
            UI Developer work
          </Heading>
        </Box>
        <Input
          placeholder="Search content..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-box"
          width="250px"
          textColor="white"
        />
      </Flex>
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
      {loading && (
        <Flex justify="center" mt="4">
          <Loader />
        </Flex>
      )}
    </Box>
  );
};

export default ContentList;
