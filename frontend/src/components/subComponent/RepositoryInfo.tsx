import React from 'react'

type RepositoryInfoProps = {
    repository: string;
    file: string;
    owner: string;
}

const RepositoryInfo = ({ repository, file, owner }: RepositoryInfoProps) => {
  return (
    <div className='rounded-lg bg-[#151920] border w-1/3 border-gray-800 p-5 justify-between items-center cursor-pointer'>
        <h1 className='text-white text-lg'>Repository Info</h1>

        <div className='flex flex-col gap-2 mt-3'>
            <div className='flex flex-row justify-between '>
                <h1 className='text-gray-400 text-lg'>Repository</h1>
                <h1 className='text-emerald-400 text-lg'>{repository}</h1>
            </div>
            <div className='flex flex-row justify-between'>
                <h1 className='text-gray-400 text-lg'>File</h1>
                <h1 className='text-white text-lg'>{file}</h1>
            </div>
            <div className='flex flex-row justify-between'>
                <h1 className='text-gray-400 text-lg'>Owner</h1>
                <h1 className='text-white text-lg'>{owner}</h1>
            </div>
        </div>
    </div>
  )
}

export default RepositoryInfo