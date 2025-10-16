import Link from "next/link";

export default function KnowledgeVideos() {
  return (
    <>
      <h1>วิดีโอ</h1>
      <p>วิดีโอสอน/อบรม</p>
      <div style={{ marginTop: 12 }}>
        <Link href="/knowledge">← กลับคลังความรู้</Link>
      </div>
    </>
  );
}
