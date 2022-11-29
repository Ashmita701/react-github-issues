import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { Link, useLocation } from 'react-router-dom';
import { getDetail, getIssueComments } from '../../Api/api';
import { IssueComments } from '../../components/IssueComments';
import { IssueDetails } from '../../components/IssueDetails';
import { IssueSummary } from '../../components/IssueSummary';
import "../../css/IssueDetail/IssueDetailsPage.css"


export default function IssueDetailsPage() {

    const location = useLocation();

    const { state } = location;


    const { issueNumber } = state;

    const [issueComments, setIssueComments] = useState([]);


    const [chosenIssue, setChosenIssue] = useState({});
    const commentsExist = chosenIssue && chosenIssue.comments > 0;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    useEffect(() => {
        if (issueNumber) {
            getDetail(issueNumber).then(res => {
                setChosenIssue(res);
            }
            )
        }
    }, [issueNumber]);

    useEffect(() => {
        if (chosenIssue && commentsExist) {
            getIssueComments(chosenIssue.comments_url).then(res => {
                console.log('res', res);
                if (Array.isArray(res)) setIssueComments(res);
            })
        }
    }, [chosenIssue, issueNumber]);

    const dataExists = Object.keys(chosenIssue).length > 0;

    if (!dataExists) {
        if (chosenIssue.message) return (
            <React.Fragment>

                <div id='alldata_message'>
                    <p>{chosenIssue.message}</p>

                </div>
            </React.Fragment>
        );
        else return (
            <React.Fragment>


                <div id='loading_issue'>
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="gray"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </div>

            </React.Fragment>
        );
    }

    return (
        <main id='issue-details-page'>
            {chosenIssue ?
                <div id='issue-details-content-wrap'>
                    <IssueDetails chosenIssue={chosenIssue} />
                    <IssueSummary body={chosenIssue.body} />
                    <IssueComments commentsArray={issueComments}
                        commentsNum={chosenIssue.comments} />
                </div>
                : <p>Something went wrong. Go back to home page and restart the browser, to see all issues.</p>
            }
        </main>
    )
}
