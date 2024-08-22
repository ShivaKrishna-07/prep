import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='m-10'>
        <Link href="/syllabus/cse">CSE</Link><br />
        <Link href="/syllabus/it">IT</Link><br />
        <Link href="/syllabus/csm">CSM</Link><br />
        <Link href="/syllabus/csd">CSD</Link><br />
        <Link href="/syllabus/csc">CSC</Link><br />
        <Link href="/syllabus/eee">EEE</Link><br />
        <Link href="/syllabus/ece">ECE</Link>
    </div>
  )
}
