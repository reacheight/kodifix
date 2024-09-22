import React, { useEffect } from 'react';

export const YandexCallback = () => {
  useEffect(() => {
    if (window.YaSendSuggestToken) {
      console.log("yes send token");
      window.YaSendSuggestToken(
        'https://kodifix.ru', 
        {
          flag: true
        }
      );
    }
  }, []);

  return (<div></div>)
}