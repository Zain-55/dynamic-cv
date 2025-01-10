import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Linkedin, ExternalLink } from 'lucide-react'
import type { ResumeData } from '@/app/type/resume'

export function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <Card className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-[#2D3748] text-white p-6 print:bg-white print:text-black">
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32 rounded-full border-4 border-[#4FD1C5] overflow-hidden">
              <Image
                src={data.personalInfo.profileImage || "/placeholder.svg?height=128&width=128"}
                alt="Profile picture"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-600 hover:bg-gray-700 print:bg-gray-200 print:text-black"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">EDUCATION</h2>
            <div className="space-y-2">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p>{edu.institution}</p>
                  <p className="text-sm text-gray-300 print:text-gray-600">{edu.location}</p>
                  <p className="text-sm text-gray-300 print:text-gray-600">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">LANGUAGES</h2>
            <div className="space-y-2">
              {data.languages.map((lang, index) => (
                <div key={index}>
                  <p className="font-bold">{lang.name}</p>
                  <p className="text-sm text-gray-300 print:text-gray-600">{lang.proficiency}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interests Section */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">INTERESTS</h2>
            <div className="space-y-2">
              {data.interests.map((interest, index) => (
                <p key={index}>{interest.name}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{data.personalInfo.name}</h1>
            <h2 className="text-xl text-[#4FD1C5] mt-1">{data.personalInfo.title}</h2>
            <p className="mt-4 text-gray-600">{data.personalInfo.summary}</p>
          </div>

          {/* Contact Info */}
          <div className="mt-6 bg-[#2D3748] text-white p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 print:bg-white print:text-black print:border print:border-gray-200">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{data.personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-5 h-5" />
              <span>linkedin.com/in/{data.personalInfo.name.toLowerCase().replace(' ', '')}</span>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">WORK EXPERIENCE</h2>
            <div className="space-y-6">
              {data.workExperience.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-[#4FD1C5]">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#4FD1C5]" />
                  <div>
                    <h3 className="text-xl font-bold">{exp.position}</h3>
                    <h4 className="text-lg">{exp.company}</h4>
                    <div className="flex justify-between text-gray-600 mt-1">
                      <span>{exp.startDate} - {exp.endDate}</span>
                      <span>{exp.location}</span>
                    </div>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses & Certifications */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">COURSES & CERTIFICATIONS</h2>
            <div className="space-y-2">
              {data.courses.map((course, index) => (
                <div key={index} className="flex items-start gap-2">
                  <ExternalLink className="w-4 h-4 mt-1 text-[#4FD1C5]" />
                  <div>
                    <p className="font-medium">{course.name}</p>
                    <p className="text-sm text-gray-600">{course.provider}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

