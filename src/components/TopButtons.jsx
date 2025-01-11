import React from 'react'

function TopButtons() {

  const cities = [
    {
      id: 1,
      name: 'London'
    },
    {
      id: 2,
      name: 'sydney'
    },
    {
      id: 3,
      name: 'Tokyo'
    },
      {
      id: 4,
      name: 'Paris'
    },
      {
      id: 5,
      name: 'Tornoto'
    }
  ]

  return (
    <div className='flex items-center justify-around my-6'>
      {
        cities.map(city => (
                <button 
                key={city.id}
                className='text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transtion ease-in'>
                  {city.name}
                </button>
        ))
      }

    </div>
  )
}

export default TopButtons