
"use client";

import type { JobStatus } from "@/types/worker";

type TabValue = "ALL" | JobStatus | "OTHER";

interface JobsStatusTabsProps {
	activeTab: TabValue;
	onTabChange: (value: TabValue) => void;
}

const tabs: { label: string; value: TabValue }[] = [
	{ label: "All Jobs", value: "ALL" },
	{ label: "Assigned", value: "ASSIGNED" },
	{ label: "Accepted", value: "ACCEPTED" },
	{ label: "In Progress", value: "IN_PROGRESS" },
	{ label: "Completed", value: "COMPLETED" },
	{ label: "Other", value: "OTHER" },
];

export default function JobsStatusTabs({
	activeTab,
	onTabChange,
}: JobsStatusTabsProps) {
	return (
		<div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-1">
			{tabs.map((tab) => (
				<button
					key={tab.value}
					type="button"
					onClick={() => onTabChange(tab.value)}
					aria-pressed={activeTab === tab.value}
					className={`shrink-0 rounded-t-lg border-b-2 px-4 py-3 text-sm font-semibold transition ${
						activeTab === tab.value
							? "border-sky-600 text-sky-700"
							: "border-transparent text-slate-500 hover:text-slate-900"
					}`}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}