'use client'


import { useRouter } from 'next/navigation'
import { ResumeForm } from '@/app/components/resume-form'
import type { ResumeData } from '@/app/type/resume'

export default function Page() {
  const router = useRouter()

  const handleFormSubmit = (data: ResumeData) => {
    // In a real application, you might want to use a more robust method to pass data
    // such as storing it in a server-side session or a secure client-side storage
    localStorage.setItem('resumeData', JSON.stringify(data))
    router.push('/result')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Dynamic Resume Builder</h1>
        <div className="max-w-4xl mx-auto">
          <ResumeForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  )
}

