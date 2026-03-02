import React from 'react'

function Loading() {
  return (
    <div>
      {/* False header */}
      <div className='skeleton h-36 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      </div>

      <div className='grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 px-5'>
        {[...Array(6)].map((_,index) => (
          <div className="skeleton h-72 md:h-72 lg:h-72 w-full"></div>
        ))}
      </div>
    </div>
  )
}

export default Loading