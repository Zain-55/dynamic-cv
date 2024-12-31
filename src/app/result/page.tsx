'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ResumePreview } from '@/app/components/preview'
import { Button } from "@/components/ui/button"
import type { ResumeData } from '@/app/type/resume'
import jsPDF from 'jspdf';

export default function ResultPage() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedData = localStorage.getItem('resumeData')
    if (storedData) {
      setResumeData(JSON.parse(storedData))
    } else {
      router.push('/')
    }
  }, [router])

  const handleDownloadPDF = () => {
    if (!resumeData) return;

    const doc = new jsPDF();
    
    // Add content to the PDF
    doc.setFontSize(20);
    doc.text(resumeData.personalInfo.name, 20, 20);
    doc.setFontSize(14);
    doc.text(resumeData.personalInfo.title, 20, 30);
    doc.setFontSize(12);
    doc.text(resumeData.personalInfo.summary, 20, 40, { maxWidth: 170 });

    // Add more sections (work experience, education, etc.) here...

    // Save the PDF
    doc.save(`${resumeData.personalInfo.name.replace(' ', '_')}_Resume.pdf`);
  };

  if (!resumeData) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Resume</h1>
        <div className="max-w-4xl mx-auto space-y-6">
          <ResumePreview data={resumeData} />
          <div className="flex justify-center space-x-4">
            <Button onClick={handleDownloadPDF}>Download PDF</Button>
            <Button variant="outline" onClick={() => router.push('/')}>Edit Resume</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

