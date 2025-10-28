"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Users,
  BookOpen,
  FileText,
  HelpCircle,
  TrendingUp,
  Download,
  Eye,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Settings,
  Upload
} from "lucide-react";
import { Link } from "react-router-dom";
import { FileUpload } from "@/components/ui/fileupload"; // <- new import
import { supabase } from "@/integrations/supabase/client";



const AdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // <- new state
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [accessType, setAccessType] = useState("");

  const handleFileUpload = async (files: File[]) => {
  const file = files[0];
  if (!file) return;
  if (!selectedCategory || !accessType) {
    alert("Please select both category and access type!");
    return;
  }

  setUploading(true);
  const filePath = `uploads/${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from("Templates")
    .upload(filePath, file);

  if (error) {
    console.error("Upload failed:", error.message);
    alert("Upload failed: " + error.message);
    setUploading(false);
    return;
  }

  const { data: publicUrlData } = supabase.storage
    .from("Templates")
    .getPublicUrl(filePath);

  // Insert file info into templates table
  const { error: dbError } = await supabase.from("templates").insert({
    title: file.name,
    description: "",
    category: selectedCategory,
    file_type: file.type,
    file_url: publicUrlData.publicUrl,
    is_premium: accessType === "premium",
    creator_id: (await supabase.auth.getUser()).data.user?.id,
  });

  if (dbError) {
    console.error("Database insert failed:", dbError.message);
    alert("Database insert failed: " + dbError.message);
  } else {
    alert("File uploaded and record saved successfully!");
  }

  setUploading(false);
};



  const stats = [
    { title: "Total Users", value: "12,456", change: "+8.2%", icon: Users, color: "text-primary" },
    { title: "Active Courses", value: "47", change: "+3 this month", icon: BookOpen, color: "text-success" },
    { title: "Templates", value: "156", change: "+12 this month", icon: FileText, color: "text-accent" },
    { title: "Questions Asked", value: "3,248", change: "+156 this week", icon: HelpCircle, color: "text-warning" },
  ];

  const recentUsers = [
    { id: 1, name: "Rahul Sharma", email: "rahul@example.com", joinDate: "2024-01-15", status: "active", courses: 3, templates: 12 },
    { id: 2, name: "Priya Patel", email: "priya@example.com", joinDate: "2024-01-14", status: "active", courses: 1, templates: 5 },
    { id: 3, name: "Arjun Kumar", email: "arjun@example.com", joinDate: "2024-01-13", status: "inactive", courses: 0, templates: 2 },
    { id: 4, name: "Kavya Menon", email: "kavya@example.com", joinDate: "2024-01-12", status: "active", courses: 5, templates: 18 },
    { id: 5, name: "Suresh Gupta", email: "suresh@example.com", joinDate: "2024-01-11", status: "active", courses: 2, templates: 8 },
  ];

  const courses = [
    { id: 1, title: "Startup Registration in India", instructor: "Priya Sharma", enrolled: 1247, status: "published", created: "2024-01-10", category: "Legal" },
    { id: 2, title: "Funding Your Startup", instructor: "Rajesh Kumar", enrolled: 892, status: "published", created: "2024-01-08", category: "Finance" },
    { id: 3, title: "Building Your First Team", instructor: "Anita Desai", enrolled: 654, status: "draft", created: "2024-01-05", category: "HR" },
    { id: 4, title: "Digital Marketing for Startups", instructor: "Kavya Menon", enrolled: 2156, status: "published", created: "2024-01-03", category: "Marketing" },
  ];

  const templates = [
    { id: 1, title: "Business Plan Template", category: "Finance", downloads: 4247, status: "published", created: "2024-01-15", author: "StartupSaathi Team" },
    { id: 2, title: "Pitch Deck Template", category: "Pitch", downloads: 3156, status: "published", created: "2024-01-12", author: "Rajesh Kumar" },
    { id: 3, title: "NDA Template", category: "Legal", downloads: 5632, status: "published", created: "2024-01-10", author: "Priya Sharma" },
    { id: 4, title: "Employee Handbook", category: "HR", downloads: 2134, status: "draft", created: "2024-01-08", author: "Anita Desai" },
  ];

  const questions = [
    { id: 1, question: "How to register a startup in India?", user: "Rahul Sharma", category: "Legal", status: "answered", created: "2024-01-15", responses: 3 },
    { id: 2, question: "What are the tax benefits for startups?", user: "Priya Patel", category: "Finance", status: "pending", created: "2024-01-14", responses: 0 },
    { id: 3, question: "How to protect intellectual property?", user: "Arjun Kumar", category: "Legal", status: "answered", created: "2024-01-13", responses: 2 },
    { id: 4, question: "Best practices for hiring first employees?", user: "Kavya Menon", category: "HR", status: "answered", created: "2024-01-12", responses: 4 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "published":
      case "answered":
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
      case "inactive":
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
            <Badge variant="outline" className="ml-2">Admin</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Content
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, courses, templates, and platform analytics</p>
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
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-xs text-success">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="w-full">
          {/* increased to 6 columns to include Upload tab */}
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="upload">Upload Docs</TabsTrigger> {/* <- new trigger */}
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            {/* ... existing Users content (unchanged) */}
            <Card className="border-border/50 bg-background">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-poppins">Users Management</CardTitle>
                    <CardDescription>Manage platform users and their access</CardDescription>
                  </div>
                  <Button variant="default" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search users..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                  <Select>
                    <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Templates</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.courses}</TableCell>
                        <TableCell>{user.templates}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            {/* ... existing Courses content (unchanged) */}
            <Card className="border-border/50 bg-background">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-poppins">Courses Management</CardTitle>
                    <CardDescription>Manage courses and their content</CardDescription>
                  </div>
                  <Button variant="default" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Enrolled</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>{course.enrolled.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(course.status)}</TableCell>
                        <TableCell>{course.created}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            {/* ... existing Templates content (unchanged) */}
            <Card className="border-border/50 bg-background">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-poppins">Templates Management</CardTitle>
                    <CardDescription>Manage templates and downloadable resources</CardDescription>
                  </div>
                  <Button variant="default" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.title}</TableCell>
                        <TableCell>{template.category}</TableCell>
                        <TableCell>{template.author}</TableCell>
                        <TableCell>{template.downloads.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(template.status)}</TableCell>
                        <TableCell>{template.created}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            {/* ... existing Questions content (unchanged) */}
            <Card className="border-border/50 bg-background">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-poppins">Questions Management</CardTitle>
                    <CardDescription>Manage user questions and expert responses</CardDescription>
                  </div>
                  <Button variant="default" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Response
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell className="font-medium max-w-xs truncate">{question.question}</TableCell>
                        <TableCell>{question.user}</TableCell>
                        <TableCell>{question.category}</TableCell>
                        <TableCell>{getStatusBadge(question.status)}</TableCell>
                        <TableCell>{question.responses}</TableCell>
                        <TableCell>{question.created}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* ... existing Analytics content (unchanged) */}
            <Card className="border-border/50 bg-background">
              <CardHeader>
                <CardTitle className="font-poppins">Platform Analytics</CardTitle>
                <CardDescription>View detailed analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-poppins font-semibold text-foreground">Top Performing Courses</h3>
                    <div className="space-y-3">
                      {courses.slice(0, 3).map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{course.title}</p>
                            <p className="text-sm text-muted-foreground">{course.instructor}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">{course.enrolled.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">enrolled</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-poppins font-semibold text-foreground">Most Downloaded Templates</h3>
                    <div className="space-y-3">
                      {templates.slice(0, 3).map((template) => (
                        <div key={template.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{template.title}</p>
                            <p className="text-sm text-muted-foreground">{template.author}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">{template.downloads.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">downloads</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---------- Upload Docs Tab (NEW) ---------- */}
          {/* ---------- Upload Docs Tab (UPDATED) ---------- */}
          <TabsContent value="upload" className="space-y-6">
            <Card className="border-border/50 bg-background">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-poppins">Upload Documents</CardTitle>
                    <CardDescription>
                      Upload new templates, course materials, or startup resources
                    </CardDescription>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      if (uploadedFiles.length === 0) {
                        alert("Please select a file first!");
                        return;
                      }
                      handleFileUpload(uploadedFiles);
                    }}
                    disabled={uploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="w-full max-w-4xl mx-auto border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-6 space-y-6">

                  {/* Select Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Document Category</label>
                    <Select
                      onValueChange={(value) => setSelectedCategory(value)}
                      value={selectedCategory}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Legal and Compliance">Legal and Compliance</SelectItem>
                        <SelectItem value="Finance and Accounting">Finance and Accounting</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Select Access Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Access Type</label>
                    <Select
                      onValueChange={(value) => setAccessType(value)}
                      value={accessType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Access" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Upload File */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select File</label>
                    <FileUpload onChange={setUploadedFiles} />
                  </div>

                  {/* Show selected files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Selected Files</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {uploadedFiles.map((file, idx) => (
                          <li key={idx}>
                            {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;

