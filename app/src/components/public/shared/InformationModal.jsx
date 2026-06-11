"use client"
import React, { useEffect, useRef } from 'react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

// Generic info/confirmation dialog. When redirectTo is provided, the modal acts
// as an "auto-redirect" notice: it shows a spinner and navigates away after a
// short delay (or immediately if the user clicks the button). Without
// redirectTo, it behaves as a plain dismissible dialog.
function InformationModal({ title, message, showModal, setShowModal, redirectTo }) {

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

  // Clicking the button cancels the pending auto-redirect timer and either
  // navigates immediately (redirectTo case) or just closes the dialog.
  const handleButton = () => {
    timerRef.current ? clearTimeout(timerRef.current) : null
    if(redirectTo){
        router.push(redirectTo)
    }else{
        dialogRef.current.close()
        if (setShowModal) setShowModal(false)
    }
  }

  return (
    <dialog ref={dialogRef} id="my_modal_1" className="modal">
    <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
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