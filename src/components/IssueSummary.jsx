import React from 'react';
import '../css/IssueDetail/IssueSummary.css'
import ReactMarkdown from 'react-markdown';

export function IssueSummary({ body }) {

    return (
        <section id='summary'>
            <ReactMarkdown className='markdown' >
                {body}
            </ReactMarkdown>
        </section>
    );
}
