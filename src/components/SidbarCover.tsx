import React from 'react'

export default function SidbarCover(myProps: any) {
  const { staticValue, setCollapse, children } = myProps
  return (
    <div
      onMouseEnter={() => {
        if (!staticValue) {
          setCollapse(false)
          return
        }
      }}
      onMouseLeave={() => {
        if (!staticValue) {
          setCollapse(true)
          return
        }
      }}
      className={`d-none d-lg-block ${!staticValue ? 'w-sidebar-toggle' : ''}`}
    >
      {children}
    </div>
  )
}
