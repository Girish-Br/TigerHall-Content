import React from 'react';
import { Box, Text, Image, Flex, IconButton } from '@chakra-ui/react';
import { FaShareAlt, FaBookmark } from 'react-icons/fa';
import '../styling/ContentCard.css'; // Ensure this path is correct

interface ContentCardProps {
    title: string;
    imageUri: string;
    categories: { name: string }[];
    experts: { firstName: string; lastName: string; title: string; company: string }[];
}

const ContentCard: React.FC<ContentCardProps> = ({
    title = 'No Title',
    imageUri = '',
    categories = [],
    experts = [],
}) => (
    <Box className="content-card" borderWidth="1px" borderRadius="lg" overflow="hidden" m="4">
        {imageUri && <Image src={imageUri} alt={title} mb="4" className="content-image" />}
        <Box className='content-body'>
            <Text className="content-title" fontWeight="bold" fontSize="xl" mb="2">
                {title}
            </Text>
            <Box className="content-categories">
                {categories.length > 0 ? (
                    categories.map((cat, index) => (
                        <Text key={index} className="content-category">
                            {cat.name}
                        </Text>
                    ))
                ) : (
                    <Text>No Categories</Text>
                )}
            </Box>
            <Box className="content-experts">
                {experts.length > 0 ? (
                    experts.map((exp, index) => (
                        <Text key={index} className="content-expert">
                            {exp.firstName} {exp.lastName} - {exp.company || 'No Company'}
                        </Text>
                    ))
                ) : (
                    <Text>No Experts</Text>
                )}
            </Box>
        </Box>
        <Flex className="card-actions" justifyContent="flex-end">
            <IconButton
                icon={<FaShareAlt />}
                aria-label="Share"
                mr="2"
            />
            <IconButton
                icon={<FaBookmark />}
                aria-label="Bookmark"
            />
        </Flex>
    </Box>
);

export default ContentCard;
