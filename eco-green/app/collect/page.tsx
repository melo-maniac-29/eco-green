"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Assuming you have a badge component.
import { FileIcon } from "lucide-react"; // Assuming you need a file upload icon.

export default function CollectPage() {
  const [logs, setLogs] = useState([
    {
      id: 1,
      place: "Park A",
      category: "Plastic",
      status: "Pending",
      points: "5",
    },
    {
      id: 2,
      place: "Beach B",
      category: "Glass",
      status: "Pending",
      points: "7",
    },
    {
      id: 3,
      place: "Street C",
      category: "Metal",
      status: "Pending",
      points: "10",
    },
    {
      id: 4,
      place: "Park D",
      category: "Paper",
      status: "Pending",
      points: "6",
    },
    {
      id: 5,
      place: "Market E",
      category: "Plastic",
      status: "Pending",
      points: "4",
    },
    {
      id: 6,
      place: "Beach F",
      category: "Glass",
      status: "Pending",
      points: "9",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [currentLog, setCurrentLog] = useState<any>(null); // Track the current log for points popup.
  const [file, setFile] = useState<File | null>(null); // Track the uploaded file.

  const handleCollect = (id: number) => {
    setLogs((prevLogs) =>
      prevLogs.map((log) =>
        log.id === id ? { ...log, status: "On Collection" } : log
      )
    );
  };

  const handleVerify = (id: number) => {
    setLogs((prevLogs) =>
      prevLogs.map((log) =>
        log.id === id ? { ...log, status: "Verified" } : log
      )
    );
    setCurrentLog(id); // Store the current log for later point display.
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      alert("Please upload a file!");
      return;
    }

    // Simulating the upload process
    setTimeout(() => {
      setLogs((prevLogs) =>
        prevLogs.map((log) =>
          log.id === currentLog ? { ...log, status: "Successfully Collected" } : log
        )
      );
      setShowPopup(true); // Show the points earned popup after upload.
    }, 2000); // Simulating file upload delay
  };

  return (
    <MainLayout requireAuth>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Collect Wastes</h1>
        <p className="text-muted-foreground">Track and collect waste from various places</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {logs.map((log) => (
            <Card key={log.id} className="shadow-md rounded-lg p-4 max-w-xs mx-auto">
              <CardHeader className="p-2">
                <CardTitle className="text-lg font-semibold">{log.place}</CardTitle>
                <CardDescription className="text-sm">{log.category} Waste</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Status: </span>
                  <span
                    className={`${
                      log.status === "Pending"
                        ? "text-yellow-500"
                        : log.status === "On Collection"
                        ? "text-blue-500"
                        : log.status === "Verified"
                        ? "text-orange-500"
                        : "text-green-600"
                    } font-semibold`}
                  >
                    {log.status}
                  </span>
                </div>
                
                {log.status === "Pending" && (
                  <Button
                    className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleCollect(log.id)}
                  >
                    Collect
                  </Button>
                )}

                {log.status === "On Collection" && (
                  <Button
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleVerify(log.id)}
                  >
                    Verify Now
                  </Button>
                )}

                {log.status === "Verified" && (
                  <div className="flex flex-col items-center mt-4">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="mb-4 border p-2"
                    />
                    <Button
                      className="w-full bg-gray-500 text-white"
                      onClick={handleSubmit}
                    >
                      Upload File
                    </Button>
                    <p className="text-sm mt-2 text-muted-foreground">Submit proof of collection</p>
                  </div>
                )}

                {log.status === "Successfully Collected" && (
                  <div className="flex items-center justify-between mt-4">
                    <Badge className="bg-green-500 text-white">Success</Badge>
                    <span className="font-semibold text-green-600">+{log.points} Points</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-4 bg-green-100 rounded-lg shadow-md max-w-xs w-full text-center">
              <p className="font-semibold text-green-600 text-lg">🎉 You have earned points!</p>
              <p className="text-green-700 font-bold text-xl mt-4">+{logs.find(log => log.id === currentLog)?.points} Points</p>
              <Button
                onClick={() => setShowPopup(false)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
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
