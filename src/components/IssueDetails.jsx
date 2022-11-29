import React from 'react';
import { IssueLabels } from './IssueLabels';
import { IssueNumber } from './IssueNumber';
import { IssueStatus } from './IssueStatus';
import { IssueTitle } from './IssueTitle';
import { TimeAgo } from './TimeAgo';
import { UserDetails } from './UserDetails';
import '../css/IssueDetail/IssueDetails.css'
export function IssueDetails({ chosenIssue }) {

    const {
        user,
        number,
        state,
        created_at,
        title,
        labels
    } = chosenIssue;

    return (
        <section id='issue-details'>
            <IssueTitle title={title} />
            <div id='issue-details-wrap'>
                <div id='ud-wrap'>
                    <UserDetails userImage={user?.avatar_url}
                        userName={user?.login} />
                </div>
                <div id='left-wrap'>
                    <div id='upper-wrap'>
                        <IssueNumber issueNumber={number} />
                        created&nbsp;
                        <TimeAgo time={created_at} />
                    </div>
                    <IssueLabels labels={labels} />
                </div>
                <div id='status-wrap'>
                    <IssueStatus status={state} />
                </div>

            </div>
        </section>
    );
}
