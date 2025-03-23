import { useState } from "react";

type Props = {
  result: {
    url: string;
    summary: string;
    testResult: string;
  } | null;
  onFeedbackSubmit?: (comment: string) => void;
};

export default function BuildResult({ result, onFeedbackSubmit }: Props) {
  const [feedback, setFeedback] = useState("");

  if (!result) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim() && onFeedbackSubmit) {
      onFeedbackSubmit(feedback.trim());
      setFeedback("");
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded shadow">
      <h2 className="text-xl font-bold mb-2">🧪 構築結果</h2>
      <p><strong>ステージングURL:</strong> <a href={result.url} className="text-blue-600 underline">{result.url}</a></p>
      <p><strong>変更点:</strong> {result.summary}</p>
      <p><strong>テスト結果:</strong> {result.testResult}</p>

      {/* フィードバック欄 */}
      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <label className="block font-semibold">💬 フィードバック</label>
        <textarea
          className="w-full border p-2 rounded"
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="気づいたこと、改善してほしい点などを書いてください"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          送信
        </button>
      </form>
    </div>
  );
}
