/* eslint-disable @next/next/no-img-element */
'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onMediaSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previwURL = URL.createObjectURL(files[0])

    setPreview(previwURL)
  }

  return (
    <>
      <input
        onChange={onMediaSelected}
        name="coverUrl"
        accept="image/*"
        type="file"
        id="media"
        className="invisible h-0 w-0"
      />

      {preview && (
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
