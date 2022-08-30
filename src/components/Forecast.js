import React from 'react'

import ForecaseItem from './ForecaseItem'

const Forecast = ({weather, title}) => {
  return <>
    <div className='text-white'>
        <div className='flex items-center mt-5'>
          <p className='mt-6 font-medium'>{title} Forecast</p>
        </div>
        <hr className='my-2' />
        {/* mt-2 space-x-5 */}
        <div style={{}} className='no-scrollbar overflow-y-hidden flex items-center justify-between space-x-10'>
            {
                weather.map(item => <ForecaseItem type={title} data={item} key={Math.random()*1000} />)
            }
        </div>
    </div>
  </>
}

export default Forecast