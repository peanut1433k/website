import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Clock, Award, ChevronRight, Trophy, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CodeEditor from "@/components/CodeEditor";
import LivePreview from "@/components/LivePreview";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock challenges data - in a real app this would come from the API
const mockChallenges = [
  {
    id: 1,
    title: "Basic HTML Structure",
    description: "Create a valid HTML document with proper structure including html, head, and body tags.",
    difficulty: "beginner",
    timeLimit: 300, // 5 minutes in seconds
    startingCode: "<!-- Start your HTML document here -->",
    expectedOutput: [
      "<html",
      "<head",
      "<body"
    ],
    hint: "Remember that every HTML document needs the basic structure tags!"
  },
  {
    id: 2,
    title: "Navigation Menu",
    description: "Create a navigation menu with at least 4 items using the nav and ul/li elements.",
    difficulty: "intermediate",
    timeLimit: 420, // 7 minutes in seconds
    startingCode: "<!-- Create your navigation menu here -->",
    expectedOutput: [
      "<nav",
      "<ul",
      "<li",
      "</nav>"
    ],
    hint: "The nav element should contain an unordered list (ul) with list items (li)."
  },
  {
    id: 3,
    title: "Form Creation",
    description: "Create a form with inputs for name, email, and a submit button.",
    difficulty: "intermediate",
    timeLimit: 480, // 8 minutes in seconds
    startingCode: "<!-- Create your form here -->",
    expectedOutput: [
      "<form",
      "type=\"text\"",
      "type=\"email\"",
      "type=\"submit\"",
      "</form>"
    ],
    hint: "Forms need the form tag and various input types for different kinds of data."
  },
  {
    id: 4,
    title: "Semantic Article",
    description: "Create a semantic article with header, section, and footer elements.",
    difficulty: "advanced",
    timeLimit: 540, // 9 minutes in seconds
    startingCode: "<!-- Create your semantic article here -->",
    expectedOutput: [
      "<article",
      "<header",
      "<section",
      "<footer",
      "</article>"
    ],
    hint: "Semantic elements help describe the meaning of the content they contain."
  },
  {
    id: 5,
    title: "Responsive Image Gallery",
    description: "Create a responsive image gallery with figure and figcaption elements.",
    difficulty: "advanced",
    timeLimit: 600, // 10 minutes in seconds
    startingCode: "<!-- Create your image gallery here -->",
    expectedOutput: [
      "<figure",
      "<img",
      "<figcaption",
      "</figure>"
    ],
    hint: "The figure element represents self-contained content, while figcaption provides a caption."
  }
];

// Mock leaderboard data
const mockLeaderboard = [
  { id: 1, username: "html_master", completedChallenges: 42, points: 1250, rank: 1 },
  { id: 2, username: "code_ninja", completedChallenges: 39, points: 1180, rank: 2 },
  { id: 3, username: "web_dev_pro", completedChallenges: 35, points: 1050, rank: 3 },
  { id: 4, username: "css_wizard", completedChallenges: 32, points: 960, rank: 4 },
  { id: 5, username: "tag_expert", completedChallenges: 30, points: 900, rank: 5 },
  { id: 6, username: "markup_guru", completedChallenges: 28, points: 840, rank: 6 },
  { id: 7, username: "element_master", completedChallenges: 25, points: 750, rank: 7 },
  { id: 8, username: "attribute_king", completedChallenges: 22, points: 660, rank: 8 },
  { id: 9, username: "html5_fan", completedChallenges: 18, points: 540, rank: 9 },
  { id: 10, username: "semantic_lover", completedChallenges: 15, points: 450, rank: 10 },
];

// Function to format time from seconds to MM:SS
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Difficulty badge component
const DifficultyBadge = ({ level }: { level: string }) => {
  let color;
  switch (level) {
    case "beginner":
      color = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      break;
    case "intermediate":
      color = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      break;
    case "advanced":
      color = "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      break;
    default:
      color = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
};

export default function Challenges() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedChallenge, setSelectedChallenge] = useState<null | typeof mockChallenges[0]>(null);
  const [userCode, setUserCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [challengeStatus, setChallengeStatus] = useState<"pending" | "success" | "failed" | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [filteredChallenges, setFilteredChallenges] = useState(mockChallenges);
  
  // Filter challenges by difficulty
  useEffect(() => {
    if (filterDifficulty === "all") {
      setFilteredChallenges(mockChallenges);
    } else {
      setFilteredChallenges(mockChallenges.filter(
        challenge => challenge.difficulty === filterDifficulty
      ));
    }
  }, [filterDifficulty]);
  
  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            handleChallengeEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false);
      handleChallengeEnd();
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);
  
  // Start challenge
  const startChallenge = (challenge: typeof mockChallenges[0]) => {
    setSelectedChallenge(challenge);
    setUserCode(challenge.startingCode);
    setTimeLeft(challenge.timeLimit);
    setChallengeStatus("pending");
    setIsTimerActive(true);
  };
  
  // Submit solution
  const submitSolution = () => {
    handleChallengeEnd();
  };
  
  // Handle challenge end (time up or submit)
  const handleChallengeEnd = () => {
    setIsTimerActive(false);
    
    if (!selectedChallenge) return;
    
    // Check if solution meets requirements
    const isValid = selectedChallenge.expectedOutput.every(
      output => userCode.includes(output)
    );
    
    if (isValid) {
      setChallengeStatus("success");
      toast({
        title: "Challenge Completed!",
        description: "Great job! You've successfully completed the challenge.",
      });
    } else {
      setChallengeStatus("failed");
      toast({
        title: "Challenge Failed",
        description: "Your solution doesn't meet all the requirements. Try again?",
        variant: "destructive",
      });
    }
  };
  
  // Reset challenge
  const resetChallenge = () => {
    if (selectedChallenge) {
      setUserCode(selectedChallenge.startingCode);
      setTimeLeft(selectedChallenge.timeLimit);
      setChallengeStatus("pending");
      setIsTimerActive(true);
    }
  };
  
  // Choose a different challenge
  const chooseNewChallenge = () => {
    setSelectedChallenge(null);
    setUserCode("");
    setTimeLeft(0);
    setChallengeStatus(null);
    setIsTimerActive(false);
  };
  
  // Authentication required view
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="text-center py-10 border border-dashed rounded-lg border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to access the coding challenges.
          </p>
          <Button onClick={() => window.scrollTo(0, 0)}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }
  
  // Challenge detail view
  if (selectedChallenge) {
    const progressPercentage = ((selectedChallenge.timeLimit - timeLeft) / selectedChallenge.timeLimit) * 100;
    
    return (
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={chooseNewChallenge}>
            Back to Challenges
          </Button>
          
          <div className="flex items-center space-x-4">
            <DifficultyBadge level={selectedChallenge.difficulty} />
            
            <div className="flex items-center bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">
                {isTimerActive ? formatTime(timeLeft) : "Time's up!"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{selectedChallenge.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {selectedChallenge.description}
          </p>
          
          {timeLeft > 0 && (
            <Progress 
              value={progressPercentage} 
              className="h-2 mb-4" 
            />
          )}
          
          {challengeStatus === "success" && (
            <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 p-4 rounded-md mb-4 flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold">Challenge Completed!</h3>
                <p>Great job! You've successfully completed this challenge.</p>
              </div>
            </div>
          )}
          
          {challengeStatus === "failed" && (
            <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 p-4 rounded-md mb-4 flex items-start">
              <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold">Challenge Failed</h3>
                <p>Your solution doesn't meet all the requirements.</p>
                <details className="mt-2">
                  <summary className="cursor-pointer font-medium">Show Hint</summary>
                  <p className="mt-2 text-sm">{selectedChallenge.hint}</p>
                </details>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-3">Your Code</h2>
            <CodeEditor 
              initialValue={userCode}
              onChange={setUserCode}
              onRun={() => {}}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-3">Live Preview</h2>
            <div className="border rounded-md p-4 h-full min-h-[400px] bg-white dark:bg-gray-950">
              <LivePreview htmlCode={userCode} />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={resetChallenge}
            disabled={isTimerActive && challengeStatus === "pending"}
          >
            Reset Challenge
          </Button>
          
          <Button 
            onClick={submitSolution}
            disabled={!isTimerActive}
          >
            Submit Solution
          </Button>
        </div>
      </div>
    );
  }
  
  // Challenges list view
  return (
    <div className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Coding Challenges</h1>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Filter:</span>
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-[180px]">
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
      
      <Tabs defaultValue="challenges" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenges">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map(challenge => (
              <Card key={challenge.id} className="flex flex-col hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{challenge.title}</CardTitle>
                    <DifficultyBadge level={challenge.difficulty} />
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(challenge.timeLimit)}</span>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => startChallenge(challenge)}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Start Challenge
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                Top Performers
              </CardTitle>
              <CardDescription>
                The most successful coders based on challenges completed and points earned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead className="text-center">Challenges</TableHead>
                    <TableHead className="text-center">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLeaderboard.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.rank <= 3 ? (
                          <span className="flex items-center">
                            {user.rank === 1 && <span className="text-yellow-500 font-bold">#1</span>}
                            {user.rank === 2 && <span className="text-gray-400 font-bold">#2</span>}
                            {user.rank === 3 && <span className="text-amber-700 font-bold">#3</span>}
                          </span>
                        ) : (
                          `#${user.rank}`
                        )}
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell className="text-center">{user.completedChallenges}</TableCell>
                      <TableCell className="text-center">{user.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-3 flex items-center text-blue-800 dark:text-blue-300">
          <Award className="h-5 w-5 mr-2" />
          Challenge Benefits
        </h2>
        <p className="text-blue-700 dark:text-blue-400 mb-4">
          Completing coding challenges helps you build practical skills through hands-on practice.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
            <h3 className="font-bold mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Timed Practice
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn to code efficiently under time constraints, just like in real-world situations.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
            <h3 className="font-bold mb-2 flex items-center">
              <Trophy className="h-4 w-4 mr-2" />
              Skill Progression
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Start with beginner challenges and work your way up to more advanced concepts.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
            <h3 className="font-bold mb-2 flex items-center">
              <ChevronRight className="h-4 w-4 mr-2" />
              Instant Feedback
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get immediate results to see if your solution meets the requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}