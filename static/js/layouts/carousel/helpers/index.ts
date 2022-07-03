interface Ref {
  current: {
    slickPrev?: () => void
    slickNext?: () => void
  }
}

export const prev = (ref: Ref): void => ref.current.slickPrev()
export const next = (ref: Ref): void => ref.current.slickNext()

