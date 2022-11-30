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




    const urlPageNum = () => {
        if (isHomeUrl) return 1;
        if (!state) return 1;
        return state.pageNumber;
    }




    const [pageNum, setPageNum] = useState(urlPageNum());

    const [itemsPerPage, setItemsPerPage] = useState(20);


    const [allData, setAllData] = useState({});



    const [searchParams, setSearchParams] = useState("");


    const [filterIssue, setFilterIssue] = useState([]);
    const [issueCount, setIssueCount] = useState()
    const [errMsg, setErrMsg] = useState("")
    const [reload, setReload] = useState(false)


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchParams(e.target.value)
    }

    const handleBackHomeClick = () => {
        setSearchParams("");
        window.location.reload()

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
        if (searchParams) {
            getSearchData(searchParams, itemsPerPage, pageNum).then(res => {
                // setAllData(res);
                setFilterIssue(res?.issues?.items)
                setIssueCount(res.open_issues_count)
                if (res.message) {
                    setErrMsg(res.message)
                    setFilterIssue(issues)
                    setIssueCount(open_issues_count)
                }

            }
            ).catch((err) => {
                console.log(err, "message")
                setErrMsg(err)

            })
        }
        else {
            setFilterIssue(issues)
            setIssueCount(open_issues_count)
        }

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
    if (errMsg) return (
        <React.Fragment>

            <div id='alldata_message'>
                <p>{errMsg}</p>
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
                    openIssuesNum={issueCount}
                    pageNum={pageNum}
                    handleItemsPerPage={handleItemsPerPage}
                    itemsPerPage={itemsPerPage}
                />
                <Pagination openIssuesNum={issueCount}
                    pageNum={pageNum}
                    itemsPerPage={itemsPerPage}
                    handleSetPageNumber={handleSetPageNumber}
                />
            </div>
        </main>
    )
}
