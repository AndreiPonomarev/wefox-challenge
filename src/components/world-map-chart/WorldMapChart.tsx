import React, { useState, useEffect } from 'react';
import { geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import { useAnimationFrame } from '../../app/hooks';
import { useGetMapQuery } from '../../store/mapApi';

import { MapPoint } from '../map-point/MapPoint';
import { Post } from '../../types';

import styles from './WorldMapChart.module.css';
import { Box, Modal, Typography } from '@mui/material';

const uuid = require('react-uuid');
const scale: number = 250;
const cx: number = 400;
const cy: number = 150;
const initRotation: number = 0;

interface Props {
  posts?: Post[];
}

export const WorldMapChart: React.FC<Props> = ({ posts }) => {
  const [geographies, setGeographies] = useState<
    [] | Array<Feature<Geometry | null>>
  >([]);
  const [rotation, setRotation] = useState<number>(initRotation);
  const [isRotate, setIsRotate] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const { data: mapData, error, isLoading } = useGetMapQuery();

  useEffect(() => {
    if (mapData) {
      const mapFeatures: Array<Feature<Geometry | null>> = (
        feature(
          mapData,
          mapData.objects.countries
        ) as unknown as FeatureCollection
      ).features;
      setGeographies(mapFeatures);
    }
  }, [mapData]);

  const projection = geoOrthographic()
    .scale(scale)
    .translate([cx, cy])
    .rotate([rotation, 0]);

  useAnimationFrame(() => {
    if (isRotate) {
      let newRotation = rotation;
      if (rotation >= 360) {
        newRotation = rotation - 360;
      }
      setRotation(newRotation + 0.2);
    }
  });

  const handleAutoRotation = (enter: boolean) => {
    setIsRotate(enter);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    setIsRotate(false)
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsRotate(true)
  };

  const handleManualRotation = (e: any) => {
    if(isDragging){
      setIsRotate(false)
      setRotation(rotation + e.movementX);
    }
  };


  return (
    <div className={styles.root}>
      <svg
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleManualRotation}
        width={scale * 2}
        height={scale * 2}
        viewBox="0 0 700 350"
      >
        <g>
          <circle fill="#ddd" cx={cx} cy={cy} r={scale} />
        </g>
        <g>
          {(geographies as []).map((d, i) => (
            <path
              key={`path-${uuid()}`}
              d={geoPath().projection(projection)(d) as string}
              fill={`rgba(38,50,56,${
                (1 / (geographies ? geographies.length : 0)) * i
              })`}
              stroke="aliceblue"
              strokeWidth={0.5}
            />
          ))}
        </g>
        <g>
          {posts?.map((post) => (
            <MapPoint
              key={`point-${post.id}`}
              post={post}
              projection={projection}
              handleAutoRotation={handleAutoRotation}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
