import { useState } from "react";
import RequirementForm from "./components/RequirementForm";
import BuildResult from "./components/BuildResult";

type Requirement = {
  userStory: string;
  businessRule: string;
  uiRequest: string;
  acceptanceCriteria: string;
  priority: string;
  feedback?: string;
};

function App() {
  const [buildResult, setBuildResult] = useState<null | {
    url: string;
    summary: string;
    testResult: string;
  }>(null);

  const [history, setHistory] = useState<Requirement[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleBuild = (req: Requirement) => {
    console.log("🛠 要件受け取り:", req);

    setHistory((prev) => {
      const updated = [...prev, req];
      setCurrentIndex(updated.length - 1);
      return updated;
    });

    setTimeout(() => {
      setBuildResult({
        url: "https://example.com/staging",
        summary: "休暇申請画面を追加しました",
        testResult: "すべてのテストに合格しました ✅",
      });
    }, 1000);
  };

  const handleFeedbackSubmit = (comment: string) => {
    if (currentIndex === null) return;
    const updated = [...history];
    updated[currentIndex] = { ...updated[currentIndex], feedback: comment };
    setHistory(updated);
    console.log("💬 フィードバック保存:", updated[currentIndex]);
  };

  const handleRebuildWithFeedback = (item: Requirement) => {
    const newRequest = {
      ...item,
      feedback: item.feedback || "(フィードバックなし)",
    };
    console.log("🔁 フィードバック付きで再構築:", newRequest);
    handleBuild(newRequest);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">自動構築インターフェース PoC</h1>
      <RequirementForm onSubmit={handleBuild} />
      <BuildResult result={buildResult} onFeedbackSubmit={handleFeedbackSubmit} />

      {history.length > 0 && (
        <div className="mt-8 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">📜 要件履歴</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            {history.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <li key={idx} className="border-b pb-2">
                  <div
                    className="cursor-pointer hover:text-blue-600 font-medium"
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  >
                    <strong>#{idx + 1}</strong> [{item.priority}] {item.userStory}
                  </div>
                  {isExpanded && (
                    <div className="mt-2 pl-4 text-sm space-y-2">
                      <p><strong>業務ルール:</strong> {item.businessRule}</p>
                      <p><strong>UI希望:</strong> {item.uiRequest}</p>
                      <p><strong>受入基準:</strong> {item.acceptanceCriteria}</p>
                      {item.feedback && <p><strong>フィードバック:</strong> {item.feedback}</p>}
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleBuild(item)}
                          className="px-3 py-1 bg-green-600 text-white rounded"
                        >
                          🔁 再構築（そのまま）
                        </button>
                        <button
                          onClick={() => handleRebuildWithFeedback(item)}
                          className="px-3 py-1 bg-indigo-600 text-white rounded"
                        >
                          🔁 フィードバック付きで再構築
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
