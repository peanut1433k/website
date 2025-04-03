import { useState, useEffect } from "react";
import * as monaco from "monaco-editor";
import { Check, ChevronsUpDown, Copy, Play, Save, Code2, FileCode, Info, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Default code to show when no initial value is provided
const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
  <title>My HTML Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333;
    }
    p {
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to My HTML Page</h1>
    <p>This is a paragraph of text. You can edit this code in the editor.</p>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
    </ul>
    <button>Click Me</button>
  </div>
</body>
</html>`;

// HTML templates for quick start
const HTML_TEMPLATES = [
  {
    id: "basic",
    name: "Basic HTML",
    description: "A simple HTML boilerplate with minimal styling",
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Basic HTML Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
    }
  </style>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is a basic HTML page.</p>
</body>
</html>`
  },
  {
    id: "responsive",
    name: "Responsive Layout",
    description: "A responsive layout with CSS flexbox",
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Responsive Layout</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    header {
      background: #333;
      color: #fff;
      padding: 1rem 0;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .nav-links {
      display: flex;
      list-style: none;
    }
    .nav-links li {
      margin-left: 1rem;
    }
    .nav-links a {
      color: #fff;
      text-decoration: none;
    }
    .content {
      padding: 2rem 0;
    }
    .flex-container {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -15px;
    }
    .flex-item {
      flex: 1 1 300px;
      margin: 15px;
      padding: 1rem;
      background: #f4f4f4;
      border-radius: 5px;
    }
    footer {
      background: #333;
      color: #fff;
      text-align: center;
      padding: 1rem 0;
      margin-top: 2rem;
    }
    @media (max-width: 768px) {
      .flex-item {
        flex: 1 1 100%;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <div class="logo">Brand</div>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
  
  <div class="content">
    <div class="container">
      <h1>Responsive Layout</h1>
      <p>This is a responsive layout using flexbox.</p>
      
      <div class="flex-container">
        <div class="flex-item">
          <h2>Section 1</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="flex-item">
          <h2>Section 2</h2>
          <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
        </div>
        <div class="flex-item">
          <h2>Section 3</h2>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit.</p>
        </div>
      </div>
    </div>
  </div>
  
  <footer>
    <div class="container">
      <p>&copy; 2025 Company Name. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`
  },
  {
    id: "form",
    name: "Contact Form",
    description: "HTML form with validation and styling",
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Contact Form</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      background: #f9f9f9;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      text-align: center;
      margin-bottom: 20px;
      color: #333;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input, textarea, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #4d90fe;
      box-shadow: 0 0 5px rgba(77, 144, 254, 0.2);
    }
    .error {
      color: red;
      font-size: 14px;
      margin-top: 5px;
      display: none;
    }
    .invalid input, .invalid textarea {
      border-color: red;
    }
    .invalid .error {
      display: block;
    }
    button {
      background: #4d90fe;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      display: block;
      width: 100%;
    }
    button:hover {
      background: #357ae8;
    }
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
      
      <div class="form-group" id="subjectGroup">
        <label for="subject">Subject</label>
        <select id="subject">
          <option value="">-- Select a subject --</option>
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="billing">Billing Question</option>
          <option value="other">Other</option>
        </select>
        <div class="error">Please select a subject</div>
      </div>
      
      <div class="form-group" id="messageGroup">
        <label for="message">Message</label>
        <textarea id="message" rows="5" placeholder="Your message"></textarea>
        <div class="error">Please enter your message</div>
      </div>
      
      <button type="submit">Send Message</button>
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
      
      // Validate subject
      const subject = document.getElementById('subject');
      if (!subject.value) {
        document.getElementById('subjectGroup').classList.add('invalid');
        valid = false;
      } else {
        document.getElementById('subjectGroup').classList.remove('invalid');
      }
      
      // Validate message
      const message = document.getElementById('message');
      if (!message.value.trim()) {
        document.getElementById('messageGroup').classList.add('invalid');
        valid = false;
      } else {
        document.getElementById('messageGroup').classList.remove('invalid');
      }
      
      // If valid, submit the form (in a real scenario)
      if (valid) {
        alert('Form submitted successfully!');
        this.reset();
      }
    });
  </script>
</body>
</html>`
  },
  {
    id: "gallery",
    name: "Image Gallery",
    description: "Responsive image gallery with CSS grid",
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Image Gallery</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
      background: #f8f8f8;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    .gallery-item {
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .gallery-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }
    .gallery-item img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }
    .gallery-item:hover img {
      transform: scale(1.05);
    }
    .gallery-caption {
      padding: 15px;
      background: white;
    }
    .gallery-caption h3 {
      margin-bottom: 5px;
      color: #333;
    }
    .gallery-caption p {
      color: #666;
      font-size: 14px;
    }
    @media (max-width: 600px) {
      .gallery {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Image Gallery</h1>
    
    <div class="gallery">
      <div class="gallery-item">
        <img src="https://via.placeholder.com/600x400/f5f5f5/333333?text=Image+1" alt="Image 1">
        <div class="gallery-caption">
          <h3>Image Title 1</h3>
          <p>Description of the first image</p>
        </div>
      </div>
      
      <div class="gallery-item">
        <img src="https://via.placeholder.com/600x400/f5f5f5/333333?text=Image+2" alt="Image 2">
        <div class="gallery-caption">
          <h3>Image Title 2</h3>
          <p>Description of the second image</p>
        </div>
      </div>
      
      <div class="gallery-item">
        <img src="https://via.placeholder.com/600x400/f5f5f5/333333?text=Image+3" alt="Image 3">
        <div class="gallery-caption">
          <h3>Image Title 3</h3>
          <p>Description of the third image</p>
        </div>
      </div>
      
      <div class="gallery-item">
        <img src="https://via.placeholder.com/600x400/f5f5f5/333333?text=Image+4" alt="Image 4">
        <div class="gallery-caption">
          <h3>Image Title 4</h3>
          <p>Description of the fourth image</p>
        </div>
      </div>
      
      <div class="gallery-item">
        <img src="https://via.placeholder.com/600x400/f5f5f5/333333?text=Image+5" alt="Image 5">
        <div class="gallery-caption">
          <h3>Image Title 5</h3>
          <p>Description of the fifth image</p>
        </div>
      </div>
      
      <div class="gallery-item">
        <img src="https://via.placeholder.com/600x400/f5f5f5/333333?text=Image+6" alt="Image 6">
        <div class="gallery-caption">
          <h3>Image Title 6</h3>
          <p>Description of the sixth image</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: "navbar",
    name: "Responsive Navigation",
    description: "Mobile-friendly navigation bar with hamburger menu",
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Responsive Navigation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    header {
      background: #333;
      padding: 1rem 0;
      position: relative;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
    }
    .nav-menu {
      display: flex;
      list-style: none;
    }
    .nav-item {
      margin-left: 2rem;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    .nav-link:hover {
      color: #f4f4f4;
    }
    .hamburger {
      display: none;
      cursor: pointer;
    }
    .bar {
      display: block;
      width: 25px;
      height: 3px;
      margin: 5px 0;
      background-color: white;
      transition: transform 0.3s ease;
    }
    .content {
      padding: 2rem 0;
    }
    @media (max-width: 768px) {
      .hamburger {
        display: block;
      }
      .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: #333;
        width: 100%;
        text-align: center;
        transition: 0.3s;
        padding: 20px 0;
      }
      .nav-menu.active {
        left: 0;
      }
      .nav-item {
        margin: 1rem 0;
      }
      .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      .hamburger.active .bar:nth-child(2) {
        opacity: 0;
      }
      .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav class="navbar">
        <a href="#" class="logo">Brand</a>
        
        <ul class="nav-menu">
          <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
          <li class="nav-item"><a href="#" class="nav-link">About</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Services</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Portfolio</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>
        </ul>
        
        <div class="hamburger">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </nav>
    </div>
  </header>
  
  <div class="content">
    <div class="container">
      <h1>Responsive Navigation</h1>
      <p>This is a responsive navigation bar with a hamburger menu for mobile devices.</p>
      <p>Try resizing your window to see how it adapts!</p>
    </div>
  </div>
  
  <script>
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  </script>
</body>
</html>`
  }
];

// HTML snippets for quick insertion
const HTML_SNIPPETS = [
  {
    id: "basic-html",
    name: "Basic HTML Structure",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Title</title>
</head>
<body>
  <!-- Content goes here -->
</body>
</html>`
  },
  {
    id: "meta-tags",
    name: "Meta Tags",
    code: `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Description of your page">
<meta name="keywords" content="keywords, for, search, engines">
<meta name="author" content="Your Name">`
  },
  {
    id: "css-styles",
    name: "CSS Styles",
    code: `<style>
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
  }
  h1 {
    color: #333;
  }
  p {
    color: #666;
  }
</style>`
  },
  {
    id: "script-tag",
    name: "JavaScript",
    code: `<script>
  // Your JavaScript code here
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded');
  });
</script>`
  },
  {
    id: "responsive-img",
    name: "Responsive Image",
    code: `<img src="image.jpg" alt="Description of the image" style="max-width: 100%; height: auto;">`
  },
  {
    id: "table",
    name: "Table",
    code: `<table border="1">
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1, Cell 1</td>
      <td>Row 1, Cell 2</td>
      <td>Row 1, Cell 3</td>
    </tr>
    <tr>
      <td>Row 2, Cell 1</td>
      <td>Row 2, Cell 2</td>
      <td>Row 2, Cell 3</td>
    </tr>
  </tbody>
</table>`
  },
  {
    id: "form",
    name: "Form",
    code: `<form action="/submit-form" method="post">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" required></textarea>
  </div>
  <button type="submit">Submit</button>
</form>`
  },
  {
    id: "flexbox",
    name: "Flexbox Container",
    code: `<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
  <div style="flex: 1 1 300px; margin: 10px; padding: 20px; background: #f4f4f4;">Item 1</div>
  <div style="flex: 1 1 300px; margin: 10px; padding: 20px; background: #f4f4f4;">Item 2</div>
  <div style="flex: 1 1 300px; margin: 10px; padding: 20px; background: #f4f4f4;">Item 3</div>
</div>`
  },
  {
    id: "grid",
    name: "CSS Grid",
    code: `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
  <div style="padding: 20px; background: #f4f4f4;">Grid Item 1</div>
  <div style="padding: 20px; background: #f4f4f4;">Grid Item 2</div>
  <div style="padding: 20px; background: #f4f4f4;">Grid Item 3</div>
  <div style="padding: 20px; background: #f4f4f4;">Grid Item 4</div>
</div>`
  }
];

interface AdvancedCodeEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  onRun?: () => void;
  onSave?: (title: string, code: string) => void;
  height?: string;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  darkMode?: boolean;
}

export default function AdvancedCodeEditor({ 
  initialValue = DEFAULT_CODE, 
  onChange, 
  onRun, 
  onSave,
  height = "500px",
  readOnly = false,
  showLineNumbers = true,
  darkMode = false
}: AdvancedCodeEditorProps) {
  const [editorValue, setEditorValue] = useState(initialValue);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [isSnippetsOpen, setIsSnippetsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<"vs" | "vs-dark">(darkMode ? "vs-dark" : "vs");
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  // Filter snippets based on search query
  const filteredSnippets = HTML_SNIPPETS.filter(
    snippet => snippet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Initialize editor
  useEffect(() => {
    if (typeof window !== "undefined" && !editor) {
      const newEditor = monaco.editor.create(document.getElementById("monaco-editor-container")!, {
        value: initialValue,
        language: "html",
        theme: theme,
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: showLineNumbers ? "on" : "off",
        readOnly: readOnly,
        wordWrap: "on",
        fontSize: 14,
        renderWhitespace: "selection",
        bracketPairColorization: {
          enabled: true
        }
      });
      
      newEditor.onDidChangeModelContent(() => {
        const value = newEditor.getValue();
        setEditorValue(value);
        onChange && onChange(value);
      });
      
      setEditor(newEditor);
      
      return () => {
        newEditor.dispose();
      };
    }
  }, []);
  
  // Update editor theme when darkMode changes
  useEffect(() => {
    setTheme(darkMode ? "vs-dark" : "vs");
    if (editor) {
      editor.updateOptions({ theme: darkMode ? "vs-dark" : "vs" });
    }
  }, [darkMode, editor]);
  
  // Update editor options when showLineNumbers changes
  useEffect(() => {
    if (editor) {
      editor.updateOptions({ lineNumbers: showLineNumbers ? "on" : "off" });
    }
  }, [showLineNumbers, editor]);
  
  // Apply a template
  const applyTemplate = (templateCode: string) => {
    if (editor) {
      editor.setValue(templateCode);
      setEditorValue(templateCode);
      onChange && onChange(templateCode);
    }
    setIsTemplateDialogOpen(false);
  };
  
  // Insert a snippet at cursor position
  const insertSnippet = (snippetCode: string) => {
    if (editor) {
      const selection = editor.getSelection();
      if (selection) {
        const edits = [{
          range: new monaco.Range(
            selection.startLineNumber,
            selection.startColumn,
            selection.endLineNumber,
            selection.endColumn
          ),
          text: snippetCode
        }];
        
        editor.executeEdits("snippet-insertion", edits);
        const updatedValue = editor.getValue();
        setEditorValue(updatedValue);
        onChange && onChange(updatedValue);
      }
    }
    setIsSnippetsOpen(false);
  };
  
  // Copy code to clipboard
  const copyCode = () => {
    navigator.clipboard.writeText(editorValue);
    toast({
      title: "Code Copied",
      description: "The code has been copied to your clipboard.",
    });
  };
  
  // Format code
  const formatCode = () => {
    if (editor) {
      editor.getAction("editor.action.formatDocument")?.run();
    }
  };
  
  // Save code
  const handleSave = () => {
    if (!saveTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your project.",
        variant: "destructive",
      });
      return;
    }
    
    if (onSave) {
      onSave(saveTitle, editorValue);
      setIsSaveDialogOpen(false);
      setSaveTitle("");
    }
  };
  
  // Format file size
  const getFileSize = (code: string) => {
    const bytes = new Blob([code]).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };
  
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-gray-100 dark:bg-gray-800 p-2 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Select defaultValue="html">
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
            </SelectContent>
          </Select>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={formatCode}
                >
                  <Code2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Format Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
              >
                <FileCode className="h-4 w-4 mr-1" />
                <span>Templates</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Choose a Template</DialogTitle>
                <DialogDescription>
                  Select a template to start with. This will replace your current code.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                    {HTML_TEMPLATES.map((template) => (
                      <Card 
                        key={template.id}
                        className="cursor-pointer hover:border-primary transition-colors"
                        onClick={() => applyTemplate(template.code)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <CardDescription className="text-xs">{template.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="h-20 border rounded-md p-1 text-xs bg-gray-50 dark:bg-gray-900 overflow-hidden font-mono">
                            {template.code.substring(0, 200)}...
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <DropdownMenu open={isSnippetsOpen} onOpenChange={setIsSnippetsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
              >
                <Code2 className="h-4 w-4 mr-1" />
                <span>Snippets</span>
                <ChevronsUpDown className="h-3 w-3 ml-1 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
              <div className="p-2">
                <Input
                  placeholder="Search snippets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2"
                />
              </div>
              <DropdownMenuLabel>HTML Snippets</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-60">
                {filteredSnippets.length > 0 ? (
                  filteredSnippets.map((snippet) => (
                    <DropdownMenuItem
                      key={snippet.id}
                      onClick={() => insertSnippet(snippet.code)}
                      className="flex flex-col items-start cursor-pointer"
                    >
                      <div className="font-medium">{snippet.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 w-full overflow-hidden">
                        <pre className="truncate">{snippet.code.split('\n')[0]}</pre>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No snippets found
                  </div>
                )}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={copyCode}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {onRun && (
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={onRun}
            >
              <Play className="h-4 w-4 mr-1" />
              <span>Run</span>
            </Button>
          )}
          
          {onSave && (
            <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="h-8"
                  disabled={!isAuthenticated}
                >
                  <Save className="h-4 w-4 mr-1" />
                  <span>Save</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Save Project</DialogTitle>
                  <DialogDescription>
                    Enter a title for your project to save it.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Project Title
                    </label>
                    <Input
                      id="title"
                      placeholder="My Awesome HTML Project"
                      value={saveTitle}
                      onChange={(e) => setSaveTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div>
                      Size: {getFileSize(editorValue)}
                    </div>
                    <div className="text-right">
                      Lines: {editorValue.split('\n').length}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save Project</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      <div id="monaco-editor-container" style={{ width: "100%", height }} />
      
      <div className="bg-gray-100 dark:bg-gray-800 p-2 border-t flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="h-5 px-1.5 text-xs font-normal">
            HTML
          </Badge>
          <span>Size: {getFileSize(editorValue)}</span>
          <span>Lines: {editorValue.split('\n').length}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Info className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Keyboard shortcuts:</p>
                <p>Ctrl+S: Format document</p>
                <p>Ctrl+F: Find</p>
                <p>Ctrl+H: Replace</p>
                <p>Alt+F: Format selection</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}