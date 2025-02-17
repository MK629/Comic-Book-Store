import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editComic, searchById } from '../service/comicAdminService'
import { BsTrash, BsTrash2, BsX } from 'react-icons/bs'

export const EditComicPage = () => {

  const {id} = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [publisher, setPublisher] = useState('')
  const [publishedDate, setPublishedDate] = useState()
  const [cover, setCover] = useState('')
  const [price, setPrice] = useState(0.0)
  const [issues, setIssues] = useState(0)
  const [genres, setGenres] = useState([])

  const [newGenre, setNewGenre] = useState('')

  const navigate = useNavigate()

  const addGenre = (newGenre) => {
    setGenres([...genres, newGenre])
  }

  const removeGenre = (GenreToRemove) => {
    const newGenreList = genres.filter((genre) => {return genre != GenreToRemove})
    setGenres(newGenreList)
  }

  const sendEditedForm = async () => {
    const editedComic = {
      id: id,
      title: title,
      description: description,
      author: author,
      publisher: publisher,
      publishedDate: publishedDate,
      cover: cover,
      price: price,
      issues: issues,
      genres: genres
    }

    let response
    await editComic(editedComic).then(res => response = res.data).catch(e => console.log(e))

    if(response === "success"){
      navigate("/editSuccess")
    }
    else{
      navigate("/editFailed")
    }
  }

  useEffect(() => {
    searchById(id).then(res => {

      setTitle(res.data.title)
      setDescription(res.data.description)
      setAuthor(res.data.author)
      setPublisher(res.data.publisher)
      setPublishedDate(res.data.publishedDate)
      setCover(res.data.cover)
      setPrice(res.data.price)
      setIssues(res.data.issues)
      setGenres(res.data.genres)

    }).catch(e => console.log(e))
  }, [])

  return (
    <div className='mt-20 container items-center mx-auto mb-16'>

      <h1 className='mx-auto text-center'>Edit Comic</h1>

      <div className='mx-auto bg-white flex flex-col border-[2px] border-black'>
        <div className='flex p-3 items-center justify-between'>
          <div className='flex flex-col'>
            <div>
              <label htmlFor="title">Title:</label>
              <input type='text' id='title' name='title' value={title} onChange={(e) => {setTitle(e.target.value)}} className='border-[1px] border-black p-1 rounded-md w-[22.5rem]'></input>
            </div>

            <div className='mt-3'>
              <label htmlFor="author">Author:</label>
              <input type='text' id='author' name='author' value={author} onChange={(e) => {setAuthor(e.target.value)}} className='border-[1px] border-black p-1 rounded-md w-[22rem]'></input>
            </div>

            <div className='mt-3'>
              <label htmlFor="publisher">Publisher:</label>
              <input type='text' id='publisher' name='publisher' value={publisher} onChange={(e) => {setPublisher(e.target.value)}} className='border-[1px] border-black p-1 rounded-md w-[20rem]'></input>
            </div>

            <div className='mt-3'>
              <label htmlFor="publishedDate">Published Date:</label>
              <input type='date' id='publishedDate' name='publishedDate' value={publishedDate} onChange={(e) => {setPublishedDate(e.target.value)}} className='border-[1px] border-black p-1 rounded-md w-[16.8rem]'></input>
            </div>

            <div className='mt-3'>
              <label htmlFor="cover">Cover:</label>
              <input type='text' id='cover' name='cover' value={cover} onChange={(e) => {setCover(e.target.value)}} className='border-[1px] border-black p-1 rounded-md w-[22.5rem]'></input>
            </div>

            <div className='mt-3'>
              <label htmlFor="price">Price:</label>
              <input type='number' id='price' name='price' value={price} onChange={(e) => {setPrice(e.target.value)}} className='border-[1px] border-black p-1 rounded-md w-[22.5rem]'></input>
            </div>

            <div className='mt-3'>
              <label htmlFor="issues">Issues:</label>
              <input type='number' id='issues' name='issue' value={issues} onChange={(e) => {setIssues(e.target.value)}} className='border-[1px] border-black p-1 rounded-md w-[21.8rem]'></input>
            </div>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="description">Description:</label>
            <textarea type='text' rows={11} cols={80} id='description' name='description' value={description} onChange={(e) => {setDescription(e.target.value)}} className='border-[1px] border-black p-1'></textarea>
          </div>
        </div>

        <h2 className='text-semibold ml-4 mt-6'>Genres:</h2>

        <div className='flex gap-6 p-4'>
          {
            genres && genres.map(genre => {
              return(
                <div key={genre} className='border-[2px] flex border-black rounded-md shadow-sm p-2 items-center text-center'>
                  <h3>{genre}</h3>
                  <BsTrash className='ml-3' size={20} onClick={() => {removeGenre(genre)}}/>
                </div>
              )
            })
          }
        </div>

        <div className='flex flex-col gap-4 p-4'>
          <div className='flex'>
            <input type='radio' name="chooseGenre" value={"Action"} onClick={(e) => {setNewGenre(e.target.value)}}/>
            <h3 className='ml-4'>Action</h3>
          </div>

          <div className='flex'>
            <input type='radio' name="chooseGenre" value={"Comedy"} onClick={(e) => {setNewGenre(e.target.value)}}/>
            <h3 className='ml-4'>Comedy</h3>
          </div>

          <div className='flex'>
            <input type='radio' name="chooseGenre" value={"Drama"} onClick={(e) => {setNewGenre(e.target.value)}}/>
            <h3 className='ml-4'>Drama</h3>
          </div>

          <div className='flex'>
            <input type='radio' name="chooseGenre" value={"War"} onClick={(e) => {setNewGenre(e.target.value)}}/>
            <h3 className='ml-4'>War</h3>
          </div>

          <div className='flex'>
            <input type='radio' name="chooseGenre" value={"Horror"} onClick={(e) => {setNewGenre(e.target.value)}}/>
            <h3 className='ml-4'>Horror</h3>
          </div>
          
          <div className='flex'>
            <input type='radio' name="chooseGenre" value={"Manga"} onClick={(e) => {setNewGenre(e.target.value)}}/>
            <h3 className='ml-4'>Manga</h3>
          </div>

          <div className='flex'>
            <input type='radio' name="chooseGenre" value={"Crime"} onClick={(e) => {setNewGenre(e.target.value)}}/>
            <h3 className='ml-4'>Crime</h3>
          </div>

          <div className='flex'>
            <input type='radio' name="chooseGenre" value={"Mystery"} onClick={(e) => {setNewGenre(e.target.value)}}/>
            <h3 className='ml-4'>Mystery</h3>
          </div>

          <div className='flex'>
            <input type='radio' name="chooseGenre" value={"Romance"} onClick={(e) => {setNewGenre(e.target.value)}}/>
            <h3 className='ml-4'>Romance</h3>
          </div>

          <div className='flex'>
            <input type='radio' name="chooseGenre" value={"Sci_Fi"} onClick={(e) => {setNewGenre(e.target.value)}}/>
            <h3 className='ml-4'>Sci-Fi</h3>
          </div>

          <button className='bg-[#fcff55] text-[#d40b0bd0] rounded-lg mb-10 border-[2px] w-36 border-black' onClick={() => {addGenre(newGenre)}}>Add Genre</button>
        </div>

        <button className='bg-[#fcff55] mx-auto text-[#d40b0bd0] font-extrabold rounded-lg mb-10 border-[2px] px-4 py-2 border-black' onClick={() => {sendEditedForm()}}>Save Edited Comic</button>
      </div>
    </div>
  )
}
