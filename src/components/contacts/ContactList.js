import React, { useEffect, useState } from 'react'

export function ContactList () {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdd, setIsAdd] = useState(false)

  useEffect(() => {
    console.log('dosomething')
  }, [])

  return (
    <div className='container mx-auto flex h-screen'>
      <div className='mx-auto my-10'>
        <div className='flex flex-col space-y-2 items-center'>
          <h5 className='font-semibold text-sm text-gray-500'>
            Simple CRUD Contact using ReactJS
          </h5>
          <h2 className='font-semibold text-2xl'>My Contacts</h2>
        </div>
        <div className='flex flex-row justify-between items-center border border-gray-300 shadow-md rounded-lg px-4 py-2 my-3 w-80'>
          <div className='flex flex-row items-center space-x-4'>
            <img
              className='w-10 h-10 object-contain rounded-full'
              src='/assets/placeholder/avatar.png'
              onError={e => (
                (e.target.onerror = null),
                (e.target.src =
                  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')
              )}
              alt='Avatar'
            />
            <div className='flex flex-col'>
              <h3 className='font-bold text-md'>Hahahhahaa</h3>
              <p className='font-semibold text-xs text-gray-500'>
                28 years old
              </p>
            </div>
          </div>
          <div className='flex flex-row space-x-2 justify-center items-center'>
            <button>
              <img
                className='w-5 h-5 object-contain'
                src='/assets/icon/edit.svg'
                alt='Edit'
              />
            </button>
            <button>
              <img
                className='w-5 h-5 object-contain'
                src='/assets/icon/remove.svg'
                alt='Remove'
              />
            </button>
          </div>
        </div>
        <div className='flex'>
          <button
            className='bg-brand px-3 py-2 rounded-lg font-bold text-white text-sm ml-auto'
            onClick={() => setIsAdd(true)}
          >
            Add Contact
          </button>
        </div>
        {isAdd && (
          <div className='my-3 border border-gray-300 rounded-lg px-4 py-2 duration-300'>
            <div className='flex'>
              <button className='ml-auto' onClick={() => setIsAdd(false)}>
                <img
                  className='w-6 h-6 object-contain'
                  src='/assets/icon/close.svg'
                  alt='Close'
                />
              </button>
            </div>
            <div className='flex flex-col items-center'>
              <label className='w-16 h-16 rounded-full cursor-pointer'>
                <img
                  className='w-full object-contain rounded-full'
                  src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                  alt='New Avatar'
                />
                <input type='file' className='hidden' />
              </label>
              <div className='flex flex-col space-y-3 my-5'>
                <input
                  className='border border-gray-300 py-1 px-2 w-full rounded-md'
                  type='text'
                  placeholder='First Name ...'
                />
                <input
                  className='border border-gray-300 py-1 px-2 w-full rounded-md'
                  type='text'
                  placeholder='Last Name ...'
                />
                <input
                  className='border border-gray-300 py-1 px-2 w-full rounded-md'
                  type='text'
                  placeholder='Age ...'
                />
                <div className='ml-auto'>
                  <button
                    className='bg-brand px-3 py-2 rounded-lg font-bold text-white text-sm ml-auto'
                    onClick={() => setIsAdd(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
