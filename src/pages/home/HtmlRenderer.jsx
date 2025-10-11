import React, { useEffect, useState } from 'react';

// import htmlContent from 'trade.html';

function HtmlRenderer({htmlContent, css}) {
  // const [htmlContent, setHtmlContent] = useState('');

  // useEffect(() => {
  //   fetch('trade.html')
  //     .then(res => res.text())
  //     .then(setHtmlContent)
  //     .catch(console.error);
  // }, []);

  // return (
  //   <div className='' style={{padding: '20px', backgroundColor: '#fff'}}>
  //       <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  //   </div>
  // );

  return (
     <div className='' style={{padding: '6px', backgroundColor: '#fff'}}>
      {/* <iframe
        src="/trade.html"
        width="100%"
        height="1200"
        title="Trade Dashboard"
        style={{
          border: 'none',
          overflow: 'hidden',
          scrollbarWidth: 'none',       // Firefox
          msOverflowStyle: 'none'       // IE/Edge
        }}
        scrolling="no" // For legacy browsers
      /> */}

      <iframe
          title="Trade Dashboard"
          style={{ width: '100%', height: '1200px', overflow: 'hidden', border: 'none', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          scrolling='no'
          srcDoc={`
              <html>
                  <head>
                      <style>${css || ""}</style>
                  </head>
                  <body>${htmlContent || ""}</body>
              </html>
          `}
      />
     </div>
  );
}

export default HtmlRenderer;
