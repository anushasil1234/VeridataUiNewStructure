// ChildComponent.jsx

import React, { useEffect, useRef } from 'react';
import Mustache from 'mustache';


const HtmlParser = ({ data,htmlmodule }) => {
    const templateRef = useRef(null);

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                 // const response = await fetch('../html-template-parse/test.html');
                //  const templateHtml = response.text();
                //  console.log("templateHtml",templateHtml);
                
                // eslint-disable-next-line import/no-webpack-loader-syntax
                var htmlmodule = require('raw-loader!./consenttemplate.html');

                var html = htmlmodule.default;
                if (templateRef.current) {
                    const renderedHtml = Mustache.render(html, data);
                    templateRef.current.innerHTML = renderedHtml;
                }
            } catch (error) {
                console.error('Error fetching or rendering template:', error);
            }
        };

        fetchTemplate();
    }, [data]);

    return <div ref={templateRef} />;
};

export default HtmlParser;
