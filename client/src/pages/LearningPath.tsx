import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle,
  Award,
  BookOpen, 
  CheckCircle, 
  ChevronRight, 
  Code, 
  FileQuestion, 
  GraduationCap, 
  Layout, 
  ListChecks, 
  Lock, 
  Star, 
  Unlock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Define the structure of learning modules
type LessonStatus = "locked" | "available" | "completed";

interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  status: LessonStatus;
  quizzes: Quiz[];
}

interface Module {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  lessons: Lesson[];
}

// Mock learning path data
const learningModules: Module[] = [
  {
    id: 1,
    title: "HTML Fundamentals",
    description: "Learn the basics of HTML structure and syntax",
    icon: <Layout className="h-6 w-6" />,
    progress: 100,
    lessons: [
      {
        id: 101,
        title: "Introduction to HTML",
        description: "Learn what HTML is and how it structures web content",
        content: `
          <h1>Introduction to HTML</h1>
          <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page and consists of a series of elements that tell the browser how to display the content.</p>
          
          <h2>What HTML Does</h2>
          <p>HTML uses "markup" to annotate text, images, and other content for display in a browser. HTML markup includes special "elements" such as:</p>
          <ul>
            <li>&lt;head&gt;</li>
            <li>&lt;title&gt;</li>
            <li>&lt;body&gt;</li>
            <li>&lt;header&gt;</li>
            <li>&lt;footer&gt;</li>
            <li>&lt;article&gt;</li>
            <li>&lt;section&gt;</li>
            <li>&lt;p&gt;</li>
            <li>and many others</li>
          </ul>
          
          <h2>HTML Document Structure</h2>
          <p>A basic HTML document structure looks like this:</p>
          <pre>
            &lt;!DOCTYPE html&gt;
            &lt;html&gt;
              &lt;head&gt;
                &lt;title&gt;Page Title&lt;/title&gt;
              &lt;/head&gt;
              &lt;body&gt;
                &lt;h1&gt;This is a Heading&lt;/h1&gt;
                &lt;p&gt;This is a paragraph.&lt;/p&gt;
              &lt;/body&gt;
            &lt;/html&gt;
          </pre>
        `,
        status: "completed",
        quizzes: [
          {
            id: 1001,
            question: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "High Tech Modern Language",
              "Hyperlink Text Management Language",
              "Home Tool Markup Language"
            ],
            correctAnswer: 0
          },
          {
            id: 1002,
            question: "Which tag is used to define the main content of an HTML document?",
            options: [
              "<main>",
              "<content>",
              "<body>",
              "<section>"
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        id: 102,
        title: "HTML Elements & Tags",
        description: "Learn about different HTML elements and their usage",
        content: `
          <h1>HTML Elements & Tags</h1>
          <p>HTML elements are represented by tags. Tags are enclosed in angle brackets, and they typically come in pairs: an opening tag and a closing tag.</p>
          
          <h2>Anatomy of an HTML Element</h2>
          <p>A typical HTML element consists of:</p>
          <ul>
            <li>Opening tag: &lt;tag&gt;</li>
            <li>Content: This is what the element will contain</li>
            <li>Closing tag: &lt;/tag&gt;</li>
          </ul>
          
          <h2>Common HTML Elements</h2>
          <p>Here are some common HTML elements:</p>
          <ul>
            <li><strong>Headings:</strong> &lt;h1&gt; to &lt;h6&gt;</li>
            <li><strong>Paragraphs:</strong> &lt;p&gt;</li>
            <li><strong>Links:</strong> &lt;a&gt;</li>
            <li><strong>Images:</strong> &lt;img&gt;</li>
            <li><strong>Lists:</strong> &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</li>
            <li><strong>Divs:</strong> &lt;div&gt;</li>
            <li><strong>Spans:</strong> &lt;span&gt;</li>
          </ul>
          
          <h2>Self-closing Tags</h2>
          <p>Some HTML elements don't have closing tags and are known as self-closing or void elements:</p>
          <ul>
            <li>&lt;img&gt;</li>
            <li>&lt;br&gt;</li>
            <li>&lt;hr&gt;</li>
            <li>&lt;input&gt;</li>
            <li>&lt;meta&gt;</li>
          </ul>
        `,
        status: "completed",
        quizzes: [
          {
            id: 1003,
            question: "Which tag is used to create a hyperlink?",
            options: [
              "<link>",
              "<a>",
              "<href>",
              "<hyperlink>"
            ],
            correctAnswer: 1
          },
          {
            id: 1004,
            question: "Which of the following is a self-closing tag?",
            options: [
              "<p>",
              "<div>",
              "<span>",
              "<img>"
            ],
            correctAnswer: 3
          }
        ]
      },
      {
        id: 103,
        title: "HTML Attributes",
        description: "Learn how to use attributes in HTML elements",
        content: `
          <h1>HTML Attributes</h1>
          <p>HTML attributes provide additional information about an element and are always specified in the opening tag.</p>
          
          <h2>Attribute Syntax</h2>
          <p>Attributes come in name/value pairs like: name="value"</p>
          <pre>
            &lt;element attribute="value"&gt;Content&lt;/element&gt;
          </pre>
          
          <h2>Common Attributes</h2>
          <p>Here are some commonly used HTML attributes:</p>
          <ul>
            <li><strong>id:</strong> Specifies a unique id for an element</li>
            <li><strong>class:</strong> Specifies one or more class names for an element</li>
            <li><strong>style:</strong> Specifies an inline CSS style for an element</li>
            <li><strong>src:</strong> Specifies the URL of the media file (used with &lt;img&gt;, &lt;audio&gt;, &lt;video&gt;, etc.)</li>
            <li><strong>href:</strong> Specifies the URL of the page the link goes to (used with &lt;a&gt;)</li>
            <li><strong>alt:</strong> Specifies an alternate text for an image (used with &lt;img&gt;)</li>
          </ul>
          
          <h2>Example Usage</h2>
          <pre>
            &lt;a href="https://example.com" id="main-link" class="external-link"&gt;Visit Example&lt;/a&gt;
            
            &lt;img src="image.jpg" alt="Description of image" width="500" height="300"&gt;
          </pre>
        `,
        status: "completed",
        quizzes: [
          {
            id: 1005,
            question: "Which attribute specifies the URL of an image?",
            options: [
              "href",
              "url",
              "src",
              "link"
            ],
            correctAnswer: 2
          },
          {
            id: 1006,
            question: "What is the correct HTML attribute to define alternate text for an image?",
            options: [
              "title",
              "alt",
              "description",
              "text"
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "HTML Text Formatting",
    description: "Learn how to format text content in HTML",
    icon: <Code className="h-6 w-6" />,
    progress: 67,
    lessons: [
      {
        id: 201,
        title: "Basic Text Formatting",
        description: "Learn how to format text using HTML elements",
        content: `
          <h1>Basic Text Formatting</h1>
          <p>HTML provides several elements for formatting text to improve readability and emphasize content.</p>
          
          <h2>Basic Text Elements</h2>
          <ul>
            <li><strong>&lt;h1&gt; to &lt;h6&gt;</strong> - Headings from most important (h1) to least important (h6)</li>
            <li><strong>&lt;p&gt;</strong> - Paragraphs</li>
            <li><strong>&lt;br&gt;</strong> - Line breaks</li>
            <li><strong>&lt;hr&gt;</strong> - Horizontal rules (lines)</li>
          </ul>
          
          <h2>Text Formatting Elements</h2>
          <ul>
            <li><strong>&lt;b&gt;</strong> - Bold text</li>
            <li><strong>&lt;strong&gt;</strong> - Important text (typically bold, but has semantic meaning)</li>
            <li><strong>&lt;i&gt;</strong> - Italic text</li>
            <li><strong>&lt;em&gt;</strong> - Emphasized text (typically italic, but has semantic meaning)</li>
            <li><strong>&lt;mark&gt;</strong> - Marked/highlighted text</li>
            <li><strong>&lt;small&gt;</strong> - Smaller text</li>
            <li><strong>&lt;del&gt;</strong> - Deleted (strikethrough) text</li>
            <li><strong>&lt;ins&gt;</strong> - Inserted (underlined) text</li>
            <li><strong>&lt;sub&gt;</strong> - Subscript text</li>
            <li><strong>&lt;sup&gt;</strong> - Superscript text</li>
          </ul>
          
          <h2>Example Usage</h2>
          <pre>
            &lt;h1&gt;This is a heading 1&lt;/h1&gt;
            &lt;h2&gt;This is a heading 2&lt;/h2&gt;
            
            &lt;p&gt;This is a &lt;b&gt;bold&lt;/b&gt; paragraph with &lt;i&gt;italic&lt;/i&gt; text.&lt;/p&gt;
            
            &lt;p&gt;This is &lt;strong&gt;very important&lt;/strong&gt; and &lt;em&gt;emphasized&lt;/em&gt; text.&lt;/p&gt;
            
            &lt;p&gt;This is &lt;mark&gt;highlighted&lt;/mark&gt; text.&lt;/p&gt;
          </pre>
        `,
        status: "completed",
        quizzes: [
          {
            id: 2001,
            question: "Which HTML element is used to define important text?",
            options: [
              "<b>",
              "<important>",
              "<strong>",
              "<em>"
            ],
            correctAnswer: 2
          },
          {
            id: 2002,
            question: "Which tag creates a line break?",
            options: [
              "<break>",
              "<lb>",
              "<newline>",
              "<br>"
            ],
            correctAnswer: 3
          }
        ]
      },
      {
        id: 202,
        title: "Lists & Tables",
        description: "Learn to create and style different types of lists and tables",
        content: `
          <h1>Lists & Tables</h1>
          <p>HTML provides elements for creating structured lists and tables for organizing data.</p>
          
          <h2>Types of Lists</h2>
          <ul>
            <li><strong>Unordered Lists (&lt;ul&gt;)</strong> - Lists with bullet points</li>
            <li><strong>Ordered Lists (&lt;ol&gt;)</strong> - Lists with numbers or letters</li>
            <li><strong>Description Lists (&lt;dl&gt;)</strong> - Lists with terms and descriptions</li>
          </ul>
          
          <h3>Example of Lists</h3>
          <pre>
            &lt;!-- Unordered List --&gt;
            &lt;ul&gt;
              &lt;li&gt;Item 1&lt;/li&gt;
              &lt;li&gt;Item 2&lt;/li&gt;
              &lt;li&gt;Item 3&lt;/li&gt;
            &lt;/ul&gt;
            
            &lt;!-- Ordered List --&gt;
            &lt;ol&gt;
              &lt;li&gt;First item&lt;/li&gt;
              &lt;li&gt;Second item&lt;/li&gt;
              &lt;li&gt;Third item&lt;/li&gt;
            &lt;/ol&gt;
            
            &lt;!-- Description List --&gt;
            &lt;dl&gt;
              &lt;dt&gt;Term 1&lt;/dt&gt;
              &lt;dd&gt;Description of term 1&lt;/dd&gt;
              &lt;dt&gt;Term 2&lt;/dt&gt;
              &lt;dd&gt;Description of term 2&lt;/dd&gt;
            &lt;/dl&gt;
          </pre>
          
          <h2>HTML Tables</h2>
          <p>Tables are used to organize data in rows and columns.</p>
          
          <h3>Table Elements</h3>
          <ul>
            <li><strong>&lt;table&gt;</strong> - Defines a table</li>
            <li><strong>&lt;tr&gt;</strong> - Defines a table row</li>
            <li><strong>&lt;th&gt;</strong> - Defines a table header cell</li>
            <li><strong>&lt;td&gt;</strong> - Defines a table data cell</li>
            <li><strong>&lt;caption&gt;</strong> - Defines a table caption</li>
            <li><strong>&lt;thead&gt;</strong> - Groups header content</li>
            <li><strong>&lt;tbody&gt;</strong> - Groups body content</li>
            <li><strong>&lt;tfoot&gt;</strong> - Groups footer content</li>
          </ul>
          
          <h3>Example of a Table</h3>
          <pre>
            &lt;table&gt;
              &lt;caption&gt;Monthly Savings&lt;/caption&gt;
              &lt;thead&gt;
                &lt;tr&gt;
                  &lt;th&gt;Month&lt;/th&gt;
                  &lt;th&gt;Savings&lt;/th&gt;
                &lt;/tr&gt;
              &lt;/thead&gt;
              &lt;tbody&gt;
                &lt;tr&gt;
                  &lt;td&gt;January&lt;/td&gt;
                  &lt;td&gt;$100&lt;/td&gt;
                &lt;/tr&gt;
                &lt;tr&gt;
                  &lt;td&gt;February&lt;/td&gt;
                  &lt;td&gt;$80&lt;/td&gt;
                &lt;/tr&gt;
              &lt;/tbody&gt;
              &lt;tfoot&gt;
                &lt;tr&gt;
                  &lt;td&gt;Sum&lt;/td&gt;
                  &lt;td&gt;$180&lt;/td&gt;
                &lt;/tr&gt;
              &lt;/tfoot&gt;
            &lt;/table&gt;
          </pre>
        `,
        status: "completed",
        quizzes: [
          {
            id: 2003,
            question: "Which HTML element is used to define an ordered list?",
            options: [
              "<ul>",
              "<ol>",
              "<dl>",
              "<li>"
            ],
            correctAnswer: 1
          },
          {
            id: 2004,
            question: "In an HTML table, which tag defines a table header cell?",
            options: [
              "<td>",
              "<th>",
              "<thead>",
              "<header>"
            ],
            correctAnswer: 1
          }
        ]
      },
      {
        id: 203,
        title: "Semantic Text Elements",
        description: "Learn about semantic elements for better accessibility and SEO",
        content: `
          <h1>Semantic Text Elements</h1>
          <p>Semantic HTML elements clearly describe their meaning to both the browser and the developer. Using semantic elements improves accessibility, SEO, and code readability.</p>
          
          <h2>Common Semantic Elements</h2>
          <ul>
            <li><strong>&lt;article&gt;</strong> - Defines independent, self-contained content</li>
            <li><strong>&lt;section&gt;</strong> - Defines a section in a document</li>
            <li><strong>&lt;header&gt;</strong> - Defines a header for a document or section</li>
            <li><strong>&lt;footer&gt;</strong> - Defines a footer for a document or section</li>
            <li><strong>&lt;nav&gt;</strong> - Defines navigation links</li>
            <li><strong>&lt;aside&gt;</strong> - Defines content aside from the page content</li>
            <li><strong>&lt;main&gt;</strong> - Specifies the main content of a document</li>
            <li><strong>&lt;figure&gt;</strong> - Specifies self-contained content, like illustrations, diagrams, photos, etc.</li>
            <li><strong>&lt;figcaption&gt;</strong> - Defines a caption for a &lt;figure&gt; element</li>
            <li><strong>&lt;time&gt;</strong> - Defines a date/time</li>
          </ul>
          
          <h2>Example of Semantic Layout</h2>
          <pre>
            &lt;body&gt;
              &lt;header&gt;
                &lt;h1&gt;Website Title&lt;/h1&gt;
                &lt;nav&gt;
                  &lt;ul&gt;
                    &lt;li&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href="#"&gt;Contact&lt;/a&gt;&lt;/li&gt;
                  &lt;/ul&gt;
                &lt;/nav&gt;
              &lt;/header&gt;
              
              &lt;main&gt;
                &lt;article&gt;
                  &lt;h2&gt;Article Title&lt;/h2&gt;
                  &lt;p&gt;Article content...&lt;/p&gt;
                  
                  &lt;section&gt;
                    &lt;h3&gt;Section Heading&lt;/h3&gt;
                    &lt;p&gt;Section content...&lt;/p&gt;
                  &lt;/section&gt;
                  
                  &lt;figure&gt;
                    &lt;img src="image.jpg" alt="Description"&gt;
                    &lt;figcaption&gt;Figure caption&lt;/figcaption&gt;
                  &lt;/figure&gt;
                &lt;/article&gt;
                
                &lt;aside&gt;
                  &lt;h3&gt;Related Links&lt;/h3&gt;
                  &lt;ul&gt;
                    &lt;li&gt;&lt;a href="#"&gt;Related Article 1&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href="#"&gt;Related Article 2&lt;/a&gt;&lt;/li&gt;
                  &lt;/ul&gt;
                &lt;/aside&gt;
              &lt;/main&gt;
              
              &lt;footer&gt;
                &lt;p&gt;Copyright &copy; &lt;time datetime="2025"&gt;2025&lt;/time&gt;&lt;/p&gt;
              &lt;/footer&gt;
            &lt;/body&gt;
          </pre>
          
          <h2>Benefits of Semantic HTML</h2>
          <ul>
            <li>Improved accessibility for screen readers</li>
            <li>Better SEO rankings</li>
            <li>More maintainable code</li>
            <li>Clearer structure for developers</li>
          </ul>
        `,
        status: "available",
        quizzes: [
          {
            id: 2005,
            question: "Which semantic element represents the main content of a document?",
            options: [
              "<content>",
              "<main>",
              "<body>",
              "<article>"
            ],
            correctAnswer: 1
          },
          {
            id: 2006,
            question: "Which semantic element is used for the navigation links?",
            options: [
              "<navigation>",
              "<links>",
              "<nav>",
              "<menu>"
            ],
            correctAnswer: 2
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "HTML Forms & Input",
    description: "Learn how to create interactive forms in HTML",
    icon: <FileQuestion className="h-6 w-6" />,
    progress: 0,
    lessons: [
      {
        id: 301,
        title: "Basic Form Elements",
        description: "Learn about different form elements and their attributes",
        content: `
          <h1>Basic Form Elements</h1>
          <p>HTML forms are used to collect user input. The user input is most often sent to a server for processing.</p>
          
          <h2>The Form Element</h2>
          <p>The &lt;form&gt; element is a container for different types of input elements, such as text fields, checkboxes, radio buttons, submit buttons, etc.</p>
          
          <h3>Form Attributes</h3>
          <ul>
            <li><strong>action</strong> - Specifies where to send the form-data when a form is submitted</li>
            <li><strong>method</strong> - Specifies the HTTP method to use when sending form-data (GET or POST)</li>
            <li><strong>target</strong> - Specifies where to display the response after submitting the form</li>
            <li><strong>autocomplete</strong> - Specifies whether a form should have autocomplete on or off</li>
          </ul>
          
          <h2>Input Elements</h2>
          <p>The &lt;input&gt; element is the most used form element. It can be displayed in several ways, depending on the type attribute.</p>
          
          <h3>Common Input Types</h3>
          <ul>
            <li><strong>text</strong> - Single-line text input</li>
            <li><strong>password</strong> - Password field</li>
            <li><strong>radio</strong> - Radio button (selecting one of many choices)</li>
            <li><strong>checkbox</strong> - Checkbox (selecting zero or more choices)</li>
            <li><strong>submit</strong> - Submit button</li>
            <li><strong>button</strong> - Clickable button</li>
            <li><strong>email</strong> - Email input with validation</li>
            <li><strong>number</strong> - Numeric input</li>
            <li><strong>date</strong> - Date picker</li>
            <li><strong>file</strong> - File upload control</li>
          </ul>
          
          <h2>Form Example</h2>
          <pre>
            &lt;form action="/submit-form" method="post"&gt;
              &lt;label for="name"&gt;Name:&lt;/label&gt;
              &lt;input type="text" id="name" name="name" required&gt;
              
              &lt;label for="email"&gt;Email:&lt;/label&gt;
              &lt;input type="email" id="email" name="email" required&gt;
              
              &lt;label for="password"&gt;Password:&lt;/label&gt;
              &lt;input type="password" id="password" name="password" required&gt;
              
              &lt;fieldset&gt;
                &lt;legend&gt;Gender:&lt;/legend&gt;
                &lt;input type="radio" id="male" name="gender" value="male"&gt;
                &lt;label for="male"&gt;Male&lt;/label&gt;
                
                &lt;input type="radio" id="female" name="gender" value="female"&gt;
                &lt;label for="female"&gt;Female&lt;/label&gt;
                
                &lt;input type="radio" id="other" name="gender" value="other"&gt;
                &lt;label for="other"&gt;Other&lt;/label&gt;
              &lt;/fieldset&gt;
              
              &lt;label&gt;
                &lt;input type="checkbox" name="subscribe" value="yes"&gt;
                Subscribe to newsletter
              &lt;/label&gt;
              
              &lt;button type="submit"&gt;Submit&lt;/button&gt;
            &lt;/form&gt;
          </pre>
        `,
        status: "locked",
        quizzes: [
          {
            id: 3001,
            question: "Which attribute in a form specifies where to send the form data when submitted?",
            options: [
              "method",
              "action",
              "destination",
              "target"
            ],
            correctAnswer: 1
          },
          {
            id: 3002,
            question: "Which input type would you use for a password field?",
            options: [
              "text",
              "secret",
              "password",
              "secure"
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        id: 302,
        title: "Advanced Form Elements",
        description: "Learn about textarea, select, and other advanced form elements",
        content: `
          <h1>Advanced Form Elements</h1>
          <p>In addition to basic input elements, HTML provides more complex form controls for different types of data.</p>
          
          <h2>Textarea Element</h2>
          <p>The &lt;textarea&gt; element defines a multi-line text input control.</p>
          <pre>
            &lt;label for="message"&gt;Message:&lt;/label&gt;
            &lt;textarea id="message" name="message" rows="4" cols="50"&gt;
              Default text here...
            &lt;/textarea&gt;
          </pre>
          
          <h2>Select Element</h2>
          <p>The &lt;select&gt; element creates a drop-down list.</p>
          <pre>
            &lt;label for="country"&gt;Country:&lt;/label&gt;
            &lt;select id="country" name="country"&gt;
              &lt;option value="usa"&gt;United States&lt;/option&gt;
              &lt;option value="canada"&gt;Canada&lt;/option&gt;
              &lt;option value="uk"&gt;United Kingdom&lt;/option&gt;
              &lt;option value="australia"&gt;Australia&lt;/option&gt;
            &lt;/select&gt;
          </pre>
          
          <h3>Option Groups</h3>
          <p>You can group related options with the &lt;optgroup&gt; element.</p>
          <pre>
            &lt;select id="cars" name="cars"&gt;
              &lt;optgroup label="European Cars"&gt;
                &lt;option value="volvo"&gt;Volvo&lt;/option&gt;
                &lt;option value="mercedes"&gt;Mercedes&lt;/option&gt;
                &lt;option value="audi"&gt;Audi&lt;/option&gt;
              &lt;/optgroup&gt;
              &lt;optgroup label="American Cars"&gt;
                &lt;option value="ford"&gt;Ford&lt;/option&gt;
                &lt;option value="chevrolet"&gt;Chevrolet&lt;/option&gt;
              &lt;/optgroup&gt;
            &lt;/select&gt;
          </pre>
          
          <h2>Datalist Element</h2>
          <p>The &lt;datalist&gt; element provides a list of predefined options for an &lt;input&gt; element, creating an autocomplete feature.</p>
          <pre>
            &lt;label for="browser"&gt;Choose your browser:&lt;/label&gt;
            &lt;input list="browsers" name="browser" id="browser"&gt;
            &lt;datalist id="browsers"&gt;
              &lt;option value="Edge"&gt;
              &lt;option value="Firefox"&gt;
              &lt;option value="Chrome"&gt;
              &lt;option value="Safari"&gt;
              &lt;option value="Opera"&gt;
            &lt;/datalist&gt;
          </pre>
          
          <h2>Output Element</h2>
          <p>The &lt;output&gt; element represents the result of a calculation or user action.</p>
          <pre>
            &lt;form oninput="result.value=parseInt(a.value)+parseInt(b.value)"&gt;
              &lt;input type="range" id="a" name="a" value="50"&gt;
              +
              &lt;input type="number" id="b" name="b" value="50"&gt;
              =
              &lt;output name="result" for="a b"&gt;100&lt;/output&gt;
            &lt;/form&gt;
          </pre>
        `,
        status: "locked",
        quizzes: [
          {
            id: 3003,
            question: "Which HTML element creates a dropdown list?",
            options: [
              "<dropdown>",
              "<option>",
              "<select>",
              "<list>"
            ],
            correctAnswer: 2
          },
          {
            id: 3004,
            question: "Which element is used for multi-line text input?",
            options: [
              "<input type=\"text\">",
              "<input type=\"multiline\">",
              "<textbox>",
              "<textarea>"
            ],
            correctAnswer: 3
          }
        ]
      }
    ]
  }
];

// Achievement badges
const achievements = [
  {
    id: 1,
    title: "HTML Beginner",
    description: "Completed the HTML Fundamentals module",
    icon: <BookOpen className="h-6 w-6" />,
    unlocked: true
  },
  {
    id: 2,
    title: "Text Formatter",
    description: "Completed 2 lessons in HTML Text Formatting",
    icon: <Code className="h-6 w-6" />,
    unlocked: true
  },
  {
    id: 3,
    title: "Perfect Score",
    description: "Scored 100% on all quizzes in a module",
    icon: <Star className="h-6 w-6" />,
    unlocked: false
  },
  {
    id: 4,
    title: "Form Builder",
    description: "Completed the HTML Forms & Input module",
    icon: <FileQuestion className="h-6 w-6" />,
    unlocked: false
  }
];

export default function LearningPath() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedModule, setSelectedModule] = useState<null | Module>(null);
  const [selectedLesson, setSelectedLesson] = useState<null | Lesson>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  
  // Calculate overall progress
  const overallProgress = learningModules.reduce((acc, module) => {
    return acc + module.progress;
  }, 0) / learningModules.length;
  
  // Start a lesson
  const startLesson = (module: Module, lesson: Lesson) => {
    if (lesson.status === "locked") {
      toast({
        title: "Lesson Locked",
        description: "Complete previous lessons to unlock this one.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedModule(module);
    setSelectedLesson(lesson);
    setShowQuiz(false);
    setQuizCompleted(false);
    setSelectedAnswers({});
    setCurrentQuestion(0);
  };
  
  // Start the quiz for a lesson
  const startQuiz = () => {
    setShowQuiz(true);
    setQuizCompleted(false);
    setSelectedAnswers({});
    setCurrentQuestion(0);
  };
  
  // Handle answer selection
  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };
  
  // Submit quiz answers
  const submitQuiz = () => {
    if (!selectedLesson) return;
    
    let correctAnswers = 0;
    selectedLesson.quizzes.forEach(quiz => {
      if (selectedAnswers[quiz.id] === quiz.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / selectedLesson.quizzes.length) * 100);
    setQuizScore(score);
    setQuizCompleted(true);
    
    if (score >= 70) {
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score}%. You've passed this lesson's quiz.`,
      });
    } else {
      toast({
        title: "Quiz Failed",
        description: `You scored ${score}%. You need at least 70% to pass.`,
        variant: "destructive",
      });
    }
  };
  
  // Return to module view
  const returnToModules = () => {
    setSelectedModule(null);
    setSelectedLesson(null);
    setShowQuiz(false);
  };
  
  // Authentication required view
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="text-center py-10 border border-dashed rounded-lg border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to access the learning path.
          </p>
          <Button onClick={() => window.scrollTo(0, 0)}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }
  
  // Quiz view
  if (selectedLesson && showQuiz) {
    const currentQuiz = selectedLesson.quizzes[currentQuestion];
    
    return (
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <Button 
          variant="outline" 
          onClick={() => setShowQuiz(false)}
          className="mb-8"
        >
          Back to Lesson
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileQuestion className="h-5 w-5 mr-2 text-primary" />
              Quiz: {selectedLesson.title}
            </CardTitle>
            <CardDescription>
              Test your knowledge of {selectedLesson.title}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {quizCompleted ? (
              <div className="text-center py-6">
                <div className="mb-4">
                  {quizScore >= 70 ? (
                    <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
                  ) : (
                    <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500 mb-2" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Your Score: {quizScore}%</h3>
                
                {quizScore >= 70 ? (
                  <p className="text-green-600 dark:text-green-400 mb-6">
                    Congratulations! You've passed this quiz.
                  </p>
                ) : (
                  <p className="text-yellow-600 dark:text-yellow-400 mb-6">
                    You need at least 70% to pass. Try again!
                  </p>
                )}
                
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setQuizCompleted(false);
                      setSelectedAnswers({});
                      setCurrentQuestion(0);
                    }}
                  >
                    Try Again
                  </Button>
                  
                  <Button onClick={() => setShowQuiz(false)}>
                    Return to Lesson
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline">
                    Question {currentQuestion + 1} of {selectedLesson.quizzes.length}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-medium mb-4">{currentQuiz.question}</h3>
                
                <RadioGroup 
                  value={selectedAnswers[currentQuiz.id]?.toString()}
                  onValueChange={(value) => handleAnswerSelect(currentQuiz.id, parseInt(value))}
                  className="space-y-3"
                >
                  {currentQuiz.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  
                  {currentQuestion < selectedLesson.quizzes.length - 1 ? (
                    <Button 
                      onClick={() => setCurrentQuestion(prev => prev + 1)}
                      disabled={selectedAnswers[currentQuiz.id] === undefined}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button 
                      onClick={submitQuiz}
                      disabled={Object.keys(selectedAnswers).length < selectedLesson.quizzes.length}
                    >
                      Submit Quiz
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Lesson detail view
  if (selectedLesson && selectedModule) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <Button 
          variant="outline" 
          onClick={returnToModules}
          className="mb-8"
        >
          Back to Learning Path
        </Button>
        
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="outline" className="text-primary">
            {selectedModule.title}
          </Badge>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <h1 className="text-3xl font-bold">{selectedLesson.title}</h1>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {selectedLesson.description}
        </p>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div 
              className="prose dark:prose-invert max-w-none" 
              dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
            />
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={startQuiz}>
            <FileQuestion className="h-4 w-4 mr-2" />
            Take Quiz
          </Button>
        </div>
      </div>
    );
  }
  
  // Learning path overview
  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">HTML Learning Path</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Follow this structured path to master HTML from basics to advanced topics
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
            <Progress
              value={overallProgress}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {learningModules.filter(m => m.progress === 100).length} / {learningModules.length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Complete all modules to become an HTML expert
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {achievements.filter(a => a.unlocked).length} / {achievements.length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Unlock all achievements by completing challenges
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <GraduationCap className="h-5 w-5 mr-2" />
          Your Learning Modules
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {learningModules.map((module) => (
            <AccordionItem key={module.id} value={`module-${module.id}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full p-2 mr-3">
                    {module.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold">{module.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {module.progress}% complete
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-12 pr-4 pb-2">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {module.description}
                  </p>
                  
                  <Progress
                    value={module.progress}
                    className="h-2 mb-6"
                  />
                  
                  <div className="space-y-4">
                    {module.lessons.map((lesson) => (
                      <Card key={lesson.id} className="overflow-hidden">
                        <div className={`
                          flex items-center justify-between p-4
                          ${lesson.status === "completed" ? "bg-green-50 dark:bg-green-950" : ""}
                          ${lesson.status === "locked" ? "bg-gray-50 dark:bg-gray-900" : ""}
                        `}>
                          <div className="flex items-center">
                            {lesson.status === "locked" && (
                              <Lock className="h-5 w-5 text-gray-400 mr-3" />
                            )}
                            {lesson.status === "available" && (
                              <Unlock className="h-5 w-5 text-blue-500 mr-3" />
                            )}
                            {lesson.status === "completed" && (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                            )}
                            
                            <div>
                              <h4 className={`font-medium ${lesson.status === "locked" ? "text-gray-500" : ""}`}>
                                {lesson.title}
                              </h4>
                              <p className={`text-sm ${lesson.status === "locked" ? "text-gray-400" : "text-gray-500"}`}>
                                {lesson.description}
                              </p>
                            </div>
                          </div>
                          
                          <Button
                            variant={lesson.status === "completed" ? "outline" : "default"}
                            size="sm"
                            onClick={() => startLesson(module, lesson)}
                            disabled={lesson.status === "locked"}
                          >
                            {lesson.status === "completed" ? "Review" : "Start"}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Your Achievements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id}
              className={`${achievement.unlocked ? "" : "opacity-50"}`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div className={`
                    rounded-full p-2
                    ${achievement.unlocked ? "bg-primary/10" : "bg-gray-100 dark:bg-gray-800"}
                  `}>
                    {achievement.icon}
                  </div>
                  
                  {achievement.unlocked ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold mb-1">{achievement.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}