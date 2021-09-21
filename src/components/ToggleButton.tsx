import React from 'react'
interface Props {
  toggle: () => void;
}
export default function ToggleButton(props: Props) {
  const { toggle } = props
  return <i onClick={toggle} className="fas fa-chevron-right text-white bg-dark rounded p-1 m-2 w-fit"></i>
}
