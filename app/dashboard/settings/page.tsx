"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { user } = useUser()
  const { toast } = useToast()

  // State for notification preferences
  const [notifications, setNotifications] = useState({
    email: true, // Assume default is true
    push: false,
    marketing: false,
  })

  // State for profile form (can be pre-filled if user data available)
  const [profile, setProfile] = useState({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    bio: "", // Add bio if available from user data or leave empty
  })

  // State for password form
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.id.replace("-password", "")]: e.target.value })
  }

  const handleSaveChanges = () => {
    // Add logic to save profile changes (e.g., API call)
    console.log("Saving profile:", profile)
    toast({ title: "Profile Updated", description: "Your profile information has been saved." })
  }

  const handleUpdatePassword = () => {
    // Add logic to update password (e.g., API call)
    if (password.new !== password.confirm) {
      toast({ variant: "destructive", title: "Password Mismatch", description: "New passwords do not match." })
      return
    }
    if (password.new.length < 8) {
       toast({ variant: "destructive", title: "Password Too Short", description: "New password must be at least 8 characters." })
      return
    }
    console.log("Updating password...")
    // Reset form after potential API call
    setPassword({ current: "", new: "", confirm: "" })
    toast({ title: "Password Updated", description: "Your password has been changed successfully." })
  }

  return (
    <div className="space-y-8 theme-transition">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings, profile, and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-1/2">
          <TabsTrigger value="profile" className="settings-tab">Profile</TabsTrigger>
          <TabsTrigger value="security" className="settings-tab">Security</TabsTrigger>
          <TabsTrigger value="notifications" className="settings-tab">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="settings-card">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your public profile information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" className="settings-input" value={profile.name} onChange={handleProfileChange} placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" className="settings-input" value={profile.email} onChange={handleProfileChange} placeholder="your.email@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" className="settings-input" value={profile.bio} onChange={handleProfileChange} placeholder="Tell the community a little about yourself" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="settings-card">
            <CardHeader>
              <CardTitle>Password Management</CardTitle>
              <CardDescription>
                Update your account password. Ensure it's strong and unique.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" className="settings-input" value={password.current} onChange={handlePasswordChange} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                   <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="settings-input" value={password.new} onChange={handlePasswordChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="settings-input" value={password.confirm} onChange={handlePasswordChange} />
                  </div>
                </div>
                 <p className="text-xs text-muted-foreground">Minimum 8 characters required.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdatePassword}>Update Password</Button>
            </CardFooter>
          </Card>

          <Card className="settings-card">
            <CardHeader>
              <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account during login.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border p-4 settings-input">
                <div className="space-y-1">
                  <Label className="text-base">Enable 2FA</Label>
                  <p className="text-sm text-muted-foreground">
                    Strongly recommended for enhanced account security.
                  </p>
                </div>
                <Switch className="settings-switch" />
              </div>
            </CardContent>
             <CardFooter>
               <p className="text-xs text-muted-foreground">You might need to configure 2FA settings via your primary Clerk account management.</p>
             </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="settings-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you receive updates and communications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important account updates and notifications via email.
                  </p>
                </div>
                <Switch
                  className="settings-switch"
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>
              <Separator className="settings-separator" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get real-time updates through browser push notifications (if supported).
                  </p>
                </div>
                <Switch
                  className="settings-switch"
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>
              <Separator className="settings-separator" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-medium">Marketing & Promotions</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive occasional emails about new features and promotions.
                  </p>
                </div>
                <Switch
                  className="settings-switch"
                  checked={notifications.marketing}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, marketing: checked })
                  }
                />
              </div>
            </CardContent>
             <CardFooter>
              <Button onClick={() => toast({title: "Notification Settings Saved"})}>Save Preferences</Button>
            </CardFooter>
          </Card>

           <Card className="settings-card">
            <CardHeader>
              <CardTitle>Theme Preference</CardTitle>
              <CardDescription>
                Choose your preferred interface appearance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border p-4 settings-input">
                 <div className="space-y-1">
                   <Label className="text-base">Enable Dark Mode</Label>
                   <p className="text-sm text-muted-foreground">
                     Switch between light and dark themes globally.
                   </p>
                 </div>
                 <Switch
                   className="settings-switch"
                   checked={theme === "dark"}
                   onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                 />
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 