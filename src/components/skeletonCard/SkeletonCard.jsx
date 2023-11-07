import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={180}
    height={394}
    viewBox="0 0 180 394"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="433" rx="10" ry="10" width="95" height="30" />
    <rect x="127" y="418" rx="20" ry="20" width="152" height="45" />
    <rect x="116" y="140" rx="0" ry="0" width="1" height="0" />
    <rect x="0" y="0" rx="0" ry="0" width="180" height="280" />
    <rect x="-1" y="299" rx="0" ry="0" width="136" height="24" />
    <rect x="155" y="299" rx="0" ry="0" width="20" height="24" />
    <rect x="-1" y="344" rx="0" ry="0" width="107" height="20" />
    <rect x="125" y="344" rx="0" ry="0" width="50" height="24" />
  </ContentLoader>
);

export default MyLoader;
