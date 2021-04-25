import React from 'react'

export default function Note({children, note="Note:"}) {
  return (
    <blockquote className="note m24">
      <p>
        <strong>Note:</strong> {children}
      </p>
    </blockquote>
  )
}
