import { useState } from 'react'
import logo from '../assets/logo.png'
import onboardingImg from '../assets/onboarding_screen.png'

const SLIDES = [
  {
    visual: 'image' as const,
    title: 'Welcome to VMail',
    description: 'The fast, simple way to record your business transactions — anytime, anywhere.',
  },
  {
    visual: 'form' as const,
    title: 'Log Every Transaction',
    description: 'Record income and expenses with a simple form. Voice entry powered by AI is coming soon.',
  },
  {
    visual: 'ledger' as const,
    title: 'Your Ledger, Always Ready',
    description: 'See your income, expenses, and net balance in real time — all in one place.',
  },
]

function FormIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-40">
      <rect x="20" y="10" width="160" height="140" rx="12" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />
      <rect x="36" y="30" width="128" height="12" rx="4" fill="#dcfce7" />
      <rect x="36" y="52" width="128" height="12" rx="4" fill="#dcfce7" />
      <rect x="36" y="74" width="80" height="12" rx="4" fill="#dcfce7" />
      <rect x="60" y="104" width="80" height="28" rx="8" fill="#185009" />
      <rect x="76" y="114" width="48" height="8" rx="3" fill="white" opacity="0.9" />
    </svg>
  )
}

function LedgerIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-40">
      <rect x="20" y="10" width="160" height="140" rx="12" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />
      {/* Income bar */}
      <rect x="40" y="50" width="36" height="70" rx="4" fill="#22c55e" />
      {/* Expense bar */}
      <rect x="90" y="80" width="36" height="40" rx="4" fill="#f87171" />
      {/* Balance bar */}
      <rect x="140" y="60" width="36" height="60" rx="4" fill="#185009" />
      {/* Labels */}
      <rect x="40" y="128" width="36" height="6" rx="2" fill="#bbf7d0" />
      <rect x="90" y="128" width="36" height="6" rx="2" fill="#fecaca" />
      <rect x="140" y="128" width="36" height="6" rx="2" fill="#dcfce7" />
    </svg>
  )
}

interface OnboardingProps {
  onDone: () => void
}

export default function Onboarding({ onDone }: OnboardingProps) {
  const [index, setIndex] = useState(0)
  const slide = SLIDES[index]
  const isLast = index === SLIDES.length - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <img src={logo} alt="VMail" className="h-8 w-auto" />
          <button
            onClick={onDone}
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Visual */}
        <div className="flex justify-center items-center py-6 bg-gray-50 dark:bg-gray-900/40 mx-6 rounded-xl mt-2">
          {slide.visual === 'image' && (
            <img src={onboardingImg} alt="VMail onboarding" className="h-40 object-contain" />
          )}
          {slide.visual === 'form' && <FormIllustration />}
          {slide.visual === 'ledger' && <LedgerIllustration />}
        </div>

        {/* Text */}
        <div className="px-6 pt-5 pb-2 text-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{slide.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{slide.description}</p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 pt-4 pb-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all duration-200 ${
                i === index
                  ? 'w-5 h-2 bg-primary-600'
                  : 'w-2 h-2 bg-gray-200 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 pt-3 flex gap-3">
          {index > 0 && (
            <button
              onClick={() => setIndex(i => i - 1)}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={isLast ? onDone : () => setIndex(i => i + 1)}
            className="flex-1 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
          >
            {isLast ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
