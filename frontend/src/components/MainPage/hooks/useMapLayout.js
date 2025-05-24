import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { MAP_CONFIG } from '../constants';

export const useMapLayout = () => {
  const mapRef = useRef(null);
  const [actualContainerSize, setActualContainerSize] = useState({ 
    width: 0, 
    height: 0 
  });

  const theoreticalDimensions = useMemo(() => {
    const { maxMapWidth, maxMapHeight } = MAP_CONFIG;
    
    return { 
      width: maxMapWidth, 
      height: maxMapHeight 
    };
  }, []);

  const measureContainer = useCallback(() => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      
      if (rect.width > 0 && rect.height > 0) {
        setActualContainerSize({ 
          width: rect.width, 
          height: rect.height 
        });
      }
    }
  }, []);

  useEffect(() => {
    const measureWithDelay = () => {
      measureContainer();
      
      setTimeout(measureContainer, 100);
      
      setTimeout(measureContainer, 300);
    };

    measureWithDelay();
    
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(measureContainer, MAP_CONFIG.resizeDebounceMs);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [measureContainer]);

  const imagePosition = useMemo(() => {
    const { width: containerWidth, height: containerHeight } = actualContainerSize;
    const { imageWidth, imageHeight } = MAP_CONFIG;
    const imageRatio = imageWidth / imageHeight;
    
    const fallbackWidth = theoreticalDimensions.width;
    const fallbackHeight = theoreticalDimensions.height;
    
    const finalWidth = containerWidth > 0 ? containerWidth : fallbackWidth;
    const finalHeight = containerHeight > 0 ? containerHeight : fallbackHeight;
    
    if (finalWidth === 0 || finalHeight === 0) {
      return {
        renderedWidth: 0,
        renderedHeight: 0,
        offsetX: 0,
        offsetY: 0,
        isReady: false
      };
    }
    
    const containerRatio = finalWidth / finalHeight;
    
    if (imageRatio > containerRatio) {
      const renderedHeight = finalHeight;
      const renderedWidth = renderedHeight * imageRatio;
      const offsetX = (renderedWidth - finalWidth) / 2;
      
      return {
        renderedWidth,
        renderedHeight,
        offsetX,
        offsetY: 0,
        isReady: true
      };
    } else {
      const renderedWidth = finalWidth;
      const renderedHeight = renderedWidth / imageRatio;
      const offsetY = (renderedHeight - finalHeight) / 2;
      
      return {
        renderedWidth,
        renderedHeight,
        offsetX: 0,
        offsetY,
        isReady: true
      };
    }
  }, [actualContainerSize, theoreticalDimensions]);

  const convertCoordinates = useCallback((bottomPercent, leftPercent) => {
    const finalWidth = actualContainerSize.width > 0 ? actualContainerSize.width : theoreticalDimensions.width;
    const finalHeight = actualContainerSize.height > 0 ? actualContainerSize.height : theoreticalDimensions.height;
    
    if (!imagePosition.isReady || finalWidth === 0 || finalHeight === 0) {
      return { bottom: bottomPercent, left: leftPercent };
    }
    
    const imageX = (leftPercent / 100) * imagePosition.renderedWidth;
    const imageY = (bottomPercent / 100) * imagePosition.renderedHeight;
    
    const containerX = imageX - imagePosition.offsetX;
    const containerY = imageY - imagePosition.offsetY;
    
    const adjustedLeftPercent = (containerX / finalWidth) * 100;
    const adjustedBottomPercent = (containerY / finalHeight) * 100;
    
    const clampedLeft = Math.max(0, Math.min(100, adjustedLeftPercent));
    const clampedBottom = Math.max(0, Math.min(100, adjustedBottomPercent));
    
    return {
      bottom: clampedBottom,
      left: clampedLeft
    };
  }, [actualContainerSize, imagePosition, theoreticalDimensions]);

  return {
    mapRef,
    theoreticalDimensions,
    actualContainerSize,
    imagePosition,
    convertCoordinates,
    isLayoutReady: true,
    measureContainer
  };
}; 