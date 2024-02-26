import React from 'react'

function Loading() {
  return (
    <tr className='fixed inset-0 z-50 flex items-center justify-center w-full'>
    <td colSpan="5" className="text-center">
        <span className="loading loading-ring loading-lg"></span>
    </td>
</tr>

  )
}

export default Loading  