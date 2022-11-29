import React from 'react';
import '../css/IssueDetail/IssueSummary.css'
import ReactMarkdown from 'react-markdown';

export function IssueSummary({ body }) {
    console.log('body', body);

    return (
        <section id='summary'>
            <ReactMarkdown className='markdown' >
                {body}
            </ReactMarkdown>
        </section>
    );
}
