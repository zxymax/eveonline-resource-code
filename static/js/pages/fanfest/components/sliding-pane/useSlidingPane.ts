import { useState } from 'react'

interface SlidingPane {
    isOpen: boolean
    toggleSlidingPane: () => void
    closeSlidingPane: () => void
}

const useSlidingPane = (): SlidingPane => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleSlidingPane = (): void => setIsOpen(!isOpen)

    const closeSlidingPane = (): void => setIsOpen(false)

    return {
        isOpen,
        toggleSlidingPane,
        closeSlidingPane,
    }
}

export default useSlidingPane
