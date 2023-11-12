import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonCard = (props) => (
  <ContentLoader
    speed={2}
    width={180}
    height={394}
    viewBox="0 0 180 394"
    backgroundColor="#636363"
    foregroundColor="#a3a3a3"
    {...props}>
    <rect x="0" y="0" rx="7" ry="7" width="180" height="280" />
    <rect x="0" y="300" rx="7" ry="7" width="136" height="24" />
    <rect x="160" y="300" rx="3" ry="3" width="20" height="24" />
    <rect x="0" y="374" rx="7" ry="7" width="107" height="20" />
    <rect x="130" y="370" rx="3" ry="3" width="50" height="24" />
  </ContentLoader>
);

export default SkeletonCard;
