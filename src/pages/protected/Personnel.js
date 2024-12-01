import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Personnel from '../../features/Personnel'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Personnel"}))
      }, [])


    return(
        <Personnel />
    )
}

export default InternalPage