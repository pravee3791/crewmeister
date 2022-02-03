
import { BsFillCalendarDateFill, BsFillCalendar3Fill, BsFillGridFill, BsCloudDownloadFill, BsChatLeftDotsFill } from "react-icons/bs";
/**
 *  Dummy component for the UI, Doesnt render new views 
 * @returns Simple Left natigation panel
 */
function Menu() {
    return (
        <div className='menu'>
            <div className='menu-subitem'>
                <BsFillCalendarDateFill size={'35px'}></BsFillCalendarDateFill>
            </div>
            <div className='menu-subitem'>
                <BsFillCalendar3Fill size={'35px'}></BsFillCalendar3Fill>
            </div>
            <div className='menu-subitem'>
                <BsFillGridFill size={'35px'}></BsFillGridFill>
            </div>
            <div className='menu-subitem'>
                <BsCloudDownloadFill size={'35px'}></BsCloudDownloadFill>
            </div>
            <div className='menu-subitem'>
                <BsChatLeftDotsFill size={'35px'}></BsChatLeftDotsFill>
            </div>
        </div>
    )
}

export default Menu;