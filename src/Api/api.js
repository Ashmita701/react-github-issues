import axios from "axios";
import { BASE_URL } from "../utils/constants";

const errorMsg = {
    noData: {
        message: 'Something went wrong. Refresh the browser to try again.'
    }
};

export const getAllData = async (pageNum, itemsPerPage) => {


    try {

        const getOrgRepo = await axios.get(BASE_URL);

        const orgRepo = getOrgRepo.data
        console.log({ orgRepo })

        if (!orgRepo) return errorMsg.noData;

        if (orgRepo.message) return orgRepo;

        const getIssues = await axios.get(`${BASE_URL}/issues?per_page=${itemsPerPage}&page=${pageNum}`);
        const issues = getIssues.data

        if (!issues) return errorMsg.noData;

        orgRepo.issues = issues;
        return orgRepo;

    }

    catch (err) {
        console.log({ err });
        return errorMsg.noData;
    }
}

export const getSearchData = async (query) => {


    try {
        const getIssues = await axios.get(`https://api.github.com/search/issues?repo=facebook/react&q=${query}`);
        console.log(getIssues)
        const issues = getIssues.data

        if (!issues) return errorMsg.noData;

        return issues;

    }

    catch (err) {
        console.log({ err });
        return errorMsg.noData;
    }
}
export const getDetail = async (issueNum) => {


    try {


        const getIssues = await axios.get(`${BASE_URL}/issues/${issueNum}`);
        const issues = getIssues.data

        if (!issues) return errorMsg.noData;

        return issues;

    }

    catch (err) {
        console.log({ err });
        return errorMsg.noData;
    }
}


export const getIssueComments = async commentsUrl => {
    const getComments = await fetch(commentsUrl);
    const comments = await getComments.json();
    return comments;
}



