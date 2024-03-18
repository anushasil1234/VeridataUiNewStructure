// ChildComponent.jsx

import React, { useEffect, useRef } from 'react';
import Mustache from 'mustache';


const HtmlParser = ({ data, type }) => {
    const templateRef = useRef(null);

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                
                
                let htmlmodule;
                if (type === "Consetnt") {

                    htmlmodule = require(`raw-loader!./consenttemplate.html`);
                }
                if (type === "OfflineKyc") {

                    htmlmodule = require(`raw-loader!./offlineKycTemplate.html`);
                }

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
