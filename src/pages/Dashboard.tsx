import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Download, Trophy, Clock, Users } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useUserProgress, useUserAchievements } from "@/hooks/useUserProgress";
import Header from "@/components/Header";

const Dashboard = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const { data: profile } = useProfile();
  const { data: userProgress } = useUserProgress();
  const { data: achievements } = useUserAchievements();

  // Redirect if not authenticated
  if (!authLoading && !authUser) {
    return <Navigate to="/auth" replace />;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = [
    {
      title: "Courses Completed",
      value: "4",
      total: "12",
      icon: BookOpen,
      color: "text-primary",
      progress: 33
    },
    {
      title: "Templates Downloaded",
      value: "23",
      icon: Download,
      color: "text-accent",
      trend: "+5 this month"
    },
    {
      title: "Questions Asked",
      value: "8",
      icon: Users,
      color: "text-success",
      trend: "+2 this week"
    },
    {
      title: "Study Hours",
      value: "34",
      icon: Clock,
      color: "text-warning",
      trend: "+6 this week"
    },
  ];

  const recentActivity = [
    {
      type: "course_complete",
      title: "Completed: GST for Startups",
      time: "2 hours ago",
      icon: Trophy,
      color: "text-success"
    },
    {
      type: "template_download",
      title: "Downloaded: Business Plan Template",
      time: "1 day ago",
      icon: Download,
      color: "text-primary"
    },
    {
      type: "question_asked",
      title: "Asked: How to register trademark?",
      time: "2 days ago",
      icon: Users,
      color: "text-accent"
    },
    {
      type: "course_start",
      title: "Started: Digital Marketing for Startups",
      time: "3 days ago",
      icon: BookOpen,
      color: "text-warning"
    },
  ];

  const inProgressCourses = [
    {
      id: 1,
      title: "Startup Registration in India",
      progress: 75,
      lessons: 8,
      completedLessons: 6,
      lastAccessed: "2 hours ago",
      category: "Legal"
    },
    {
      id: 2,
      title: "Digital Marketing for Startups",
      progress: 25,
      lessons: 15,
      completedLessons: 4,
      lastAccessed: "1 day ago",
      category: "Marketing"
    },
    {
      id: 3,
      title: "Building Your First Team",
      progress: 60,
      lessons: 10,
      completedLessons: 6,
      lastAccessed: "3 days ago",
      category: "HR"
    },
  ];

  const recommendations = [
    {
      id: 1,
      title: "Funding Your Startup",
      description: "Learn about different funding options",
      reason: "Based on your interest in business planning",
      category: "Finance",
      difficulty: "Intermediate",
      duration: "3-4 hours"
    },
    {
      id: 2,
      title: "Product Development Basics",
      description: "Building your first product from idea to launch",
      reason: "Popular among entrepreneurs like you",
      category: "Product",
      difficulty: "Intermediate",
      duration: "5-6 hours"
    },
  ];

  const badges = [
    {
      title: "Legal Explorer",
      description: "Completed 2 legal courses",
      icon: "🏆",
      earned: true
    },
    {
      title: "Template Collector",
      description: "Downloaded 20+ templates",
      icon: "📚",
      earned: true
    },
    {
      title: "Active Learner",
      description: "7-day learning streak",
      icon: "🔥",
      earned: true
    },
    {
      title: "Course Completionist",
      description: "Complete 10 courses",
      icon: "💎",
      earned: false
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle font-geist">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-geist font-bold text-foreground mb-2">
            Welcome back, {profile?.display_name || authUser?.email?.split('@')[0] || 'Entrepreneur'}!
          </h1>
          <p className="text-muted-foreground">
            Track your progress and continue your startup journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50 bg-background">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-background to-secondary flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  {stat.trend && (
                    <Badge variant="outline" className="text-xs">
                      {stat.trend}
                    </Badge>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                  {stat.total && <span className="text-sm text-muted-foreground">/{stat.total}</span>}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>
                {stat.progress && (
                  <Progress value={stat.progress} className="h-2 mt-3" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <Card className="border-border/50 bg-background">
              <CardHeader>
                <CardTitle className="font-geist">Continue Learning</CardTitle>
                <CardDescription>
                  Pick up where you left off
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inProgressCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-geist font-semibold text-foreground">
                            {course.title}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {course.category}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          <span>{course.completedLessons} of {course.lessons} lessons</span>
                          <span>Last accessed: {course.lastAccessed}</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Link to={`/courses/${course.id}`} className="ml-4">
                        <Button variant="outline" size="sm">
                          Continue
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-border/50 bg-background">
              <CardHeader>
                <CardTitle className="font-geist">Recommended for You</CardTitle>
                <CardDescription>
                  Based on your learning preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-geist font-semibold text-foreground">
                            {course.title}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {course.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {course.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{course.difficulty}</span>
                          <span>{course.duration}</span>
                        </div>
                        <p className="text-xs text-primary mt-1">
                          {course.reason}
                        </p>
                      </div>
                      <Link to={`/courses/${course.id}`} className="ml-4">
                        <Button variant="default" size="sm">
                          Start Course
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <Card className="border-border/50 bg-background">
              <CardHeader>
                <CardTitle className="font-geist">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-background to-secondary flex items-center justify-center flex-shrink-0`}>
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {activity.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="border-border/50 bg-background">
              <CardHeader>
                <CardTitle className="font-geist">Your Rewards</CardTitle>
                <CardDescription>
                  Achievements & Milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {badges.map((badge, index) => (
                    <div key={index} className={`relative overflow-hidden p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${badge.earned ? 'border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg shadow-primary/20' : 'border-border bg-muted/30'}`}>
                      <div className="flex items-center space-x-4">
                        <div className={`relative w-12 h-12 rounded-full flex items-center justify-center ${badge.earned ? 'bg-gradient-primary shadow-glow' : 'bg-muted'}`}>
                          <span className="text-2xl">{badge.icon}</span>
                          {badge.earned && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background flex items-center justify-center">
                              <div className="w-2 h-2 bg-background rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-geist font-semibold text-sm ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {badge.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {badge.description}
                          </p>
                          {badge.earned && (
                            <Badge variant="outline" className="mt-2 text-xs bg-success/10 text-success border-success/20">
                              Earned
                            </Badge>
                          )}
                        </div>
                      </div>
                      {badge.earned && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-fade-in"></div>
                      )}
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

export default Dashboard;