import React, { useEffect, useState } from 'react'
import ContactService from '../../services/contact.service'

export function ContactList () {
  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState(false)
  const [contact, setContact] = useState([])
  // const [change, setChange] = useState(false)
  // const [readAvatar, setReadAvatar] = useState(null)
  // const [storeAvatar, setStoreAvatar] = useState(null)
  const [isAdd, setIsAdd] = useState(false)

  useEffect(() => {
    retrieveContacts()
  }, [])

  const retrieveContacts = () => {
    setLoading(true)
    ContactService.getAll()
      .then(response => {
        setContacts(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const defaultSrc = e => {
    e.target.onerror = null
    e.target.src = '/assets/placeholder/avatar.png'
  }

  const addContact = () => {
    setContact([])
    setIsAdd(true)
  }

  // const onChangePicture = e => {
  //   if (e.target.files[0]) {
  //     // console.log('picture: ', e.target.files)
  //     setStoreAvatar(e.target.files[0])
  //     const reader = new FileReader()
  //     reader.addEventListener('load', () => {
  //       setReadAvatar(reader.result)
  //     })
  //     reader.readAsDataURL(e.target.files[0])
  //   }
  // }

  const handleInputChange = event => {
    const { name, value } = event.target
    setContact({ ...contact, [name]: value })
  }

  const createContact = () => {
    setIsAdd(false)
    const data = new FormData()
    data.append('firstName', contact.firstname)
    data.append('lastName', contact.firstname)
    data.append('age', contact.age)
    data.append('photo', 'https://i.pravatar.cc/150')
    // data.append('photo', storeAvatar)

    ContactService.create(data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        console.log(response)
        // setChange(true)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const detailContact = id => {
    setIsAdd(true)
    ContactService.get(id)
      .then(response => {
        setContact(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteContact = id => {
    ContactService.remove(id)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='container mx-auto flex h-screen'>
      <div className='mx-auto my-10'>
        <div className='flex flex-col space-y-2 items-center'>
          <h5 className='font-semibold text-sm text-gray-500'>
            Simple CRUD Contact using ReactJS
          </h5>
          <h2 className='font-semibold text-2xl'>My Contacts</h2>
        </div>
        {loading ? (
          <div className='py-4'>Loading ...</div>
        ) : (
          contacts &&
          contacts.map((item, index) => (
            <div
              key={index}
              className='flex flex-row justify-between items-center border border-gray-300 shadow-md rounded-lg px-4 py-2 my-3 w-80'
            >
              <div className='flex flex-row items-center space-x-4'>
                <img
                  className='w-10 h-10 object-contain rounded-full'
                  src={item.photo}
                  onError={defaultSrc}
                  alt='Avatar'
                />
                <div className='flex flex-col'>
                  <h3 className='font-bold text-md'>
                    {item.firstName} {item.lastName}
                  </h3>
                  <p className='font-semibold text-xs text-gray-500'>
                    {item.age} years old
                  </p>
                </div>
              </div>
              <div className='flex flex-row space-x-2 justify-center items-center'>
                <button
                  onClick={() => {
                    detailContact(item.id)
                  }}
                >
                  <img
                    className='w-5 h-5 object-contain'
                    src='/assets/icon/edit.svg'
                    alt='Edit'
                  />
                </button>
                <button
                  onClick={() => {
                    deleteContact(item.id)
                  }}
                >
                  <img
                    className='w-5 h-5 object-contain'
                    src='/assets/icon/remove.svg'
                    alt='Remove'
                  />
                </button>
              </div>
            </div>
          ))
        )}
        <div className='flex'>
          <button
            className='bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 px-3 py-2 rounded-lg font-bold text-white text-sm ml-auto'
            onClick={addContact}
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
              {/* <label className='w-16 h-16 rounded-full cursor-pointer'>
                {readAvatar == null ? (
                  <img
                    className='w-full object-contain rounded-full'
                    src=''
                    onError={defaultSrc}
                    alt='New Avatar'
                  />
                ) : (
                  <img
                    className='w-full object-contain rounded-full'
                    src={readAvatar}
                  />
                )}
                <input
                  type='file'
                  className='hidden'
                  name='avatar'
                  onChange={onChangePicture}
                />
              </label> */}
              <div className='flex flex-col space-y-3 my-5'>
                <input
                  className='border border-gray-300 py-1 px-2 w-full rounded-md'
                  type='text'
                  name='firstname'
                  placeholder='First Name ...'
                  onChange={handleInputChange}
                  value={contact && contact.firstName}
                />
                <input
                  className='border border-gray-300 py-1 px-2 w-full rounded-md'
                  type='text'
                  name='lastname'
                  placeholder='Last Name ...'
                  onChange={handleInputChange}
                  value={contact && contact.lastName}
                />
                <input
                  className='border border-gray-300 py-1 px-2 w-full rounded-md'
                  type='number'
                  name='age'
                  placeholder='Age ...'
                  onChange={handleInputChange}
                  value={contact && contact.age}
                />
                <div className='ml-auto'>
                  <button
                    className='bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 px-3 py-2 rounded-lg font-bold text-white text-sm ml-auto'
                    onClick={createContact}
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
