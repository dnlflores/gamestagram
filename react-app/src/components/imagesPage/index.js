import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getImages } from '../../store/image'

function ImagesPage() {

    const dispatch = useDispatch()
    const images = useSelector(state => state.images)
    const imagesArr = Object.values(images)

    console.log('imagesArr', imagesArr)

    useEffect(() => {
        dispatch(getImages())
    }, [dispatch])

    return (
        <ul>
            {
                imagesArr.map(image => (
                    <div>
                        <li>{image.user_id}</li>
                        <li>{image.caption}</li>
                        <li><img src={`${image.url}`}></img></li>
                    </div>
                ))
            }
        </ul>
    )
}

export default ImagesPage
