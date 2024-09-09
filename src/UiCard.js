import React from 'react'

function UiCard(props) {
  return (
    <div>
        <div className="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-teal-900 via-slate-800 to-cyan-900 before:absolute before:top-0 w-80 h-72 relative bg-cyan-800 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
            <img 
            className="w-28 h-28 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500"
            src={props.image} 
            alt='profile'/>
                
          
            <div className="z-10  group-hover:-translate-y-10 transition-all duration-500">
                <span className="text-2xl font-semibold">{props.name}</span>
                <p>{props.area}</p>
            </div>
            <a className="bg-teal-900 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-cyan-800" href="#">Folow</a>
        </div>
    </div>
  )
}

export default UiCard