import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    

    const goToNextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <nav className='flex justify-center mt-7 mb-5'>
            <ul className='inline-flex -space-x-px text-sm'>
                <li className="flex items-center justify-center px-3 h-8  leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white mx-[2px] ">
                    <a className="page-link" 
                        onClick={goToPrevPage} 
                        href='#'>
                        
                        Previous
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                   <li key={pgNumber} className={`page-item  flex items-center gap-11 justify-center px-3 h-8 leading-tight ${currentPage === pgNumber ? 'bg-blue-500 text-white' : 'bg-gray-800 hover:bg-gray-300'}`}>
                <a onClick={() => setCurrentPage(pgNumber)} className="page-link " href="#">
                    {pgNumber}
                </a>
            </li>

               
                ))}
                <li className="flex  items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white mx-14">
                    <a className="page-link" 
                        onClick={goToNextPage}
                        href='#'>
                        
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination