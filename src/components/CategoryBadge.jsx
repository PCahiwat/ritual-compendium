import React from 'react';
import { formatCategory } from '../utils/helpers';

export default function CategoryBadge({ category }) {
  return (
    <span className={`category-badge ${category}`}>
      {formatCategory(category)}
    </span>
  );
}
