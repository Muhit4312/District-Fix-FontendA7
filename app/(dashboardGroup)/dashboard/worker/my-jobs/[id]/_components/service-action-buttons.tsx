
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  acceptServiceAction,
  startServiceAction,
  completeServiceAction,
} from "../_actions/worker.actions";
import type { AssignedService } from "@/types/worker";

const BRAND = "#0084D1";

export function ServiceActionButtons({
  service,
}: {
  service: AssignedService;
}) {
  const router = useRouter();
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const runAction = async (action: () => Promise<unknown>) => {
    try {
      setLoading(true);
      await action();
      toast.success("Service updated successfully");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 space-y-3">
      {service.status === "ASSIGNED" && (
        <button
          type="button"
          disabled={loading}
          onClick={() => runAction(() => acceptServiceAction(service.id))}
          className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: BRAND }}
        >
          {loading ? "Processing..." : "Accept Service"}
        </button>
      )}

      {service.status === "ACCEPTED" && (
        <button
          type="button"
          disabled={loading}
          onClick={() => runAction(() => startServiceAction(service.id))}
          className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: BRAND }}
        >
          {loading ? "Processing..." : "Start Service"}
        </button>
      )}

      {service.status === "IN_PROGRESS" && (
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();

            const serviceCharge = Number(price);

            if (!Number.isFinite(serviceCharge) || serviceCharge <= 0) {
              toast.error("Enter a valid service price");
              return;
            }

            void runAction(() =>
              completeServiceAction(service.id, serviceCharge),
            );
          }}
        >
          <label
            htmlFor="serviceCharge"
            className="block text-sm font-medium"
          >
            Final Service Price (৳)
          </label>

          <input
            id="serviceCharge"
            type="number"
            min="0.01"
            step="0.01"
            required
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Enter service price"
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2"
            style={{ "--tw-ring-color": BRAND } as React.CSSProperties}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: BRAND }}
          >
            {loading ? "Processing..." : "Complete Service"}
          </button>
        </form>
      )}
    </div>
  );
}

