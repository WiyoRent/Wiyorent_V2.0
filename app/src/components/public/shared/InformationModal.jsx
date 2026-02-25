"use client"
import React, { useEffect, useRef } from 'react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

function InformationModal({ message, showModal, setShowModal, redirectTo }) {

    const router = useRouter()
    const dialogRef = useRef(null)
    const timerRef = useRef(null)

  useEffect(() => {
    if (showModal) {
        dialogRef.current.showModal()

        if(redirectTo){
            timerRef.current = setTimeout(() => {
                router.push(redirectTo)
            }, 4000)
        }

        return () => clearTimeout(timerRef.current)
    }else{
        if (dialogRef.current?.open) {
            dialogRef.current.close()
        }

    }
  }, [showModal])

  const handleButton = () => {
    timerRef.current ? clearTimeout(timerRef.current) : null
    if(redirectTo){
        router.push(redirectTo)
    }else{
        dialogRef.current.close()
        setShowModal(false)
    }
  }

  return (
    <dialog ref={dialogRef} id="my_modal_1" className="modal">
    <div className="modal-box">
        <h3 className="font-bold text-lg">Almost there!</h3>
        <p className="py-4">{message}</p>
        {
            redirectTo && (
                <div className='flex justify-center'> 
                    <span className="loading loading-spinner text-accent"></span>
                </div>
            )
        }
        
        <div className="modal-action">
            <button onClick={handleButton} className="btn"> {redirectTo ? 'Complete Onboarding' : 'Close'}</button>
        </div>
    </div>
    </dialog>
  )
}

export default InformationModal