import React from 'react';
import '../styling/ContentCard.css'; // Import the CSS file

interface ContentCardProps {
  title: string;
  description: string;
  imageUri?: string;
  categories?: string[];
  experts?: {
    firstName: string;
    lastName: string;
    title: string;
    company: string;
  }[];
}

const ContentCard: React.FC<ContentCardProps> = ({ title, description, imageUri, categories = [], experts = [] }) => (
  <div className="content-card">
    {imageUri && <img src={imageUri} alt={title} />}
    <div className="title">{title}</div>
    <div className="description">{description}</div>
    {categories.length > 0 && (
      <div className="categories">
        {categories.map((category, index) => (
          <span key={index} className="category-tag">{category}</span>
        ))}
      </div>
    )}
    {experts.length > 0 && (
      <div className="experts">
        {experts.map((expert, index) => (
          <div key={index} className="expert">
            <div className="expert-name">
              {expert.firstName} {expert.lastName}
            </div>
            <div className="expert-company">
              {expert.company}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ContentCard;