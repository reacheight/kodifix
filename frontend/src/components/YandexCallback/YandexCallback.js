import React, { useEffect } from 'react';

export const YandexCallback = () => {
  useEffect(() => {
    if (window.YaSendSuggestToken) {
      console.log("yes send token");
      window.YaSendSuggestToken(
        'https://demo.kodifix.ru', 
        {
          flag: true
        }
      );
    }
  }, []);

  return (<div></div>)
}