"use client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
      <Alert variant="destructive" className="w-full max-w-md">
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          {error?.message || "An unexpected error occurred. Please try again."}
        </AlertDescription>
      </Alert>
      <Button onClick={() => reset()} variant="outline" className="mt-6">
        Try Again
      </Button>
    </div>
  );
}

export default Error;
