import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertCircle, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  User, 
  Globe,
  Eye,
  Code,
  Filter,
  TrendingUp,
  Clock,
  Search,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import CodeEditor from "@/components/CodeEditor";
import LivePreview from "@/components/LivePreview";

// Mock community projects data
const mockCommunityProjects = [
  {
    id: 1,
    title: "Responsive Landing Page",
    description: "A clean and responsive landing page using flexbox and grid.",
    author: {
      id: 101,
      username: "webdev_pro",
      avatar: null
    },
    createdAt: "2025-03-15T12:30:00Z",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <title>Responsive Landing Page</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Arial', sans-serif; line-height: 1.6; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    header { background: #333; color: white; padding: 1rem 0; }
    nav { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: bold; }
    .nav-links { display: flex; list-style: none; }
    .nav-links li { margin-left: 1rem; }
    .nav-links a { color: white; text-decoration: none; }
    .hero { height: 70vh; background: #f4f4f4; display: flex; align-items: center; }
    .hero-content { width: 50%; }
    h1 { font-size: 2.5rem; margin-bottom: 1rem; }
    .btn { display: inline-block; background: #333; color: white; padding: 0.5rem 1.5rem; text-decoration: none; border-radius: 4px; }
    .features { padding: 3rem 0; }
    .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .feature-card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    @media (max-width: 768px) {
      .hero-content { width: 100%; text-align: center; }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <div class="logo">MyCompany</div>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>Modern Web Solutions</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.</p>
        <a href="#" class="btn">Get Started</a>
      </div>
    </div>
  </section>
  <section class="features">
    <div class="container">
      <h2>Our Features</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <h3>Responsive Design</h3>
          <p>Looks great on any device, from phones to desktops.</p>
        </div>
        <div class="feature-card">
          <h3>Fast Performance</h3>
          <p>Optimized code ensures your website loads quickly.</p>
        </div>
        <div class="feature-card">
          <h3>24/7 Support</h3>
          <p>Our team is always available to help with any issues.</p>
        </div>
      </div>
    </div>
  </section>
</body>
</html>`,
    likes: 156,
    comments: [
      {
        id: 1001,
        author: {
          id: 102,
          username: "css_wizard",
          avatar: null
        },
        content: "Great work on the responsive design! The mobile view looks perfect.",
        createdAt: "2025-03-15T14:25:00Z",
        likes: 12
      },
      {
        id: 1002,
        author: {
          id: 103,
          username: "html_master",
          avatar: null
        },
        content: "Clean markup and structure. I would suggest adding some semantic HTML elements like <section> and <article>.",
        createdAt: "2025-03-15T16:35:00Z",
        likes: 8
      }
    ],
    tags: ["responsive", "flexbox", "grid", "landing-page"]
  },
  {
    id: 2,
    title: "Interactive Form with Validation",
    description: "A contact form with client-side validation and interactive feedback.",
    author: {
      id: 104,
      username: "form_guru",
      avatar: null
    },
    createdAt: "2025-03-12T09:15:00Z",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <title>Contact Form</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Arial', sans-serif; line-height: 1.6; background: #f9f9f9; }
    .container { max-width: 600px; margin: 2rem auto; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { text-align: center; margin-bottom: 2rem; color: #333; }
    .form-group { margin-bottom: 1.5rem; }
    label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
    input, textarea { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; }
    input:focus, textarea:focus { outline: none; border-color: #4d90fe; }
    .error { color: red; font-size: 0.85rem; margin-top: 0.5rem; display: none; }
    .invalid input, .invalid textarea { border-color: red; }
    .invalid .error { display: block; }
    .btn { background: #4d90fe; color: white; border: none; border-radius: 4px; padding: 0.75rem 1.5rem; cursor: pointer; font-size: 1rem; }
    .btn:hover { background: #357ae8; }
    .success-message { background: #dff0d8; color: #3c763d; padding: 1rem; border-radius: 4px; text-align: center; margin-top: 1rem; display: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Contact Us</h1>
    <form id="contactForm">
      <div class="form-group" id="nameGroup">
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="Your name">
        <div class="error">Please enter your name</div>
      </div>
      <div class="form-group" id="emailGroup">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Your email">
        <div class="error">Please enter a valid email address</div>
      </div>
      <div class="form-group" id="messageGroup">
        <label for="message">Message</label>
        <textarea id="message" rows="5" placeholder="Your message"></textarea>
        <div class="error">Please enter your message</div>
      </div>
      <button type="submit" class="btn">Send Message</button>
      <div class="success-message" id="successMessage">Thank you! Your message has been sent.</div>
    </form>
  </div>
  
  <script>
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;
      
      // Validate name
      const name = document.getElementById('name');
      if (!name.value.trim()) {
        document.getElementById('nameGroup').classList.add('invalid');
        valid = false;
      } else {
        document.getElementById('nameGroup').classList.remove('invalid');
      }
      
      // Validate email
      const email = document.getElementById('email');
      const emailRegex = /^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        document.getElementById('emailGroup').classList.add('invalid');
        valid = false;
      } else {
        document.getElementById('emailGroup').classList.remove('invalid');
      }
      
      // Validate message
      const message = document.getElementById('message');
      if (!message.value.trim()) {
        document.getElementById('messageGroup').classList.add('invalid');
        valid = false;
      } else {
        document.getElementById('messageGroup').classList.remove('invalid');
      }
      
      // If valid, show success message
      if (valid) {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('contactForm').reset();
      }
    });
  </script>
</body>
</html>`,
    likes: 92,
    comments: [
      {
        id: 2001,
        author: {
          id: 105,
          username: "js_developer",
          avatar: null
        },
        content: "Nice form validation! I would recommend adding some transition effects to make the error messages appear more smoothly.",
        createdAt: "2025-03-12T11:20:00Z",
        likes: 5
      }
    ],
    tags: ["form", "validation", "javascript", "interactive"]
  },
  {
    id: 3,
    title: "Animated Product Cards",
    description: "CSS-animated product cards with hover effects and transitions.",
    author: {
      id: 106,
      username: "animation_expert",
      avatar: null
    },
    createdAt: "2025-03-10T15:45:00Z",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <title>Product Cards</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Arial', sans-serif; background: #f5f5f5; padding: 2rem; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { text-align: center; margin-bottom: 2rem; color: #333; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
    .product-card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,0.1); transition: transform 0.3s, box-shadow 0.3s; }
    .product-card:hover { transform: translateY(-10px); box-shadow: 0 15px 20px rgba(0,0,0,0.15); }
    .product-image { height: 200px; overflow: hidden; position: relative; }
    .product-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .product-card:hover .product-image img { transform: scale(1.1); }
    .product-badge { position: absolute; top: 10px; right: 10px; background: #ff5722; color: white; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: bold; }
    .product-info { padding: 1.5rem; }
    .product-title { font-size: 1.25rem; margin-bottom: 0.5rem; color: #333; }
    .product-price { font-size: 1.5rem; font-weight: bold; color: #ff5722; margin-bottom: 0.5rem; }
    .product-description { color: #666; margin-bottom: 1rem; font-size: 0.9rem; }
    .btn { display: inline-block; background: #ff5722; color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-weight: bold; transition: background 0.3s; }
    .btn:hover { background: #e64a19; }
    .sold-out .product-image::before { content: 'SOLD OUT'; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; }
    .sold-out .btn { background: #999; pointer-events: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Featured Products</h1>
    <div class="product-grid">
      <div class="product-card">
        <div class="product-image">
          <img src="https://via.placeholder.com/400x300/f5f5f5/333333?text=Product+1" alt="Product 1">
          <div class="product-badge">New</div>
        </div>
        <div class="product-info">
          <h2 class="product-title">Premium Headphones</h2>
          <div class="product-price">$99.99</div>
          <p class="product-description">High-quality wireless headphones with noise cancellation and long battery life.</p>
          <a href="#" class="btn">Add to Cart</a>
        </div>
      </div>
      
      <div class="product-card">
        <div class="product-image">
          <img src="https://via.placeholder.com/400x300/f5f5f5/333333?text=Product+2" alt="Product 2">
          <div class="product-badge">Sale</div>
        </div>
        <div class="product-info">
          <h2 class="product-title">Smart Watch</h2>
          <div class="product-price">$149.99</div>
          <p class="product-description">Track your fitness, receive notifications, and more with this feature-rich smartwatch.</p>
          <a href="#" class="btn">Add to Cart</a>
        </div>
      </div>
      
      <div class="product-card sold-out">
        <div class="product-image">
          <img src="https://via.placeholder.com/400x300/f5f5f5/333333?text=Product+3" alt="Product 3">
        </div>
        <div class="product-info">
          <h2 class="product-title">Bluetooth Speaker</h2>
          <div class="product-price">$79.99</div>
          <p class="product-description">Portable Bluetooth speaker with 360° sound and waterproof design.</p>
          <a href="#" class="btn">Add to Cart</a>
        </div>
      </div>
      
      <div class="product-card">
        <div class="product-image">
          <img src="https://via.placeholder.com/400x300/f5f5f5/333333?text=Product+4" alt="Product 4">
        </div>
        <div class="product-info">
          <h2 class="product-title">Wireless Earbuds</h2>
          <div class="product-price">$59.99</div>
          <p class="product-description">True wireless earbuds with touch controls and premium sound quality.</p>
          <a href="#" class="btn">Add to Cart</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
    likes: 74,
    comments: [
      {
        id: 3001,
        author: {
          id: 107,
          username: "design_lover",
          avatar: null
        },
        content: "Beautiful animations! They're subtle but effective.",
        createdAt: "2025-03-10T16:30:00Z",
        likes: 9
      },
      {
        id: 3002,
        author: {
          id: 108,
          username: "css_enthusiast",
          avatar: null
        },
        content: "Love the hover effects. What about adding a quick fade-in animation when the page loads?",
        createdAt: "2025-03-10T18:15:00Z",
        likes: 7
      },
      {
        id: 3003,
        author: {
          id: 106,
          username: "animation_expert",
          avatar: null
        },
        content: "Thanks for the feedback! I'll definitely consider adding load animations in the next version.",
        createdAt: "2025-03-10T19:20:00Z",
        likes: 3
      }
    ],
    tags: ["css", "animation", "product-cards", "hover-effects"]
  }
];

export default function Community() {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedProject, setSelectedProject] = useState<null | typeof mockCommunityProjects[0]>(null);
  const [commentText, setCommentText] = useState("");
  const [sortBy, setSortBy] = useState<"trending" | "recent" | "top">("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(mockCommunityProjects);
  
  // Filter and sort projects
  const filterAndSortProjects = () => {
    let filtered = [...mockCommunityProjects];
    
    // Apply search filter if any
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.includes(query))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "top":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "trending":
      default:
        // For trending, we'll use a combination of recency and popularity
        filtered.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          const scoreA = a.likes + (a.comments.length * 2) + (Date.now() - dateA) / (1000 * 60 * 60 * 24);
          const scoreB = b.likes + (b.comments.length * 2) + (Date.now() - dateB) / (1000 * 60 * 60 * 24);
          return scoreB - scoreA;
        });
    }
    
    return filtered;
  };
  
  // Handle search
  const handleSearch = () => {
    setFilteredProjects(filterAndSortProjects());
  };
  
  // Handle sort change
  const handleSortChange = (sort: "trending" | "recent" | "top") => {
    setSortBy(sort);
    setFilteredProjects(filterAndSortProjects());
  };
  
  // Like a project
  const handleLikeProject = (projectId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to like projects.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Project Liked",
      description: "You have liked this project.",
    });
  };
  
  // Comment on a project
  const handleComment = (projectId: number) => {
    if (!commentText.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please write something before posting a comment.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Comment Posted",
      description: "Your comment has been posted successfully.",
    });
    
    setCommentText("");
  };
  
  // Share a project
  const handleShare = (projectId: number) => {
    // In a real app, this would copy a shareable link to clipboard
    navigator.clipboard.writeText(`https://yourwebsite.com/community/project/${projectId}`);
    
    toast({
      title: "Link Copied",
      description: "Project link copied to clipboard.",
    });
  };
  
  // Format date to relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };
  
  // Authentication required view
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="text-center py-10 border border-dashed rounded-lg border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to access the community features.
          </p>
          <Button onClick={() => window.scrollTo(0, 0)}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }
  
  // Project detail view
  if (selectedProject) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <Button 
          variant="outline" 
          onClick={() => setSelectedProject(null)}
          className="mb-8"
        >
          Back to Community
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">{selectedProject.title}</h1>
                  <div className="flex items-center space-x-2">
                    {selectedProject.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedProject.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>{selectedProject.author.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{selectedProject.author.username}</span>
                  <span className="mx-2">•</span>
                  <span>{formatRelativeTime(selectedProject.createdAt)}</span>
                </div>
                
                <Tabs defaultValue="preview" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="preview" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" /> Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex items-center gap-2">
                      <Code className="h-4 w-4" /> Code
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="border rounded-md p-4 min-h-[400px] bg-white dark:bg-gray-900">
                    <LivePreview htmlCode={selectedProject.htmlContent} />
                  </TabsContent>
                  <TabsContent value="code">
                    <CodeEditor 
                      initialValue={selectedProject.htmlContent}
                      onChange={() => {}}
                      onRun={() => {}}
                    />
                  </TabsContent>
                </Tabs>
                
                <div className="flex items-center justify-between border-t border-b py-4 my-6">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2"
                    onClick={() => handleLikeProject(selectedProject.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{selectedProject.likes} Likes</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{selectedProject.comments.length} Comments</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2"
                    onClick={() => handleShare(selectedProject.id)}
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Comments
                </CardTitle>
                <CardDescription>
                  Join the discussion about this project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Textarea 
                    placeholder="Write a comment..." 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="mb-2"
                  />
                  <Button 
                    onClick={() => handleComment(selectedProject.id)}
                    disabled={!commentText.trim()}
                  >
                    Post Comment
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                <ScrollArea className="h-[500px] pr-4">
                  {selectedProject.comments.length > 0 ? (
                    <div className="space-y-4">
                      {selectedProject.comments.map((comment) => (
                        <div key={comment.id} className="border-b pb-4">
                          <div className="flex items-center text-sm mb-2">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>{comment.author.username.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium mr-2">{comment.author.username}</span>
                            <span className="text-gray-500 dark:text-gray-400 text-xs">
                              {formatRelativeTime(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-2">
                            {comment.content}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span>{comment.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              Reply
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No comments yet. Be the first to comment!</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  // Community overview page
  return (
    <div className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover, share, and learn from HTML projects created by the community
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Input 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 md:w-64"
          />
          <Button variant="outline" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="followed">Followed Users</TabsTrigger>
            <TabsTrigger value="mywork">My Work</TabsTrigger>
          </TabsList>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>
                  {sortBy === "trending" && "Trending"}
                  {sortBy === "recent" && "Recent"}
                  {sortBy === "top" && "Top Rated"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSortChange("trending")} className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Trending</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("recent")} className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Recent</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("top")} className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>Top Rated</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <TabsContent value="discover" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-start">
                    <span className="line-clamp-1">{project.title}</span>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Heart className="h-3 w-3 fill-current" />
                      <span>{project.likes}</span>
                    </Badge>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div 
                    className="h-40 border rounded overflow-hidden bg-gray-50 dark:bg-gray-900 relative"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="absolute inset-0 p-2 overflow-hidden">
                      <LivePreview htmlCode={project.htmlContent} />
                    </div>
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Button variant="secondary" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback>{project.author.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{project.author.username}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{project.comments.length}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12 border border-dashed rounded-lg border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
              <Globe className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Projects Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                No projects match your search criteria. Try a different search term or browse the latest projects.
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setFilteredProjects(mockCommunityProjects);
              }}>
                View All Projects
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="followed" className="mt-6">
          <div className="text-center py-12 border border-dashed rounded-lg border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
            <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Followed Users Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start following other users to see their projects here.
            </p>
            <Button onClick={() => setActiveTab("discover")}>
              Discover Users
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="mywork" className="mt-6">
          <div className="text-center py-12 border border-dashed rounded-lg border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
            <Code className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Share Your Work</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You haven't shared any projects with the community yet.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Share a Project</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Share Project</DialogTitle>
                  <DialogDescription>
                    Share your saved projects with the community
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Select a project to share from your saved work:
                    </p>
                    <select className="w-full p-2 border rounded-md">
                      <option value="">-- Select a project --</option>
                      <option value="1">My First HTML Page</option>
                      <option value="2">Responsive Layout</option>
                      <option value="3">Contact Form</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="description" className="text-sm">
                      Add a description
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project for the community..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="tags" className="text-sm">
                      Add tags (comma separated)
                    </label>
                    <Input
                      id="tags"
                      placeholder="html, css, responsive, form, etc."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Share</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}