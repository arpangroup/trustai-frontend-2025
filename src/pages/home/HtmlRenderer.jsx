import React, { useEffect, useState } from 'react';

// import htmlContent from 'trade.html';

function HtmlRenderer() {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch('trade.html')
      .then(res => res.text())
      .then(setHtmlContent)
      .catch(console.error);
  }, []);

  // return (
  //   <div className='' style={{padding: '20px', backgroundColor: '#fff'}}>
  //       <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  //   </div>
  // );

  return (
     <div className='' style={{padding: '6px', backgroundColor: '#fff'}}>
      <iframe
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
      />
     </div>
  );
}

export default HtmlRenderer;
