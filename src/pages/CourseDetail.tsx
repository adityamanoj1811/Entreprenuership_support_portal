import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoPlayer } from "@/components/VideoPlayer";
import Header from "@/components/Header";
import { ArrowLeft, Play, CheckCircle, Clock, Download, BookOpen, FileText, Users, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCourse, useUpdateProgress } from "@/hooks/useCourses";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const { data: course, isLoading } = useCourse(id!);
  const updateProgress = useUpdateProgress();

  useEffect(() => {
    if (course?.userProgress) {
      const completed = course.userProgress
        .filter((p: any) => p.lesson_id && p.progress_percentage === 100)
        .map((p: any) => p.lesson_id);
      setCompletedLessons(completed);
    }
  }, [course]);

  const toggleLessonComplete = async (lessonId: string) => {
    if (!user) {
      toast.error("Please sign in to track your progress");
      return;
    }

    const isCompleted = completedLessons.includes(lessonId);
    const newProgress = isCompleted ? 0 : 100;

    try {
      await updateProgress.mutateAsync({
        courseId: id!,
        lessonId,
        progressPercentage: newProgress
      });

      if (isCompleted) {
        setCompletedLessons(completedLessons.filter(id => id !== lessonId));
      } else {
        setCompletedLessons([...completedLessons, lessonId]);
      }

      toast.success(isCompleted ? "Lesson marked as incomplete" : "Lesson completed!");
    } catch (error) {
      toast.error("Failed to update progress");
    }
  };

  const handleVideoProgress = (currentTime: number, duration: number) => {
    if (!user || !course?.lessons?.[currentLesson]) return;
    
    const progressPercentage = Math.floor((currentTime / duration) * 100);
    
    // Auto-mark as complete when 90% watched
    if (progressPercentage >= 90 && !completedLessons.includes(course.lessons[currentLesson].id)) {
      toggleLessonComplete(course.lessons[currentLesson].id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle font-inter">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-subtle font-inter">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course not found</h1>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = course.lessons?.length 
    ? (completedLessons.length / course.lessons.length) * 100 
    : 0;
  
  const currentLessonData = course.lessons?.[currentLesson];
  const instructor = { 
    full_name: (course.profiles as any)?.full_name || "Instructor", 
    avatar_url: (course.profiles as any)?.avatar_url || null, 
    bio: (course.profiles as any)?.bio || "" 
  };

  return (
    <div className="min-h-screen bg-gradient-subtle font-inter">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-green-100 text-green-800">
                  {course.difficulty || 'beginner'}
                </Badge>
                <Badge variant="outline">
                  {course.categories?.name || 'General'}
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
                  {course.lessons?.reduce((acc, lesson) => acc + (lesson.duration || 0), 0)} min
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {course.lessons?.length || 0} lessons
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  {course.difficulty}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Course Progress
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {completedLessons.length} of {course.lessons?.length || 0} lessons
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>

            {/* Video Player / Content Area */}
            {currentLessonData && (
              <div className="mb-8">
                <Card className="border-border/50 bg-background">
                  <VideoPlayer
                    videoUrl={currentLessonData.video_url}
                    title={currentLessonData.title}
                    onTimeUpdate={handleVideoProgress}
                    onEnded={() => {
                      if (!completedLessons.includes(currentLessonData.id)) {
                        toggleLessonComplete(currentLessonData.id);
                      }
                    }}
                  />
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-poppins font-semibold text-foreground mb-2">
                        {currentLessonData.title}
                      </h3>
                      {currentLessonData.content && (
                        <div className="prose prose-sm text-muted-foreground">
                          {currentLessonData.content}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant={completedLessons.includes(currentLessonData.id) ? "default" : "outline"}
                          onClick={() => toggleLessonComplete(currentLessonData.id)}
                          className="flex items-center space-x-2"
                          disabled={updateProgress.isPending}
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>
                            {completedLessons.includes(currentLessonData.id) ? "Completed" : "Mark as Complete"}
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
                          disabled={!course.lessons || currentLesson === course.lessons.length - 1}
                          onClick={() => setCurrentLesson(currentLesson + 1)}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

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
                      Download additional materials and resources for this course
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Course resources will be available after course completion
                      </p>
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
                          {instructor.full_name?.charAt(0) || 'I'}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="font-poppins">
                          {instructor.full_name || 'Course Instructor'}
                        </CardTitle>
                        <CardDescription>
                          Startup Expert & Educator
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {instructor.bio || 'An experienced professional dedicated to helping entrepreneurs succeed in their startup journey.'}
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
                  {course.lessons?.length || 0} lessons • {course.lessons?.reduce((acc, lesson) => acc + (lesson.duration || 0), 0)} min
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.lessons?.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        index === currentLesson
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-secondary/30 hover:bg-secondary/50"
                      }`}
                      onClick={() => setCurrentLesson(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {completedLessons.includes(lesson.id) ? (
                            <CheckCircle className="h-5 w-5 text-success" />
                          ) : lesson.video_url ? (
                            <Play className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {lesson.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lesson.duration ? `${lesson.duration} min` : 'Content lesson'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No lessons available</p>
                    </div>
                  )}
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