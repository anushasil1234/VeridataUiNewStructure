// import React, { useEffect, useRef } from 'react';
// import Mustache from 'mustache';
// const HtmlParser = ({ data, type }) => {
//   const templateRef = useRef(null);
//   useEffect(() => {
//     const fetchTemplate = async () => {
//       try {
//         let htmlmodule;
//         if (type === 'Consetnt') {
//           htmlmodule = require(`raw-loader!./consenttemplate.html`);
//         }
//         if (type === 'OfflineKyc') {
//           htmlmodule = require(`raw-loader!./offlineKycTemplate.html`);
//         }
//         if (type === 'CADELUA') {
//           htmlmodule = require(`raw-loader!./user_license.html`);
//         }
//         if (type === 'ADMELUA') {
//           htmlmodule = require(`raw-loader!./admin_license.html`);
//         }
//         var html = htmlmodule.default;
//         if (templateRef.current) {
//           const renderedHtml = Mustache.render(html, data);
//           templateRef.current.innerHTML = renderedHtml;
//         }
//       } catch (error) {
//         console.error('Error fetching or rendering template:', error);
//       }
//     };
//     fetchTemplate();
//   }, [data]);
//   return <div ref={templateRef} />;
// };
// export default HtmlParser;

import React, { useEffect, useRef } from 'react';
import Mustache from 'mustache';

const HtmlParser = ({ data, type }) => {
  const templateRef = useRef(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        let templatePath = '';

        // Set the correct template path based on type
        if (type === 'Consetnt') {
          templatePath = '/consenttemplate.html';
        }
        if (type === 'OfflineKyc') {
          templatePath = '/offlineKycTemplate.html';
        }
        if (type === 'CADELUA') {
          templatePath = '/user_license.html';
        }
        if (type === 'ADMELUA') {
          templatePath = '/admin_license.html';
        }

        if (!templatePath) {
          console.error('Invalid template type:', type);
          return;
        }

        // Fetch the HTML template
        const response = await fetch(templatePath);
        const html = await response.text();

        if (templateRef.current) {
          const renderedHtml = Mustache.render(html, data);
          templateRef.current.innerHTML = renderedHtml;
        }
      } catch (error) {
        console.error('Error fetching or rendering template:', error);
      }
    };

    fetchTemplate();
  }, [data, type]); // <--- also add "type" to dependency

  return <div ref={templateRef} />;
};

export default HtmlParser;
