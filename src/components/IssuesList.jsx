import React from 'react';
import { Issue } from './Issue';
import '../css/IssueList/IssuesList.css';

export function IssuesList({ issues, fullName, openIssuesNum, pageNum, itemsPerPage, handleItemsPerPage }) {

    const lastPageNum = Math.ceil(openIssuesNum / itemsPerPage);

    const optionsArray = Array.from({ length: 6 }, (v, i) => i * 5 + 5);

    const allOptions = optionsArray.map(value =>
        <option key={value} value={value}>
            {value}
        </option>
    );

    const issuesExist = Array.isArray(issues) && issues.length > 0;

    const allIssues = issuesExist && issues.map(issue =>
        <li key={issue.id}>
            <Issue issue={issue}
                fullName={fullName}
                pageNum={pageNum} />
        </li>
    );

    return (
        <section className='issues-list'>
            <h2>{openIssuesNum} open issues for {fullName}</h2>
            <div className='list-header'>
            </div>
            <ol>{allIssues}</ol>
        </section>
    )
}
