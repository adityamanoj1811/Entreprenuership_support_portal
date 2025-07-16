import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, CheckCircle, Clock, Download, BookOpen, FileText, Users, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const CourseDetail = () => {
  const { id } = useParams();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const course = {
    id: 1,
    title: "Startup Registration in India",
    description: "Complete guide to legally registering your startup in India. Learn about different business structures, documentation requirements, and step-by-step registration process.",
    category: "Legal & Compliance",
    difficulty: "beginner",
    duration: "2-3 hours",
    lessons: [
      {
        title: "Introduction to Startup Registration",
        duration: "10 min",
        type: "video",
        completed: false
      },
      {
        title: "Choosing the Right Business Structure",
        duration: "15 min",
        type: "video",
        completed: false
      },
      {
        title: "Required Documents Checklist",
        duration: "8 min",
        type: "text",
        completed: false
      },
      {
        title: "Digital Signature Certificate (DSC)",
        duration: "12 min",
        type: "video",
        completed: false
      },
      {
        title: "Director Identification Number (DIN)",
        duration: "10 min",
        type: "video",
        completed: false
      },
      {
        title: "Filing Incorporation Documents",
        duration: "20 min",
        type: "video",
        completed: false
      },
      {
        title: "Post-Registration Compliance",
        duration: "15 min",
        type: "text",
        completed: false
      },
      {
        title: "Final Assessment",
        duration: "5 min",
        type: "quiz",
        completed: false
      }
    ],
    enrolled: 1247,
    rating: 4.8,
    reviews: 156,
    instructor: {
      name: "Priya Sharma",
      title: "Corporate Lawyer & Startup Advisor",
      avatar: "PS",
      experience: "8+ years"
    },
    downloads: [
      "Startup_Registration_Checklist.pdf",
      "Business_Structure_Comparison.xlsx",
      "Sample_MoA_Template.docx",
      "Post_Registration_Compliance_Guide.pdf"
    ]
  };

  const toggleLessonComplete = (lessonIndex: number) => {
    if (completedLessons.includes(lessonIndex)) {
      setCompletedLessons(completedLessons.filter(i => i !== lessonIndex));
    } else {
      setCompletedLessons([...completedLessons, lessonIndex]);
    }
  };

  const progress = (completedLessons.length / course.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle font-inter">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/courses" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Courses</span>
            </Link>
            <div className="h-4 w-px bg-border"></div>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-poppins font-bold text-foreground">StartupSaathi</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="default" size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-green-100 text-green-800">
                  {course.difficulty}
                </Badge>
                <Badge variant="outline">
                  {course.category}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-poppins font-bold text-foreground mb-4">
                {course.title}
              </h1>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {course.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.enrolled.toLocaleString()} enrolled
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  {course.rating} ({course.reviews} reviews)
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Course Progress
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {completedLessons.length} of {course.lessons.length} lessons
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>

            {/* Video Player / Content Area */}
            <div className="mb-8">
              <Card className="border-border/50 bg-background">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center rounded-t-lg">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-poppins font-semibold text-foreground mb-2">
                      {course.lessons[currentLesson].title}
                    </h3>
                    <p className="text-muted-foreground">
                      {course.lessons[currentLesson].duration}
                    </p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant={completedLessons.includes(currentLesson) ? "success" : "default"}
                        onClick={() => toggleLessonComplete(currentLesson)}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>
                          {completedLessons.includes(currentLesson) ? "Completed" : "Mark as Complete"}
                        </span>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentLesson === 0}
                        onClick={() => setCurrentLesson(currentLesson - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        disabled={currentLesson === course.lessons.length - 1}
                        onClick={() => setCurrentLesson(currentLesson + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card className="border-border/50 bg-background">
                  <CardHeader>
                    <CardTitle className="font-poppins">What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        <span>Understand different business structures in India</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        <span>Learn about required documents and certificates</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        <span>Step-by-step registration process</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        <span>Post-registration compliance requirements</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-4">
                <Card className="border-border/50 bg-background">
                  <CardHeader>
                    <CardTitle className="font-poppins">Course Resources</CardTitle>
                    <CardDescription>
                      Download templates and guides to help you with your startup registration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.downloads.map((download, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium text-foreground">
                              {download}
                            </span>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="instructor" className="space-y-4">
                <Card className="border-border/50 bg-background">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-lg">
                          {course.instructor.avatar}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="font-poppins">
                          {course.instructor.name}
                        </CardTitle>
                        <CardDescription>
                          {course.instructor.title}
                        </CardDescription>
                        <p className="text-sm text-muted-foreground mt-1">
                          {course.instructor.experience} experience
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Priya is a corporate lawyer specializing in startup law and compliance. 
                      She has helped over 500 startups with their legal foundation and continues 
                      to mentor entrepreneurs across India.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 bg-background sticky top-24">
              <CardHeader>
                <CardTitle className="font-poppins">Course Content</CardTitle>
                <CardDescription>
                  {course.lessons.length} lessons • {course.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        index === currentLesson
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-secondary/30 hover:bg-secondary/50"
                      }`}
                      onClick={() => setCurrentLesson(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {completedLessons.includes(index) ? (
                            <CheckCircle className="h-5 w-5 text-success" />
                          ) : lesson.type === "video" ? (
                            <Play className="h-5 w-5 text-muted-foreground" />
                          ) : lesson.type === "quiz" ? (
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {lesson.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lesson.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;