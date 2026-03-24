import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

function TimeBar(){
    return (
        <div className="d-flex justify-content-between pt-1">
            <div className="container-fluid d-flex justify-content-start px-3" style={{maxHeight: "1vh"}}>
                9:41
            </div>
            <div className="container-fluid d-flex justify-content-end px-3">
                <i className="bi bi-bar-chart p-1"></i>
                <i className="bi bi-wifi p-1"></i>
                <i className="bi bi-battery-full p-1"></i>
            </div>
        </div>
    )
}

function TitleBar({name,tooltip}:{name: string, tooltip:string}){
    const navigation = useNavigate();

    function handleBack(){
        navigation(-1)
    }

    return(
        <div className="d-flex align-items-center position-relative py-0">
            <div className="position-absolute start-0 fs-3 p-2" id='back-button' onClick={handleBack}><i className="bi bi-arrow-left-short"></i></div>
            <div className="flex-grow-1 text-center fs-5 fw-bold">
                {name}
                <i className="bi bi-info-circle ms-2" data-tooltip-id="title-tooltip"></i>
            </div>
            <Tooltip id="title-tooltip" content={tooltip}/>
        </div>
    )
}

function Navigation({current}:{current:number}){
    return(
        <>
        <div className="container-fluid px-3 py-0 border-top border-black">
            <div className="row text-center">
                <div className="col">
                    <button type="button" className="btn border-0" disabled>
                        <i className="bi bi-person-fill clickable-icon fs-1"></i>
                    </button>
                </div>
                <div className="col" style={{backgroundColor: current==1 ? '#d6f1ee' : 'white'}}>
                    <Link to="/"><button type="button" className="btn border-0">
                        <i className="bi bi-house-door-fill clickable-icon fs-1"></i>
                    </button></Link>
                </div>
                <div className="col" style={{backgroundColor: current==2 ? '#d6f1ee' : 'white'}}>
                    <Link to="/DoandDont"><button type="button" className="btn border-0">
                        <i className="bi bi-clipboard2-fill clickable-icon fs-1"></i>
                    </button></Link>
                </div>
                <div className="col" style={{backgroundColor: current==3 ? '#d6f1ee' : 'white'}}>
                    <Link to="/Calendar"><button type="button" className="btn border-0">
                        <i className="bi bi-calendar-event-fill clickable-icon fs-1"></i>
                    </button></Link>
                </div>
            </div>
        </div>
        </>
    )
}

function Layout({page, tooltip, children, current}:{page: string, tooltip:string, children: any, current:number}){
    return(
        <div className="d-flex flex-column min-vh-100">
            <TimeBar />
            <TitleBar name={page} tooltip={tooltip}/>
            <main className="flex-grow-1 d-flex flex-column">{children}</main>
            <Navigation current={current}/>
        </div>
    )
}

export default Layout