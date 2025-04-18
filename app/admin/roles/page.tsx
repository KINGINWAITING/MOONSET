"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function RoleManagementPage() {
  const { user, isLoaded } = useUser();
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Check if user is admin
  if (!user || user.publicMetadata.role !== "admin") {
    redirect("/dashboard");
  }

  const handleRoleUpdate = async () => {
    // In a real application, you would call an API to update the user's role
    console.log(`Updating role for user ${selectedUser} to ${selectedRole}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Role Management</h1>

        <Card>
          <CardHeader>
            <CardTitle>Update User Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user">Select User</Label>
                <Input
                  id="user"
                  placeholder="Enter user email"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Select Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="researcher">Researcher</SelectItem>
                    <SelectItem value="contributor">Contributor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleRoleUpdate} disabled={!selectedUser || !selectedRole}>
                Update Role
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Current Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">Admin User</p>
                  <p className="text-sm text-muted-foreground">admin@example.com</p>
                </div>
                <Badge variant="secondary">Admin</Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">Researcher User</p>
                  <p className="text-sm text-muted-foreground">researcher@example.com</p>
                </div>
                <Badge variant="secondary">Researcher</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 