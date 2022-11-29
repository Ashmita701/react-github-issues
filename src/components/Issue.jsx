import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IssueLabels } from './IssueLabels';
import { IssueNumber } from './IssueNumber';
import { IssueStatus } from './IssueStatus';
import { IssueTitle } from './IssueTitle';
import '../css/IssueList/Issue.css';
import { UserDetails } from './UserDetails';
import { TimeAgo } from './TimeAgo';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

export function Issue({ issue, fullName, pageNum }) {

    const {
        user,
        number,
        state,
        created_at,
        comments,
        title,
        labels
    } = issue;

    const orgRepoArr = fullName.split('/');
    const org = orgRepoArr[0];
    const repo = orgRepoArr[1];
    const navigation = useNavigate();



    const onClickLink = (e) => {
        e.preventDefault();
        navigation(`/issue/${number}`,
            {
                state: {
                    issueNumber: number,
                }
            });

    }

    return (
        <div className='issue_wrap_all'>
            <div className='issue_icon'>
                <AiOutlineInfoCircle size={20} />
            </div>
            <div className='issue_text_wrap'>
                <div onClick={(e) => onClickLink(e)} >
                    <IssueTitle title={title} className='list_title' />
                </div>
                <div className='issue_wrap_left'>
                    <IssueNumber issueNumber={number} />
                    <IssueStatus status={state + 'ed'} />
                    <TimeAgo time={created_at} />
                </div>
                <div className='issue_wrap_down'>

                    <IssueLabels labels={labels} />
                </div>
            </div>
            {comments > 0 &&
                <div className='issue_wrap_right'>
                    {/* <img src={'/../Assests/Images/comment.png'} alt='comment_icon' /> */}
                    <FaRegCommentAlt />
                    {comments}
                </div>
            }
        </div>
    );
}