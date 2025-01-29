import React, { useState, useRef, useEffect } from 'react';
import { FileText } from 'lucide-react';

const Header = ({ activeUser, setActiveUser }) => {
    return(

        <div className="bg-white border-b shadow-sm  ">
        <div className="max-w-2xl mx-auto px-4 relative ">
          <div className="flex items-center justify-between h-20 ">
            <h1 className="text-xl font-semibold text-gray-800 ">Wohnwert Back Office Messenger</h1>
            <div className="flex gap-2">
              
              <button
                onClick={() => setActiveUser(1)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeUser === 1 ? 'bg-blue-50 text-orange-600' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                Person 1
              </button>
              <button
                onClick={() => setActiveUser(2)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeUser === 2 ? 'bg-blue-50 text-orange-600' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                Person 2
              </button>

            </div>
          </div>
        </div>
        <img
            className="absolute top-0 left-[9%] h-20 "
            src="/Logo_Wohnwert.jpg"
            alt="Wohnwert Logo"
          />

          {/* <img
            className="absolute top-0 left-[65%] h-20"
            src="/Vertriebportrais_Mann_01.jpg"
            alt="Vertriebler"
          /> */}
      </div>
    )
}



export default Header;