import { useState } from "react";

type Requirement = {
  userStory: string;
  businessRule: string;
  uiRequest: string;
  acceptanceCriteria: string;
  priority: string;
};

type Props = {
  onSubmit: (req: Requirement) => void;
};

export default function RequirementForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Requirement>({
    userStory: "",
    businessRule: "",
    uiRequest: "",
    acceptanceCriteria: "",
    priority: "中",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4 p-4 bg-white shadow rounded" onSubmit={handleSubmit}>
      <div>
        <label className="block font-semibold">ユーザーストーリー</label>
        <textarea name="userStory" className="w-full border p-2" rows={2} onChange={handleChange} />
      </div>
      <div>
        <label className="block font-semibold">業務ルール</label>
        <textarea name="businessRule" className="w-full border p-2" rows={2} onChange={handleChange} />
      </div>
      <div>
        <label className="block font-semibold">UIの希望</label>
        <textarea name="uiRequest" className="w-full border p-2" rows={2} onChange={handleChange} />
      </div>
      <div>
        <label className="block font-semibold">受入基準</label>
        <textarea name="acceptanceCriteria" className="w-full border p-2" rows={2} onChange={handleChange} />
      </div>
      <div>
        <label className="block font-semibold">優先度</label>
        <select name="priority" className="w-full border p-2" onChange={handleChange}>
          <option value="高">高</option>
          <option value="中" selected>中</option>
          <option value="低">低</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">構築開始</button>
    </form>
  );
}
