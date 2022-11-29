import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getAllData, getSearchData } from '../../Api/api';
import { IssuesList } from '../../components/IssuesList';
import { Pagination } from '../../components/Pagination';
import "../../css/IssueList/GitHubIssues.css"
import '../../css/IssueList/IssuesHomePage.css';


export default function IssueListPage(props) {

    const location = useLocation();

    const { pathname, state } = location;

    const isHomeUrl = pathname === '/';

    const homeOrgRepo = { org: 'facebook', repo: 'react' };

    const urlOrgRepo = () => {
        if (isHomeUrl) return homeOrgRepo;
        if (!state) return { org: '', repo: '' };
        const { issueNumber, pageNumber, ...orgRepo } = state;
        return orgRepo;
    }

    const urlPageNum = () => {
        if (isHomeUrl) return 1;
        if (!state) return 1;
        return state.pageNumber;
    }

    const [orgRepoValue, setOrgRepoValue] = useState(urlOrgRepo());



    const [pageNum, setPageNum] = useState(urlPageNum());

    const [itemsPerPage, setItemsPerPage] = useState(20);


    const [allData, setAllData] = useState({});

    const [isLoading, setIsLoading] = useState(true);


    const [searchParams, setSearchParams] = useState("");


    const [filterIssue, setFilterIssue] = useState([]);


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchParams(e.target.value)
    }

    const handleBackHomeClick = () => {
        setSearchParams("");
    };

    const handleSetPageNumber = num => {
        setPageNum(num);
        setAllData({});
    };

    const handleItemsPerPage = num => {
        setItemsPerPage(num);
        setPageNum(1);
        setAllData({});
    }



    useEffect(() => {
        getAllData(pageNum, itemsPerPage).then(res => {
            setAllData(res);
        }
        )
    }, [pageNum, itemsPerPage]);

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [pageNum]);
    useEffect(() => {
        const filteredData = issues?.filter(issue => {
            const lowerCaseTitle = issue?.title?.toLowerCase();
            const lowerCaseUser = issue?.user?.login?.toLowerCase();
            const lowerCaseSearch = searchParams?.toLowerCase();
            return (
                lowerCaseTitle.includes(lowerCaseSearch) ||
                lowerCaseUser.includes(lowerCaseSearch)
            );
        });
        setFilterIssue(filteredData);

    }, [allData, searchParams, issues]);



    const { issues, full_name, open_issues_count } = allData;



    const allDataExists = Object.keys(allData).length > 2;


    if (!allDataExists) {
        if (allData.message) return (
            <React.Fragment>

                <div id='alldata_message'>
                    <p>{allData.message}</p>
                    <Link to='/' className='message_link'
                        onClick={handleBackHomeClick}
                    >
                        &lt; Back to home page
                    </Link>

                </div>
            </React.Fragment>
        );
        else return (
            <React.Fragment>

                {isHomeUrl &&
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
                }
            </React.Fragment>
        );
    }

    if (filterIssue?.length === 0) return (
        <React.Fragment>

            <div id='alldata_message'>
                <p>Search not found</p>
                <Link to='/' className='message_link'
                    onClick={handleBackHomeClick}
                >
                    &lt; Back to home page
                </Link>
            </div>
        </React.Fragment>
    )


    return (
        <main id='issues-home-page'>
            <div className='search-input'>

                <div className='search'>
                    <input
                        // type='search'
                        placeholder='Search...'
                        onKeyUp={e => handleSearchSubmit(e)}
                    />
                    <AiOutlineSearch size={22} className="search_icon" />
                </div>


            </div >

            <div>

                <IssuesList issues={filterIssue}
                    fullName={full_name}
                    openIssuesNum={open_issues_count}
                    pageNum={pageNum}
                    handleItemsPerPage={handleItemsPerPage}
                    itemsPerPage={itemsPerPage}
                />
                <Pagination openIssuesNum={open_issues_count}
                    pageNum={pageNum}
                    itemsPerPage={itemsPerPage}
                    handleSetPageNumber={handleSetPageNumber}
                />
            </div>
        </main>
    )
}
