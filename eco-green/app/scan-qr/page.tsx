"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { QrReader } from 'react-qr-reader';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/main-layout";
import { Camera, Recycle, CoinsIcon, QrCode, Check, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Add this type at the top of the file
type WasteItem = {
    type: string;
    bin: string;
    recyclable: boolean;
    impact: string;
};

export default function EnvironmentalScanPage() {
    const [points, setPoints] = useState(0);
    const [scansToday, setScansToday] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const [isQrScanning, setIsQrScanning] = useState(false);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [qrResult, setQrResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [earnedTokens, setEarnedTokens] = useState(0);
    const webcamRef = useRef<Webcam>(null);

    // Add this state in your component
    const [wasteDetails, setWasteDetails] = useState<WasteItem>({
        type: "Plastic Bottle",
        bin: "Recycle Bin",
        recyclable: true,
        impact: "Reduces plastic pollution and saves energy"
    });

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setImgSrc(imageSrc);
            setScansToday(prev => prev + 1);
            setPoints(prev => prev + 10);
            setIsScanning(false);
        }
    }, [webcamRef]);

    // Update the handleQrScan function
    const handleQrScan = async (result: any) => {
        if (result) {
            setQrResult(result?.text);
            setIsQrScanning(false);
            setIsLoading(true);

            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 2000));

            const tokens = 150;
            setEarnedTokens(tokens);
            setPoints(prev => prev + tokens);
            setShowSuccess(true);
        }
    };

    const resetScanPage = () => {
        setImgSrc(null);
        setQrResult(null);
        setIsLoading(false);
        setShowSuccess(false);
        setIsScanning(false);
        setIsQrScanning(false);
    };

    const videoConstraints = {
        width: 720,
        height: 480,
        facingMode: "environment"
    };

    return (
        <MainLayout requireAuth>
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold">Environmental Impact Scanner</h1>
                <p className="text-muted-foreground">
                    Scan waste items to track your sustainability contributions and earn eco-points
                </p>

                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Scan Waste Item</CardTitle>
                        <CardDescription>
                            Use your camera to scan and classify waste items for proper disposal
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 text-center p-6">
                            {!imgSrc ? (
                                <Button
                                    onClick={() => setIsScanning(true)}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Start Scanning
                                </Button>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="bg-muted rounded-lg overflow-hidden">
                                                <img
                                                    src={imgSrc}
                                                    alt="Captured waste item"
                                                    className="w-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-muted p-4 rounded-lg space-y-4">
                                                <h3 className="font-semibold text-lg">Waste Item Details</h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-muted-foreground">Type:</span>
                                                        <span className="font-medium">{wasteDetails.type}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-muted-foreground">Recommended Bin:</span>
                                                        <span className="font-medium text-green-600">{wasteDetails.bin}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-muted-foreground">Status:</span>
                                                        <div className="flex items-center gap-2">
                                                            <div className={`h-2 w-2 rounded-full ${wasteDetails.recyclable ? "bg-green-500" : "bg-red-500"
                                                                }`} />
                                                            <span className="font-medium">
                                                                {wasteDetails.recyclable ? "Recyclable" : "Non-recyclable"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-green-50 p-4 rounded-lg">
                                                <h4 className="font-semibold text-green-800 mb-2">Environmental Impact</h4>
                                                <p className="text-sm text-green-600">{wasteDetails.impact}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t pt-6 space-y-4">
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-muted-foreground">
                                                Please scan the QR code on the nearby waste bin to complete the recycling process
                                            </p>
                                            <Button
                                                onClick={() => setIsQrScanning(true)}
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                <QrCode className="h-4 w-4 mr-2" />
                                                Scan Bin QR Code
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Update the loading dialog section */}
            <Dialog
                open={isLoading}
                onOpenChange={(open) => {
                    if (!open) {
                        resetScanPage();
                        setIsLoading(false);
                        setShowSuccess(false);
                        setImgSrc(null);
                    }
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <div className="flex flex-col items-center justify-center space-y-4 py-8">
                        {!showSuccess ? (
                            <>
                                <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
                                <DialogTitle>Processing Your Contribution</DialogTitle>
                                <DialogDescription className="text-center">
                                    Calculating environmental impact and rewards...
                                </DialogDescription>
                                <div className="w-full max-w-xs bg-muted rounded-full h-2 overflow-hidden">
                                    <div className="bg-green-600 h-full animate-progress" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check className="h-6 w-6 text-green-600" />
                                </div>
                                <DialogTitle>Thank You for Recycling!</DialogTitle>
                                <DialogDescription className="text-center space-y-2">
                                    <p>Your contribution helps make our planet greener.</p>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-green-800 font-semibold">
                                            You've earned {earnedTokens} eco-tokens
                                        </p>
                                        <p className="text-sm text-green-600">
                                            Total balance: {points} tokens
                                        </p>
                                    </div>
                                </DialogDescription>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Waste Item Scanner Dialog */}
            <Dialog open={isScanning} onOpenChange={setIsScanning}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Scan Waste Item</DialogTitle>
                        <DialogDescription>
                            Position the item in the camera frame
                        </DialogDescription>
                    </DialogHeader>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 border-2 border-white rounded-lg opacity-50" />
                        </div>
                    </div>
                    <div className="flex space-x-2 justify-end">
                        <Button variant="outline" onClick={() => setIsScanning(false)}>
                            Cancel
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={capture}
                        >
                            Capture
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* QR Code Scanner Dialog */}
            <Dialog open={isQrScanning} onOpenChange={setIsQrScanning}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Scan Bin QR Code</DialogTitle>
                        <DialogDescription>
                            Point your camera at the QR code on the waste bin
                        </DialogDescription>
                    </DialogHeader>
                    <div className="bg-muted rounded-lg overflow-hidden relative" style={{ width: '100%', paddingTop: '69%', position: 'relative' }}>
                        <QrReader
                            onResult={handleQrScan}
                            constraints={{ facingMode: 'environment' }}
                            containerStyle={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                            videoStyle={{ width: '100%', height: '100%', paddingTop: "0%", objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 border-2 border-white rounded-lg opacity-50" />
                        </div>
                    </div>
                    <div className="flex space-x-2 justify-end">
                        <Button variant="outline" onClick={() => setIsQrScanning(false)}>
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </MainLayout>
    );
}