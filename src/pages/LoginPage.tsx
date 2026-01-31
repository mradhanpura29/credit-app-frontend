import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, Mail, Shield, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/loginSchema";

export default function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "applicant",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password, data.role);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 transform hover:scale-105 transition-transform duration-300">
              <Shield className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-base">
          Sign in to continue to your account
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium text-gray-700">
            Role
          </Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="h-11 border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="applicant">Applicant</SelectItem>
                  <SelectItem value="approver">Approver</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
              {errors.role.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="pl-11 h-11 border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-11 h-11 border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-1 w-full">
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a
          href="#"
          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Create account
        </a>
      </div>

      {/* Security Notice */}
      <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 rounded-2xl backdrop-blur-sm">
        <p className="text-xs text-center text-blue-900/80 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5" strokeWidth={2.5} />
          <span className="font-medium">256-bit SSL encrypted connection</span>
        </p>
      </div>
    </div>
  );
}
