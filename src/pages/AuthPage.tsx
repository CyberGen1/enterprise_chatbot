import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  AtSign, 
  Lock, 
  User, 
  ArrowLeft, 
  LogIn, 
  UserPlus 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('signin');
  
  // Form states
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Form submission states
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signinEmail || !signinPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSigningIn(true);
      // Mock authentication - replace with real auth logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success!",
        description: "You've successfully signed in."
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSigningIn(false);
    }
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (signupPassword !== signupConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive"
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "You must agree to terms and conditions",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSigningUp(true);
      // Mock registration - replace with real registration logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Account created!",
        description: "Your account has been successfully created."
      });
      setActiveTab('signin');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSigningUp(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
              Welcome to Cybergen
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your AI-powered enterprise solution
            </p>
          </div>
          
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                {activeTab === 'signin' ? 'Sign in to your account' : 'Create an account'}
              </CardTitle>
              <CardDescription className="text-center">
                {activeTab === 'signin' 
                  ? 'Enter your credentials below to access your account' 
                  : 'Fill in the form below to create your new account'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="name@example.com"
                          value={signinEmail}
                          onChange={(e) => setSigninEmail(e.target.value)}
                          className="pl-10"
                          autoComplete="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password">Password</Label>
                        <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="••••••••"
                          value={signinPassword}
                          onChange={(e) => setSigninPassword(e.target.value)}
                          className="pl-10"
                          autoComplete="current-password"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember-me" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember-me" className="text-sm font-normal">
                        Remember me for 30 days
                      </Label>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-cybergen-primary hover:bg-cybergen-secondary"
                      disabled={isSigningIn}
                    >
                      {isSigningIn ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2">⏳</span> Signing in...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <LogIn className="mr-2 h-4 w-4" /> Sign In
                        </span>
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="pl-10"
                          autoComplete="name"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="name@example.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="pl-10"
                          autoComplete="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="pl-10"
                          autoComplete="new-password"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-confirm-password"
                          type="password"
                          placeholder="••••••••"
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          className="pl-10"
                          autoComplete="new-password"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="agree-terms" 
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        required
                      />
                      <Label htmlFor="agree-terms" className="text-sm font-normal">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:underline">
                          terms and conditions
                        </Link>
                      </Label>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-cybergen-primary hover:bg-cybergen-secondary"
                      disabled={isSigningUp}
                    >
                      {isSigningUp ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2">⏳</span> Creating account...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                        </span>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-10">
                  <img src="/google-icon.svg" alt="Google" className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" className="h-10">
                  <img src="/microsoft-icon.svg" alt="Microsoft" className="mr-2 h-4 w-4" />
                  Microsoft
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuthPage; 