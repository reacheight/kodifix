import React, { useEffect } from 'react';

export const YandexCallback = () => {
  useEffect(() => {
    if (window.YaSendSuggestToken) {
      window.YaSendSuggestToken(
        'https://codemagics.ru', 
        {
          flag: true
        }
      );
    }
  }, []);

  return (<div></div>)
}