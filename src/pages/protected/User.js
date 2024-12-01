import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import User from '../../features/Users'
import { setPageTitle } from '../../features/common/headerSlice'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Users"}))
      }, [])


    return(
        <User />
    )
}

export default InternalPage