import MainArea from '@/components/todays-session/MainArea'
import Sidebar from '@/components/todays-session/Sidebar'
import React from 'react'

const SessionPage = () => {
    return (
        <>

            <div className="flex h-screen">
                <div className="w-1/4">
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <MainArea />
                </div>
            </div>



        </>
    )
}

export default SessionPage