import React, { useState } from 'react'

// Full-size placeholder SVG that maintains aspect ratio
const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI5MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjNmNGY2O3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTVlN2ViO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iOTAwIiBmaWxsPSJ1cmwoI2cpIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTUwLCAzNTApIj48cGF0aCBkPSJNNTAgMTBMMzAgNDBMNzAgNDBaIiBmaWxsPSIjZDFkNWRiIi8+PHBhdGggZD0iTTIwIDYwTDgwIDYwTDgwIDkwTDIwIDkwWiIgZmlsbD0iI2QxZDVkYiIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iMzAiIHI9IjgiIGZpbGw9IiNmZmRiNGQiLz48L2c+PC9zdmc+'

// Default fallback for completely missing images
const DEFAULT_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI5MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnMiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzEwYjk4MTtzdG9wLW9wYWNpdHk6MC4xIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDU5NjY5O3N0b3Atb3BhY2l0eTowLjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI5MDAiIGZpbGw9InVybCgjZzIpIi8+PC9zdmc+'

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  // Use placeholder if no src provided
  const imageSrc = src || DEFAULT_PLACEHOLDER

  return (
    <img
      src={didError ? ERROR_IMG_SRC : imageSrc}
      alt={alt || 'Image'}
      className={className}
      style={style}
      {...rest}
      onError={handleError}
      data-original-url={didError ? src : undefined}
    />
  )
}
