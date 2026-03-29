import Layout from './Layout'
import { useState } from 'react' 
import FullCalendar from "@fullcalendar/react" 
import dayGridPlugin from "@fullcalendar/daygrid" 
import interactionPlugin from '@fullcalendar/interaction' 
import { Link } from 'react-router-dom' 

type Event = {
    title: string,
    description: string,
    date: string
    eventB: Boolean
}

function Module({event, setEvent, refill}:{event:Event, setEvent:any, refill:Boolean}){
    return(
        <div className="border-top border-black py-3">
            <div className="container-fluid d-flex justify-content-between my-2">
                <h5 className='d-inline-block'>{event.title}</h5>
                <button className='important border-0 rounded' onClick={() => setEvent(null)}><i className='bi bi-x'></i></button>
            </div>
            <div className="container-fluid">
                <p>{event.description}</p>
                {refill && <Link to="/Schedule" className='links'><button className="my-2 d-block text-start fs-6 important border-0 rounded">
                Refill Medication <i className="bi bi-caret-right-fill fs-6 m-2 d-inline-block"></i></button></Link>}
            </div>
        </div>
    )
}


export default function Calendar({contrast, toggleContrast}:{contrast:boolean, toggleContrast:any}) {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

    function handleEventClick(info:any){
        setSelectedEvent({title: info.event.title, description: info.event.extendedProps.description, date: info.event.startStr, eventB: info.event.eventB})
    }

    function handleDateClick(info: any) {
        const clickedDate = info.dateStr
        const events = info.view.calendar.getEvents()

        const eventsForDay = events.filter((event: any) => event.startStr.startsWith(clickedDate))

        if (eventsForDay.length > 0) {
            const first = eventsForDay[0]

            setSelectedEvent({title: first.title, description: first.extendedProps.description, date: first.startStr,eventB: true})
        }
        else {
            setSelectedEvent({title: "No events",description: `No events for ${clickedDate}`,date: clickedDate,eventB: false})
        }
}

    return (
    <Layout page="Calendar" tooltip='A calendar to keep track of important dates such as refills, pick-ups, appointments, etc.'
     current={3} contrast={contrast} toggleContrast={toggleContrast}>
        <div className='p-2 m-3 border fw-bold'>Click a date to see what events are occurring.</div>
        <div className='container-fluid d-flex flex-column h-100'>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                buttonText={{today:"Go To Today", prev: 'Previous', next: 'Next'}}
                events={[{title: "Refill Medication 1",date: "2026-03-25",
                        description: "Medication 1 runs out and needs to be refilled.", backgroundColor: "#dc3545"}]}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
                height="auto"
                contentHeight="auto"
            />
            {selectedEvent && <Module event={selectedEvent} setEvent={setSelectedEvent} refill={selectedEvent.eventB}/>}
        </div>
    </Layout>
    ) 
}