import React from 'react';

export function IssueTitle({ title, className }) {

    return (
        <h3 className={`${className} issue_title`} >{title}</h3>
    );
}