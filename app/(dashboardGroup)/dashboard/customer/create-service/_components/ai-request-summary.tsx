
"use client";

import { useState } from "react";
import { Check, LoaderCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { summarizeRequestAction } from "../_actions/summarize-request.action";

type AIRequestSummaryProps = {
  description: string;
  onUseSummary: (summary: string) => void;
  disabled?: boolean;
};

export default function AIRequestSummary({
  description,
  onUseSummary,
  disabled = false,
}: AIRequestSummaryProps) {
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleGenerateSummary = async () => {
    if (description.trim().length < 10) {
      toast.error("Description must be at least 10 characters.");
      return;
    }

    setIsSummarizing(true);

    try {
      const result = await summarizeRequestAction(description.trim());

      if (!result.success || !result.summary) {
        toast.error(result.message);
        return;
      }

      setSummary(result.summary);
      toast.success("AI summary generated successfully.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleUseSummary = () => {
    const value = summary.trim();

    if (value.length < 10 || value.length > 1000) {
      toast.error("Summary must contain 10–1000 characters.");
      return;
    }

    onUseSummary(value);
    setSummary("");
  };

  const isBusy = disabled || isSummarizing;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Make your problem description clearer with AI.
        </p>

        <Button
          type="button"
          variant="outline"
          onClick={handleGenerateSummary}
          disabled={isBusy || description.trim().length < 10}
          className="gap-2 rounded-lg border-sky-200 text-sky-700 hover:bg-sky-50"
        >
          {isSummarizing ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              Generate AI Summary
            </>
          )}
        </Button>
      </div>

      {summary && (
        <div className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/50 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-sky-600" />
            <h3 className="text-sm font-semibold text-slate-800">
              AI Summary Preview
            </h3>
          </div>

          <Textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            rows={3}
            maxLength={1000}
            disabled={isBusy}
            className="resize-y rounded-lg border-sky-200 bg-white text-sm"
            placeholder="Edit your summary..."
          />

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSummary("")}
              disabled={isBusy}
            >
              Discard
            </Button>

            <Button
              type="button"
              onClick={handleUseSummary}
              disabled={isBusy}
              className="gap-2 bg-[#0084D1] text-white hover:bg-[#0072B8]"
            >
              <Check className="size-4" />
              Use Summary
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
