import React from 'react';
import '../css/IssueList/IssueLabels.css'

export function IssueLabels({ labels }) {

    if (labels && labels.length > 0) {

        const allLabels = labels.map(label =>
            <p key={label.id}
                style={{
                    border: `3px solid #${label.color}`, backgroundColor: `#${label.color}`,
                    color: label.name === "Type: Bug" ? "#fff" : "#000"
                }}>
                {label.name}
            </p>);

        return (
            <div className='issue-labels'>
                {allLabels}
            </div>
        );
    }

    else {
        return null;
    }
}