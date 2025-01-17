'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"

interface OtpInputProps {
  length: number
  onComplete: (value: string) => void
  inputClassName?: string
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onComplete, inputClassName = "w-10 h-10 text-center text-lg" }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)

    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLInputElement).focus()
    }

    if (newOtp.every(v => v !== '') && newOtp.join('').length === length) {
      onComplete(newOtp.join(''))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((_, index) => (
        <Input
          key={index}
          type="text"
          maxLength={1}
          value={otp[index]}
          ref={(input) => (inputRefs.current[index] = input)}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={inputClassName}
        />
      ))}
    </div>
  )
}

export default OtpInput

