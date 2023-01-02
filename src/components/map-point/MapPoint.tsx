import Tooltip from '@mui/material/Tooltip';
import { GeoProjection } from 'd3-geo';
import React from 'react';
import { Post } from '../../types';
import { PostTooltip } from '../post-tooltip/PostTooltip';

interface Props {
  post: Post;
  projection: GeoProjection;
  handleRotation: (enter: boolean) => void;
}

export const MapPoint: React.FC<Props> = ({
  post,
  projection,
  handleRotation,
}) => {
  function returnProjectionValueWhenValid(long: number, lat: number) {
    const retVal: [number, number] | null = projection([long, lat]);

    if (retVal?.length) {
      return retVal;
    }
    return [0, 0];
  }

  const [cx, cy] = returnProjectionValueWhenValid(
    Number(post.long),
    Number(post.lat)
  );

  const handleMarkerClick = () => {
    console.log('!!click: ', post.id);
  };

  const handleMouseEnter = (enter: boolean) => () => {
    handleRotation(enter);
  };

  return (
    <Tooltip title={<PostTooltip post={post} />} placement="top" arrow>
      <circle
        cx={cx}
        cy={cy}
        r={10}
        fill="#E91E63"
        stroke="#FFFFFF"
        onClick={handleMarkerClick}
        onMouseEnter={handleMouseEnter(false)}
        onMouseLeave={handleMouseEnter(true)}
      />
    </Tooltip>
  );
};
