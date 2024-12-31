'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plus, Trash2 } from 'lucide-react'
import type { ResumeData } from '../type/resume'

export function ResumeForm({ onSubmit }: { onSubmit: (data: ResumeData) => void }) {
  const [formData, setFormData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      profileImage: "",
    },
    skills: [{ name: '' }],
    education: [{
        degree: '', institution: '', graduationYear: '',
        location: undefined,
        graduationDate: undefined
    }],
    languages: [{ name: '', proficiency: '' }],
    workExperience: [{ position: '', company: '', location: '', startDate: '', endDate: '', achievements: [''] }],
    courses: [{ name: '', provider: '' }],
    interests: [{ name: '' }],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const updatePersonalInfo = (field: string, value: string | File | null | string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const addListItem = (field: keyof ResumeData, initialValue: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field])
        ? [...(prev[field] as any[]), initialValue]
        : { ...prev[field], ...initialValue }
    }))
  }

  const updateListItem = (field: keyof ResumeData, index: number, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field])
        ? (prev[field] as any[]).map((item, i) => i === index ? value : item)
        : { ...prev[field], ...value }
    }))
  }

  const removeListItem = (field: keyof ResumeData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field])
        ? (prev[field] as any[]).filter((_, i) => i !== index)
        : prev[field]
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Enter your basic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.personalInfo.name}
                onChange={(e) => updatePersonalInfo('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                value={formData.personalInfo.title}
                onChange={(e) => updatePersonalInfo('title', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={formData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image</Label>
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    updatePersonalInfo('profileImage', reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Add your key skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={skill.name}
                onChange={(e) => updateListItem('skills', index, { name: e.target.value })}
                placeholder="Skill name"
                required
              />
              {formData.skills.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeListItem('skills', index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addListItem('skills', { name: '' })} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>Add your educational background</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.education.map((edu, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg relative">
              {formData.education.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeListItem('education', index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <div className="space-y-2">
                <Label htmlFor={`degree-${index}`}>Degree</Label>
                <Input
                  id={`degree-${index}`}
                  value={edu.degree}
                  onChange={(e) => updateListItem('education', index, { ...edu, degree: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`institution-${index}`}>Institution</Label>
                <Input
                  id={`institution-${index}`}
                  value={edu.institution}
                  onChange={(e) => updateListItem('education', index, { ...edu, institution: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`graduationYear-${index}`}>Graduation Year</Label>
                <Input
                  id={`graduationYear-${index}`}
                  value={edu.graduationYear}
                  onChange={(e) => updateListItem('education', index, { ...edu, graduationYear: e.target.value })}
                  required
                />
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addListItem('education', { degree: '', institution: '', graduationYear: '' })} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
          <CardDescription>Add languages you speak</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.languages.map((lang, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={lang.name}
                onChange={(e) => updateListItem('languages', index, { ...lang, name: e.target.value })}
                placeholder="Language name"
                required
              />
              <Input
                value={lang.proficiency}
                onChange={(e) => updateListItem('languages', index, { ...lang, proficiency: e.target.value })}
                placeholder="Proficiency"
                required
              />
              {formData.languages.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeListItem('languages', index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addListItem('languages', { name: '', proficiency: '' })} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>Add your work history</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.workExperience.map((exp, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg relative">
              {formData.workExperience.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeListItem('workExperience', index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <div className="space-y-2">
                <Label htmlFor={`position-${index}`}>Position</Label>
                <Input
                  id={`position-${index}`}
                  value={exp.position}
                  onChange={(e) => updateListItem('workExperience', index, { ...exp, position: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`company-${index}`}>Company</Label>
                <Input
                  id={`company-${index}`}
                  value={exp.company}
                  onChange={(e) => updateListItem('workExperience', index, { ...exp, company: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`exp-location-${index}`}>Location</Label>
                <Input
                  id={`exp-location-${index}`}
                  value={exp.location}
                  onChange={(e) => updateListItem('workExperience', index, { ...exp, location: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    value={exp.startDate}
                    onChange={(e) => updateListItem('workExperience', index, { ...exp, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    value={exp.endDate}
                    onChange={(e) => updateListItem('workExperience', index, { ...exp, endDate: e.target.value })}
                    placeholder="Present (if current job)"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Achievements</Label>
                {exp.achievements.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex items-center gap-2">
                    <Input
                      value={achievement}
                      onChange={(e) => {
                        const newAchievements = [...exp.achievements];
                        newAchievements[achievementIndex] = e.target.value;
                        updateListItem('workExperience', index, { ...exp, achievements: newAchievements });
                      }}
                      placeholder="Achievement"
                      required
                    />
                    {exp.achievements.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newAchievements = exp.achievements.filter((_, i) => i !== achievementIndex);
                          updateListItem('workExperience', index, { ...exp, achievements: newAchievements });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => {
                  const newExp = {...exp, achievements: [...exp.achievements, '']};
                  updateListItem('workExperience', index, newExp);
                }} className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addListItem('workExperience', { position: '', company: '', location: '', startDate: '', endDate: '', achievements: [''] })} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Work Experience
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
          <CardDescription>Add relevant courses or certifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.courses.map((course, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={course.name}
                onChange={(e) => updateListItem('courses', index, { ...course, name: e.target.value })}
                placeholder="Course name"
                required
              />
              <Input
                value={course.provider}
                onChange={(e) => updateListItem('courses', index, { ...course, provider: e.target.value })}
                placeholder="Provider"
                required
              />
              {formData.courses.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeListItem('courses', index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addListItem('courses', { name: '', provider: '' })} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interests</CardTitle>
          <CardDescription>Add your personal interests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.interests.map((interest, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={interest.name}
                onChange={(e) => updateListItem('interests', index, { name: e.target.value })}
                placeholder="Interest"
                required
              />
              {formData.interests.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeListItem('interests', index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addListItem('interests', { name: '' })} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Interest
          </Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Generate Resume</Button>
    </form>
  )
}

