import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from "../components/pagination/pagination";
import { IEmployee } from "../models/employee";
import { memberEndPoint, absenceEndPoint } from "../constants/constants";
import employeeService from "../services/api";
import { loadAbsence } from '../stores/slices/absence';
import { loadEmployees, SortEmployees } from '../stores/slices/employee';
import { loadMembers } from '../stores/slices/member';
import { RootState } from "../stores/store";
import { mergedArrayOfObjects } from "../utility/utility";
import { TiArrowUnsorted, TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { sortObjectByProperty } from "../utility/utility";
import ErrorComponent from "../pages/Error/error-component";

function Home() {
    const dispatch = useDispatch();
    const { isMemberDataAvailable, members } = useSelector((state: RootState) => state.Member);
    const { isAbsenteeDataAvailable, absences } = useSelector((state: RootState) => state.Absence)
    const { employees, isEmployeesLoaded, employeeCount } = useSelector((state: RootState) => state.Employee);
    const [displayEmployeeList, setDisplayEmployeeList] = useState<Array<IEmployee>>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isTypeSorted, setIsTypeSorted] = useState(false);
    const [isDateSorted, setIsDateSorted] = useState(false);
    const [isTypeSortOrderAscending, setIsTypeSortOrderAscending] = useState(false)
    const [isDateSortOrderAscending, setIsDateSortOrderAscending] = useState(false)
    const [typeOfDateSort, setTypeOfDateSort] = useState(``);
    const [error, setError] = useState(false)

    let LIMIT = 10;
    /**
     * Loading Members and Absent Employees data on the page load
     */
    useEffect(() => {
        const fetchData = async (endpoint: string) => {
            return await employeeService.getApi(endpoint)
        }
        fetchData(memberEndPoint)
            .then(res => {
                dispatch(loadMembers(res.data));
            })
        fetchData(absenceEndPoint)
            .then(res => {
                dispatch(loadAbsence(res.data));
            })
    }, []);

    useEffect(() => {
        if (isMemberDataAvailable && isAbsenteeDataAvailable) {
            dispatch(loadEmployees(mergedArrayOfObjects(absences, members, 'userId')));
        }
    }, [isMemberDataAvailable, isAbsenteeDataAvailable])

    useEffect(() => {
        if (isEmployeesLoaded) {
            setDisplayEmployeeList(employees.slice((currentPage - 1) * LIMIT, (currentPage) * LIMIT));
        }
    }, [isEmployeesLoaded])
    useEffect(() => {
        setDisplayEmployeeList(employees.slice((currentPage - 1) * LIMIT, (currentPage) * LIMIT));
    }, [currentPage])

    useEffect(() => {
        if (isTypeSorted) {
            let sortedEmployess = [...employees]
            setDisplayEmployeeList(sortObjectByProperty(sortedEmployess, `type`, isTypeSortOrderAscending).slice((currentPage - 1) * LIMIT, (currentPage) * LIMIT));
        }
    }, [isTypeSortOrderAscending, isTypeSorted])

    useEffect(() => {
        if (isDateSorted) {
            let sortedEmployess = [...employees]
            setDisplayEmployeeList(sortObjectByProperty(sortedEmployess, typeOfDateSort, isDateSortOrderAscending).slice((currentPage - 1) * LIMIT, (currentPage) * LIMIT));
        }
    }, [isDateSortOrderAscending, isDateSorted, typeOfDateSort])

    const onPageChanged = useCallback(
        (event, page) => {
            event.preventDefault();
            setCurrentPage(page);
        },
        [setCurrentPage]
    );

    const sortByType = () => {
        setIsTypeSorted(true);
        setIsTypeSortOrderAscending(!isTypeSortOrderAscending)
    }

    const sortByDate = (dateType: string) => {
        setIsDateSorted(true);
        setTypeOfDateSort(dateType);
        setIsDateSortOrderAscending(!isDateSortOrderAscending)
    }


    return (
        <>
            {error && <ErrorComponent></ErrorComponent>}
            {
                !error &&
                <div>
                    <div className='home'>
                        <div className='home-table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th className='onhoverHand' onClick={sortByType}>Type of absence <TiArrowUnsorted></TiArrowUnsorted> </th>
                                        <th className='onhoverHand' onClick={() => sortByDate(`startDate`)}>Start Date<TiArrowUnsorted></TiArrowUnsorted></th>
                                        <th className='onhoverHand' onClick={() => sortByDate(`endDate`)}>End Date<TiArrowUnsorted></TiArrowUnsorted></th>
                                        <th>Member note</th>
                                        <th>Status</th>
                                        <th>Admitter note</th>
                                    </tr>
                                </thead>
                                <tbody id='employee-table-body'>
                                    {displayEmployeeList.map((emp: IEmployee, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{emp.id}</td>
                                                <td>
                                                    <img alt="..." src={emp.image} className="avatar avatar-sm rounded-circle me-2" />
                                                    {`${emp.name}`}
                                                </td>
                                                <td>{emp.type}
                                                </td>
                                                <td>{emp.startDate}</td>
                                                <td>{emp.endDate}</td>
                                                <td>{emp.memberNote}</td>
                                                <td>{emp.type}</td>
                                                <td>{emp.admitterNote}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </table>

                        </div>

                    </div>
                    <div className="pagination-wrapper">
                        <Pagination
                            totalRecords={employeeCount}
                            totalPages={~~(employeeCount / LIMIT) + 1}
                            pageLimit={LIMIT}
                            pageNeighbours={0}
                            onPageChanged={onPageChanged}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            }


        </>

    )
}

export default Home;