import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import { Search, Filter, Clock, Users, BookOpen, PlayCircle, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCourses, useCategories } from "@/hooks/useCourses";
import { useAuth } from "@/contexts/AuthContext";

const CourseExplorer = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: courses = [], isLoading: coursesLoading } = useCourses({
    category: selectedCategory,
    difficulty: selectedDifficulty,
    search: searchQuery
  });

  const allCategories = [
    { id: "all", name: "All Categories" },
    ...categories
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressIcon = (progress: number) => {
    if (progress === 0) return <PlayCircle className="h-4 w-4 text-primary" />;
    if (progress === 100) return <CheckCircle className="h-4 w-4 text-success" />;
    return <Clock className="h-4 w-4 text-warning" />;
  };

  const getProgressForCourse = (courseId: string) => {
    // This would be calculated from user progress data
    return 0;
  };

  if (coursesLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-background bg-grid font-inter">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-border/50 bg-background">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-grid font-inter">
      <Header />

      {/* Page Header */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-poppins font-bold text-foreground mb-4">
              Explore
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Courses</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn from structured courses designed specifically for Indian entrepreneurs
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  className="pl-10 bg-background border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {courses.length} courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const progress = getProgressForCourse(course.id);
              const lessonsCount = course.lessons?.length || 0;
              const duration = Math.ceil((course.duration_minutes || 0) / 60);
              
              return (
                <Link key={course.id} to={`/courses/${course.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-background cursor-pointer">
                    <div className="h-48 rounded-t-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-white" />
                    </div>
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getDifficultyColor(course.difficulty || 'beginner')}>
                          {course.difficulty || 'beginner'}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {getProgressIcon(progress)}
                          <span className="text-sm text-muted-foreground">
                            {progress === 0 ? "Start" : 
                             progress === 100 ? "Complete" : 
                             `${progress}%`}
                          </span>
                        </div>
                      </div>
                      
                      <CardTitle className="text-lg font-poppins font-semibold text-foreground group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                      
                      <CardDescription className="text-muted-foreground line-clamp-2">
                        {course.short_description || course.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {duration}h
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {lessonsCount} lessons
                          </div>
                        </div>
                      </div>
                      
                      {progress > 0 && progress < 100 && (
                        <div className="mb-3">
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {course.categories?.name || 'General'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(course.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          
          {courses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-poppins font-semibold text-foreground mb-2">
                No courses found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse all courses
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseExplorer;