import React from 'react'

function TopButtons({setQuery}) {

  const cities = [
    {
      id: 1,
      name: 'Bangkok'
    },
    {
      id: 2,
      name: 'Dubai'
    },
    {
      id: 3,
      name: 'Singapore'
    },
      {
      id: 4,
      name: 'Paris'
    },
      {
      id: 5,
      name: 'Kuwait'
    }
  ]

  return (
    <div className='flex items-center justify-around my-6'>
      {
        cities.map(city => (
                <button 
                key={city.id}
                className='text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transtion ease-in' 
                onClick={() => setQuery({q: city.name})}
                >
                  {city.name}
                </button>
        ))
      }

    </div>
  )
}

export default TopButtons