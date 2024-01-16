import { EditorGrid } from "@/components/editor";
import { EditorTools } from "@/components/editor/editor-tools";
import { Sidebar } from "@/components/editor/sidebar";

// components
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col flex-1 flex-grow w-full h-full">
      {/** header layout */}
      <EditorTools />
      {/** content layout */}
      <div className="flex flex-1">
        <Sidebar />
        <EditorGrid />
      </div>
      {/** footer layout */}
      <div className="flex">
        <p>Footer</p>
      </div>
    </div>
  );
}
