import React from 'react';
import { TimeAgo } from './TimeAgo';
import { UserDetails } from './UserDetails';
import "../css/IssueDetail/IssueComment.css"
import ReactMarkdown from 'react-markdown';


export function IssueComment({ comment }) {

    const { user, created_at, body } = comment;

    return (
        <div id='issue-comment'>
            <UserDetails userImage={user.avatar_url}
                userName={user.login} />
            <div id='issue-comment-wrap'>
                <div id='comment-time'>
                    commented&nbsp;
                    <TimeAgo time={created_at} />
                </div>
                <div>
                    <ReactMarkdown
                        className={`markdown ${!body && 'fake_comment'}`} >
                        {body}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
