import { RefObject, useEffect, useRef } from 'react'

const useOutsideClick = (callback: () => void): RefObject<HTMLDivElement> => {
    const ref = useRef<HTMLDivElement>()

    useEffect(() => {
        const handleClick = (event: MouseEvent): void => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener('click', handleClick, true)

        return () => {
            document.removeEventListener('click', handleClick, true)
        }
    }, [ref])

    return ref
}
// }

export default useOutsideClick
