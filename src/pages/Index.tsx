import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Leaf, LogOut } from 'lucide-react';

export default function Index() {
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'application'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState<'applicant' | 'admin' | null>(null);

  const handleLogin = (role: 'applicant' | 'admin') => {
    setUserRole(role);
    if (role === 'admin') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('application');
    }
  };

  const handleLogout = () => {
    setCurrentView('login');
    setUserRole(null);
    setUsername('');
    setPassword('');
  };

  // Sample admin dashboard data
  const applications = [
    { id: 'AFZ-2026-001', name: 'John Adeyemi', type: 'Loan', amount: '₦500,000', status: 'Pending' },
    { id: 'AFZ-2026-002', name: 'Chioma Okafor', type: 'Grant', amount: '₦250,000', status: 'Approved' },
    { id: 'AFZ-2026-003', name: 'Ahmed Hassan', type: 'Loan', amount: '₦750,000', status: 'Rejected' },
    { id: 'AFZ-2026-004', name: 'Blessing Eze', type: 'Grant', amount: '₦300,000', status: 'Approved' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      {userRole && (
        <header className="bg-white border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">AFaz Agricultural</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {userRole === 'admin' ? 'Admin Dashboard' : 'Applicant Portal'}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>
      )}

      {/* Login Page */}
      {currentView === 'login' && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Leaf className="w-8 h-8" />
                  <CardTitle className="text-white">AFaz Agricultural</CardTitle>
                </div>
                <CardDescription className="text-green-50">
                  Grant and Loan Management System
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-foreground font-medium">
                      Username / Phone Number
                    </Label>
                    <Input
                      id="username"
                      placeholder="Enter your username or phone"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>

                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-accent font-semibold py-2"
                    onClick={() => handleLogin('applicant')}
                  >
                    LOGIN
                  </Button>

                  <div className="text-center">
                    <a href="#" className="text-sm text-primary hover:underline font-medium">
                      Forgot Password?
                    </a>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-muted-foreground">New Applicant?</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-2"
                  >
                    Create Account
                  </Button>

                  {/* Demo Admin Access */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center mb-2">Demo: Admin Access</p>
                    <Button
                      variant="ghost"
                      className="w-full text-xs text-primary hover:text-accent"
                      onClick={() => handleLogin('admin')}
                    >
                      View Admin Dashboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      {currentView === 'dashboard' && userRole === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">4</p>
                  <p className="text-sm text-muted-foreground mt-1">Total Applications</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-600">1</p>
                  <p className="text-sm text-muted-foreground mt-1">Pending Review</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">2</p>
                  <p className="text-sm text-muted-foreground mt-1">Approved</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">1</p>
                  <p className="text-sm text-muted-foreground mt-1">Rejected</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Applications</CardTitle>
              <CardDescription>Manage and review submitted applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-foreground">Reference</TableHead>
                      <TableHead className="text-foreground">Applicant</TableHead>
                      <TableHead className="text-foreground">Type</TableHead>
                      <TableHead className="text-foreground">Amount</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id} className="border-border hover:bg-muted">
                        <TableCell className="font-mono text-sm text-foreground">{app.id}</TableCell>
                        <TableCell className="text-foreground">{app.name}</TableCell>
                        <TableCell className="text-foreground">{app.type}</TableCell>
                        <TableCell className="font-semibold text-foreground">{app.amount}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(app.status)} font-medium`}>
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="text-primary hover:text-accent">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Application Form */}
      {currentView === 'application' && userRole === 'applicant' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-white">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
              <CardTitle className="text-white">Application Form</CardTitle>
              <CardDescription className="text-green-50">
                Complete all sections to submit your application
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-muted">
                  <TabsTrigger value="personal" className="text-xs sm:text-sm">
                    Personal
                  </TabsTrigger>
                  <TabsTrigger value="identification" className="text-xs sm:text-sm">
                    ID
                  </TabsTrigger>
                  <TabsTrigger value="agricultural" className="text-xs sm:text-sm">
                    Agricultural
                  </TabsTrigger>
                  <TabsTrigger value="grant" className="text-xs sm:text-sm">
                    Grant/Loan
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground font-medium">Full Name</Label>
                      <Input placeholder="Your full name" className="mt-2 bg-input border-border" />
                    </div>
                    <div>
                      <Label className="text-foreground font-medium">Phone Number</Label>
                      <Input placeholder="+234 800 000 0000" className="mt-2 bg-input border-border" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground font-medium">Email</Label>
                      <Input type="email" placeholder="your@email.com" className="mt-2 bg-input border-border" />
                    </div>
                    <div>
                      <Label className="text-foreground font-medium">Date of Birth</Label>
                      <Input type="date" className="mt-2 bg-input border-border" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-foreground font-medium">Address</Label>
                    <Input placeholder="Your residential address" className="mt-2 bg-input border-border" />
                  </div>
                </TabsContent>

                <TabsContent value="identification" className="space-y-4 mt-6">
                  <div>
                    <Label className="text-foreground font-medium">Upload ID Document</Label>
                    <Input type="file" className="mt-2 bg-input border-border" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground font-medium">NIN (11 digits)</Label>
                      <Input placeholder="12345678901" className="mt-2 bg-input border-border" />
                    </div>
                    <div>
                      <Label className="text-foreground font-medium">BVN (11 digits)</Label>
                      <Input placeholder="12345678901" className="mt-2 bg-input border-border" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-foreground font-medium">Bank Account Number</Label>
                    <Input placeholder="0123456789" className="mt-2 bg-input border-border" />
                  </div>
                </TabsContent>

                <TabsContent value="agricultural" className="space-y-4 mt-6">
                  <div>
                    <Label className="text-foreground font-medium">Type of Agricultural Business</Label>
                    <div className="mt-3 space-y-2">
                      {['Crop Farming', 'Livestock', 'Poultry', 'Fish Farming', 'Agro-processing', 'Other'].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="business" className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="grant" className="space-y-4 mt-6">
                  <div>
                    <Label className="text-foreground font-medium">Application Type</Label>
                    <div className="mt-3 space-y-2">
                      {['Grant', 'Loan'].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="applicationType" className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-foreground font-medium">Amount Requested (₦)</Label>
                    <Input placeholder="500,000" className="mt-2 bg-input border-border" />
                  </div>
                  <div>
                    <Label className="text-foreground font-medium">Loan Repayment Duration</Label>
                    <select className="w-full mt-2 px-3 py-2 border border-border rounded-md bg-input text-foreground">
                      <option>Select duration</option>
                      <option>3 Months</option>
                      <option>6 Months</option>
                      <option>12 Months</option>
                      <option>18 Months</option>
                      <option>24 Months</option>
                    </select>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-3 mt-8 pt-6 border-t border-border">
                <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-muted">
                  Save as Draft
                </Button>
                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-accent font-semibold">
                  Preview & Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
