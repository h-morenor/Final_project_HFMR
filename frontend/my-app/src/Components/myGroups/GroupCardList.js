import React from 'react'

export default function GroupCardList() {
  return (
    <div>
        <div className="card card-side bg-base-100 shadow-xl">
    <figure><img src="https://placeimg.com/200/280/arch" alt="Movie"/></figure>
    <div className="card-body">
        <h2 className="card-title">New movie is released!</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div className="card-actions justify-end">
        <button className="btn btn-primary">Watch</button>
        </div>
    </div>
    </div>

    </div>
  )
}
