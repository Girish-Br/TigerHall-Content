import React from 'react';
import { Box, span, Image, Flex, IconButton } from '@chakra-ui/react';
import { FaShareAlt, FaBookmark } from 'react-icons/fa';
import '../styling/ContentCard.css'; // Ensure this path is correct
import { useResizeImage } from '../hooks/useResizeImage';

interface ContentCardProps {
    title: string;
    imageUri: string;
    categories: { name: string }[];
    experts: { firstName: string; lastName: string; title: string; company: string }[];
}

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const ContentCard: React.FC<ContentCardProps> = ({ title, imageUri, categories, experts }) => {

    const categoryNames = categories.map(cat => capitalize(cat.name)).join(', ');
    const resizedImageUri = useResizeImage(imageUri, 320, 200);

    return (
        <Box className="content-card" borderWidth="1px" borderRadius="lg" overflow="hidden">
            {imageUri &&
                <Box className="content-image-container">
                    <Image src={resizedImageUri} alt={title} className="content-image" />
                </Box>
            }
            <Box className='content-body'>
                <Box className="content-categories">
                    {categoryNames ? (
                        <span className="content-category">
                            {categoryNames}
                        </span>
                    ) : (
                        <span>No Categories</span>
                    )}
                </Box>
                <span className="content-title" fontWeight="bold" fontSize="xl" mb="2">
                    {capitalize(title)}
                </span>
                <Box className="content-experts">
                    {experts.length > 0 ? (
                        experts.map((exp, index) => (
                            <div>
                                <h1 key={index} className="content-expert">
                                    {capitalize(exp.firstName)} {capitalize(exp.lastName)}
                                </h1>
                                <h3 key={index} className="content-expert">
                                    {exp.company}
                                </h3>
                            </div>
                        ))
                    ) : (
                        <span>No Experts</span>
                    )}
                </Box>
            </Box>
            <Box>
                <Flex className="card-actions" justifyContent="flex-end">
                    <IconButton
                        icon={<FaShareAlt />}
                        aria-label="Share"
                        mr="2"
                        color="orange"
                        variant="outline"
                    />
                    <IconButton
                        icon={<FaBookmark />}
                        aria-label="Bookmark"
                        color="orange"
                        variant="outline"
                    />
                </Flex>
            </Box>
        </Box>
    )
}

export default ContentCard;
