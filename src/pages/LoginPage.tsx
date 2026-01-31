import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lock, Mail, Shield } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to access your account</p>
      </div>

      {/* Login Form */}
      <form className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Email Address
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </Label>
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="remember-me" />
          <Label htmlFor="remember-me" className="text-sm text-gray-700 font-normal cursor-pointer">
            Remember me for 30 days
          </Label>
        </div>

        <Button type="submit" className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
          Sign In Securely
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">
          Sign up
        </a>
      </div>

      {/* Security Notice */}
      <Card className="mt-8 bg-blue-50 border-blue-100">
        <CardContent className="p-4">
          <p className="text-xs text-center text-blue-900 flex items-center justify-center">
            <Shield className="w-4 h-4 mr-1" />
            Your connection is secured with 256-bit SSL encryption
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
