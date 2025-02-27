"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function ReportPage() {
  const { toast } = useToast();
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Report submitted",
      description: "Thank you for your environmental report!",
    });
    setShowPopup(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <MainLayout requireAuth>
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <h1 className="text-3xl font-bold">Report Environmental Activity</h1>
        <p className="text-muted-foreground text-center">
          Submit details about environmental issues or your sustainable
          activities
        </p>

        <Card className="w-full max-w-2xl">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>New Report</CardTitle>
              <CardDescription>
                Fill out the form below to submit your environmental report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select defaultValue="activity">
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activity">
                      Sustainable Activity
                    </SelectItem>
                    <SelectItem value="issue">Environmental Issue</SelectItem>
                    <SelectItem value="suggestion">
                      Improvement Suggestion
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Brief title for your report" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about your environmental report"
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Upload Image (Optional)</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Submit Report
              </Button>
            </CardFooter>
          </form>
        </Card>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="p-6 bg-white bg-opacity-20 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
                Report Summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl text-green-600">🌿</span>
                  <p className="font-semibold text-lg text-white-800">
                    Category:{" "}
                    <span className="text-green-700">Sustainable Activity</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl text-green-600">📌</span>
                  <p className="font-semibold text-lg text-white-800">
                    Description:{" "}
                    <span className="text-green-700">
                      Plastic waste collection in local park
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl text-green-600">⭐</span>
                  <p className="font-semibold text-lg text-white-800">
                    Points Earned: <span className="text-green-700">5+</span>
                  </p>
                </div>

                <p className="text-center text-green-800 text-xl font-semibold mt-4">
                  You have done a great job! ✅
                </p>
              </div>

              <Button
                onClick={() => setShowPopup(false)}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
