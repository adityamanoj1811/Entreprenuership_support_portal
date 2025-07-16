import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Clock, Users, BookOpen, PlayCircle, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CourseExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "legal", label: "Legal & Compliance" },
    { id: "finance", label: "Finance & Funding" },
    { id: "hiring", label: "Hiring & HR" },
    { id: "marketing", label: "Marketing & Sales" },
    { id: "operations", label: "Operations" },
    { id: "product", label: "Product Development" },
  ];

  const courses = [
    {
      id: 1,
      title: "Startup Registration in India",
      description: "Complete guide to legally registering your startup in India",
      category: "legal",
      difficulty: "beginner",
      duration: "2-3 hours",
      lessons: 8,
      enrolled: 1247,
      rating: 4.8,
      progress: 0,
      instructor: "Priya Sharma",
      thumbnail: "bg-gradient-to-r from-blue-500 to-purple-600",
      tags: ["Registration", "Legal", "Compliance"],
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      title: "Funding Your Startup",
      description: "Learn different funding options available for Indian startups",
      category: "finance",
      difficulty: "intermediate",
      duration: "3-4 hours",
      lessons: 12,
      enrolled: 892,
      rating: 4.9,
      progress: 45,
      instructor: "Rajesh Kumar",
      thumbnail: "bg-gradient-to-r from-green-500 to-teal-600",
      tags: ["Funding", "Investment", "Pitch Deck"],
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      title: "Building Your First Team",
      description: "Hiring strategies and team building for early-stage startups",
      category: "hiring",
      difficulty: "intermediate",
      duration: "2-3 hours",
      lessons: 10,
      enrolled: 654,
      rating: 4.7,
      progress: 0,
      instructor: "Anita Desai",
      thumbnail: "bg-gradient-to-r from-pink-500 to-red-600",
      tags: ["Hiring", "Team Building", "Culture"],
      lastUpdated: "3 days ago"
    },
    {
      id: 4,
      title: "GST for Startups",
      description: "Understanding GST requirements and compliance for startups",
      category: "finance",
      difficulty: "beginner",
      duration: "1-2 hours",
      lessons: 6,
      enrolled: 1123,
      rating: 4.6,
      progress: 100,
      instructor: "Suresh Patel",
      thumbnail: "bg-gradient-to-r from-yellow-500 to-orange-600",
      tags: ["GST", "Taxation", "Compliance"],
      lastUpdated: "5 days ago"
    },
    {
      id: 5,
      title: "Digital Marketing for Startups",
      description: "Cost-effective marketing strategies for early-stage startups",
      category: "marketing",
      difficulty: "beginner",
      duration: "4-5 hours",
      lessons: 15,
      enrolled: 2156,
      rating: 4.8,
      progress: 23,
      instructor: "Kavya Menon",
      thumbnail: "bg-gradient-to-r from-purple-500 to-indigo-600",
      tags: ["Marketing", "Digital", "Growth"],
      lastUpdated: "1 day ago"
    },
    {
      id: 6,
      title: "Product Development Basics",
      description: "Building your first product: from idea to launch",
      category: "product",
      difficulty: "intermediate",
      duration: "5-6 hours",
      lessons: 18,
      enrolled: 743,
      rating: 4.9,
      progress: 0,
      instructor: "Arjun Singh",
      thumbnail: "bg-gradient-to-r from-cyan-500 to-blue-600",
      tags: ["Product", "Development", "MVP"],
      lastUpdated: "4 days ago"
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty;
    const matchesDuration = selectedDuration === "all" || course.duration.includes(selectedDuration);
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration;
  });

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

  return (
    <div className="min-h-screen bg-gradient-subtle font-inter">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-poppins font-bold text-foreground">StartupSaathi</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-primary font-medium">
              Courses
            </Link>
            <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="default" size="sm">Get Started</Button>
          </div>
        </div>
      </header>

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
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.label}
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
                
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Duration</SelectItem>
                    <SelectItem value="1-2">1-2 hours</SelectItem>
                    <SelectItem value="2-3">2-3 hours</SelectItem>
                    <SelectItem value="3-4">3-4 hours</SelectItem>
                    <SelectItem value="4-5">4-5 hours</SelectItem>
                    <SelectItem value="5-6">5-6 hours</SelectItem>
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
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-background cursor-pointer">
                  <div className={`h-48 rounded-t-lg ${course.thumbnail} flex items-center justify-center`}>
                    <BookOpen className="h-12 w-12 text-white" />
                  </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {getProgressIcon(course.progress)}
                        <span className="text-sm text-muted-foreground">
                          {course.progress === 0 ? "Start" : 
                           course.progress === 100 ? "Complete" : 
                           `${course.progress}%`}
                        </span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg font-poppins font-semibold text-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                    
                    <CardDescription className="text-muted-foreground line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {course.enrolled.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        {course.rating}
                      </div>
                    </div>
                    
                    {course.progress > 0 && course.progress < 100 && (
                      <div className="mb-3">
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {course.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        by {course.instructor}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {course.lastUpdated}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
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