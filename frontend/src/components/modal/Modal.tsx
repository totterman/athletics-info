import { forwardRef, ReactNode } from 'react'

export type ModalProps = {
  children?: ReactNode
  onBackdropClick?: () => void
  modalBoxClassName?: string
  // you can add more classNames as per you level of customisation
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ children, modalBoxClassName, onBackdropClick }, ref) => {
    return (
      <dialog ref={ref} className="modal w-3/4 rounded-lg">
        <div className={`modal-box ${modalBoxClassName ?? ''}`}>{children}</div>
        <form method="dialog" className="modal-backdrop flex justify-center">
          <button
            type="button"
            className="my-2 h-10 px-6  text-black font-semibold bg-slate-100"
            onClick={() => {
              onBackdropClick && onBackdropClick()
            }}
          >
            Close
          </button>
        </form>
      </dialog>
    )
  }
)